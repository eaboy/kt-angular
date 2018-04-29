import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/articles';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '@services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@services/alerts/index';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})

export class ArticlesListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private _articlesService: ArticlesService,
              private _usersservice: UsersService,
              private _activatedRoute: ActivatedRoute,
              private _alerservice: AlertService) { }
  
  idus:string;
  postId: Article;
  
  ngOnInit() {
    this.idus=this._usersservice.getUserId();
    this.articles$=this._articlesService.listArticles(this.idus);
    //console.log(this.articles$);
    this._activatedRoute.params.subscribe(paramsId => {
      this.postId = paramsId.postId;
    });
  }
  onDeleteArticle(id){
    this._articlesService.deleteArticle(id).subscribe(data =>{
      if(!data){
        this._alerservice.success(`${"Articulo con id "+id+" borrado correctamente"}`);
        alert(`${"Articulo con id "+id+" borrado correctamente"}`);
      }else{
        this._alerservice.error("Error. Articulo no borrado");
        alert("Error. Articulo no borrado");
      }
    });
  }
}