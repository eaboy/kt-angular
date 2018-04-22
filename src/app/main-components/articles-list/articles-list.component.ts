import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/articles';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})

export class ArticlesListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private _articlesService: ArticlesService) { }

  ngOnInit() {
    this._articlesService.listArticles().subscribe(data => {
      console.log(data);
    });
  }

}
