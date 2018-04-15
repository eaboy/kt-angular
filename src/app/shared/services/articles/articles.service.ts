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

  constructor(private _CommunicationService: CommunicationService) {
  }

  createArticle(article: Article){
    return this._CommunicationService.postData(`${this.articlePath}new/`, article);
  }

  listArticles(){
    return this._CommunicationService.getData(`${this.articlesPath}all/`);
  }

}
