import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Article } from '../../interfaces/articles';
import { Category } from '../../interfaces/category';
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, NgForm,FormBuilder } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { UsersService } from '@services/users/users.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers:[CommunicationService]
})

export class ArticleComponent implements OnInit {
  private articleForm: FormGroup;
  constructor(private _commumicationservice: CommunicationService,
              private _articlesservice: ArticlesService,
              private _activatedRoute: ActivatedRoute,
              private location: Location,
              private _usersservice: UsersService) { }

  postId: Article;
  postData$: Observable<Article[]>;
  title_post:string;
  listcategories$: Observable<Category[]>;
  userid:number;
  username:string;
  

  ngOnInit() {
    this.articleForm = new FormGroup({
      'idpost': new FormControl(),
      'title': new FormControl(),
      'id_user': new FormControl(),
      'text': new FormControl(),
      'categories': new FormControl(),
      'pub_date': new FormControl(),
      'slug':new FormControl(),
      'status':new FormControl(),
      'image':new FormControl(),
      'video':new FormControl(),
    });
    this.listcategories$= this._articlesservice.listCategories();
    this.title_post ='Nueva Entrada';
    this._activatedRoute.params.subscribe(paramsId => {
      this.postId = paramsId.postId;
    });
    this.userid=this._usersservice.getUserId();
    this.username=this._usersservice.getUserName();

    if(this.postId){
      this.title_post = `${'Editando entrada ID: '+this.postId}`
      var postData = this._articlesservice.getArticle(this.postId).subscribe(data =>{
        console.log(data.categories);
        if(data.id){
          this.articleForm.setValue({
          'idpost': data.id, 
          'title': data.title,
          'id_user': data.id_user,
          'text': data.text,
          'categories': data.categories,
          'pub_date': moment(data.pub_date).format(),
          'slug':data.slug,
          'status': data.status,
          'image': data.image,
          'video': data.video
      });
        }else{
          console.log("Some error occured")
          alert("Ha ocurrido un error")
        };
      });
    }
  }

  onSaveArticle(){
    const article: Article={
      id_article:this.articleForm.value.idpost,
      title:this.articleForm.value.title,
      id_user:this._usersservice.getUserId(),
      text:this.articleForm.value.text,
      categories:this.articleForm.value.categories,
      pub_date: moment(this.articleForm.value.pub_date).format('YYYY-MM-DD'),
      slug: this.buildslug(this.articleForm.value.title),
      status: this.articleForm.value.status,
      image: this.articleForm.value.image,
      video: this.articleForm.value.video,
    };
    
    if(this.articleForm.value.idpost){
      this._articlesservice.editArticle(this.articleForm.value.idpost, article).subscribe(data =>{
        if(data.id){
          alert("Datos guardados correctamente");
        }else{
          alert("Error. Datos no guardados")
        }
      });
    }else{
      this._articlesservice.createArticle(article).subscribe(data =>{
        if(data.id){
          alert("Entrada creada correctamente")
          var url=`${'/article/'+data.id}`;
          location.assign(url);
        }else{
          alert("Error. Entrada no creada")
        }
      });
    }
   
  }

  buildslug(text)
  {
      return text.toLowerCase()
            .replace(/-+/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
  }
}
