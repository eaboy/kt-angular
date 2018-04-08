import { Component, OnInit } from '@angular/core';
import { ArticlesList } from '../../articles-list';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  lista: ArticlesList={
    id: 1,
    name: 'articulo1'
  }
  constructor() { }

  ngOnInit() {
  }

}
