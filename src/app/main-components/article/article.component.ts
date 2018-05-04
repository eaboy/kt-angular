import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { ArticlesService } from '../../shared/services/articles/articles.service';
import { Article } from '../../interfaces/articles';
import { Category } from '../../interfaces/category';
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, NgForm, FormBuilder, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { UsersService } from '@services/users/users.service';
import { AlertService } from '@services/alerts/index';
import { CustomValidators } from '@services/validations/custom-validation.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers:[CommunicationService]
})

export class ArticleComponent implements OnInit {
  articleForm: FormGroup;
  constructor(private _commumicationservice: CommunicationService,
              private _articlesservice: ArticlesService,
              private _activatedRoute: ActivatedRoute,
              private location: Location,
              private _usersservice: UsersService,
              private _alerservice: AlertService) { }

  postId: Article;
  postData$: Observable<Article[]>;
  title_post:string;
  listcategories$: Observable<Category[]>;
  userid:number;
  username:string;
  

  ngOnInit() {
    this.articleForm = new FormGroup({
      'idpost': new FormControl(),
      'title': new FormControl('',Validators.required),
      'id_user': new FormControl(),
      'text': new FormControl('',Validators.required),
      'categories': new FormControl('',Validators.required),
      'pub_date': new FormControl('',Validators.required),
      'slug':new FormControl(),
      'status':new FormControl('',Validators.required),
      'image':new FormControl('',[Validators.required]),
      'video':new FormControl('',[Validators.required]),
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

  isFieldValid(field: string) {
    return !this.articleForm.get(field).valid && this.articleForm.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSaveArticle(){
    if (this.articleForm.valid) {
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
            this._alerservice.success("Datos Guardados");
          }else{
            this._alerservice.error("Error. Datos no guardados");
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
    }else{
      this.validateAllFormFields(this.articleForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onDeleteArticle(){
    this._articlesservice.deleteArticle(this.postId).subscribe(data =>{
      if(!data){
        this._alerservice.success(`${"Articulo con id "+this.postId+" borrado correctamente"}`);
      }else{
        this._alerservice.error("Error. Articulo no borrado");
      }
    });
  }

  buildslug(text)
  {
      return text.toLowerCase()
            .replace(/-+/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
  }
}
