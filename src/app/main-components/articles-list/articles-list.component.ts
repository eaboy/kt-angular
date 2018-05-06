import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces/articles';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '@services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@services/alerts/index';
import { LoaderViewChildComponent } from '../../shared/popup-window/loader/loader-viewchild.component';
import { ModalDeleteComponent } from '../../shared/popup-window/loader/modal-delete.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})

export class ArticlesListComponent implements OnInit {
  @ViewChild(ModalDeleteComponent)
  popup : ModalDeleteComponent;

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
        this.popup.popupOpen("Información");
        this.popup.texto=`${"Articulo con id "+id+" borrado correctamente"}`;
        //this._alerservice.success(`${"Articulo con id "+id+" borrado correctamente"}`);
        //alert(`${"Articulo con id "+id+" borrado correctamente"}`);
      }else{
        this.popup.popupOpen("ERROR");
        this.popup.texto="Error. Articulo no borrado";
      }
    });
  }
}