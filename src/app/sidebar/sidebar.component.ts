import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private sources: Observable<any>;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { 
    this.sources = this.articleService.sources;
  }

  public goToView(route, param) {
    this.router.navigate([route, param]);
    this.articleService.updateArticles(param);
  }

  ngOnInit() {
    this.articleService.getSources();
  }
}
