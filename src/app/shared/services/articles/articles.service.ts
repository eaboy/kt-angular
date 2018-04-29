import { Injectable } from '@angular/core';
import { CommunicationService } from '@services/communication/communication.service';
import { Observable } from 'rxjs/Observable';
import { Article } from '@interfaces/articles';

/* Servicio encargado de gestionar la comunicación con el API relativa al modelo articles.
   Consume el servicio de comunicaciones y provee de métodos a los componentes para gestionar las acciones 
   relacionadas con los artículos. */

@Injectable()
export class ArticlesService {

  private articlePath = `/article/`;
  private articlesPath = `/articles/`;
  private categoriesPath = `/categories/all/`;

  constructor(private _CommunicationService: CommunicationService) {
  }
  
  getArticle(id_article){
    return this._CommunicationService.getData(`${this.articlePath}`+id_article);
  }

  editArticle(id_article, article: Article){
    return this._CommunicationService.editData(`${this.articlePath}`+id_article, article);
  }

  createArticle(article: Article){
    return this._CommunicationService.postData(`${this.articlePath}new/`, article);
  }

  listArticles(id_user){
    //return this._CommunicationService.getData(`${this.articlesPath}all/`);
    return this._CommunicationService.getData(`${this.articlesPath}user/`+id_user);
  }

  listCategories(){
    return this._CommunicationService.getData(`${this.categoriesPath}`);
  }


}
