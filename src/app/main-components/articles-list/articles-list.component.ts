import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/articles';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '@services/users/users.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})

export class ArticlesListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private _articlesService: ArticlesService,private _usersservice: UsersService) { }
  
  idus:string;
  
  ngOnInit() {
    this.idus=this._usersservice.getUserId();
    this.articles$=this._articlesService.listArticles(this.idus);
    //console.log(this.articles$);
  }
}