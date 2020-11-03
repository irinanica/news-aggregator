import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Article, ArticleJSON } from './article';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> =
    new BehaviorSubject<Article[]>([]);
  private _sources: BehaviorSubject<any> =
    new BehaviorSubject<any>([]);

  private _refreshSubject: BehaviorSubject<string> = new
    BehaviorSubject<string>('reddit-r-all');

  public articles: Observable<Article[]> = this._articles.asObservable();
  public sources: Observable<any> = this._sources.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this._refreshSubject
    .subscribe(sourceKey => {
      this.getArticles(sourceKey);
    });
  }

  public updateArticles(sourceKey): void {
    this._refreshSubject.next(sourceKey);
  }

  public getArticles(sourceKey = 'reddit-r-all'): void {
    //make http request => Observable
    //convert response intro article class
    //update our subject

    this._makeHttpRequest('/v2/everything', sourceKey)
      .pipe(
        map(json => json.articles)
      )
      .subscribe(articlesJSON => {
        const articles = articlesJSON
          .map((articlejson: ArticleJSON) => Article.fromJSON(articlejson));
        this._articles.next(articles);
      })
  }

  public getSources(): void {
    this._makeHttpRequest('/v2/sources')
      .pipe(
        map(json => json.sources),
        filter(list => list.length > 0)
      )
      .subscribe(this._sources);
  }

  private _makeHttpRequest(
    path: string,
    sourceKey?: string
  ): Observable<any> {
    let params;

    new HttpParams()

    if (sourceKey && sourceKey !== '') {
      params = new HttpParams()
        .set('apiKey', environment.newsApiKey)
        .set('sources', sourceKey);
    } else {
      params = new HttpParams()
        .set('apiKey', environment.newsApiKey);
    }

    return this.http
      .get(`${environment.baseUrl}${path}`, {
        params: params
      });
  }

}