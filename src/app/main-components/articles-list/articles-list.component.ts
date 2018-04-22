import { Component, OnInit } from '@angular/core';
import { Article } from '../../article';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
    articles$: Observable<Article[]>;
  
    constructor(private _articlesService: CommunicationService) { }
    
    ngOnInit() {
      const url='http://localhost:8000/api/1.0/articles/all/';
      this.articles$ = this._articlesService.getData(url);
    }

}
