import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from '../article.service';
import { Article } from '../article';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  private articles: Observable<Article[]>;

  constructor(
    private articleService: ArticleService, 
    private activatedRoute: ActivatedRoute
  ) { 
    this.articles = articleService.articles;  
  }

  ngOnInit() { 
  }
}
