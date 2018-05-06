import { Component, OnInit,ViewChild } from '@angular/core';
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
import { CustomValidators } from '@services/validations/custom-validation.service';
import { LoaderViewChildComponent } from '../../shared/popup-window/loader/loader-viewchild.component';
import { ModalDeleteComponent } from '../../shared/popup-window/loader/modal-delete.component';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers:[CommunicationService]
})


export class ArticleComponent implements OnInit {

  @ViewChild(LoaderViewChildComponent)
  popup : LoaderViewChildComponent;

  @ViewChild(ModalDeleteComponent)
  popupdelete : ModalDeleteComponent;

  articleForm: FormGroup;
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
      'title': new FormControl('',[Validators.required,Validators.maxLength(250)]),
      'id_user': new FormControl(),
      'text': new FormControl('',Validators.required),
      'categories': new FormControl('',Validators.required),
      'pub_date': new FormControl('',Validators.required),
      'slug':new FormControl(),
      'status':new FormControl('',Validators.required),
      'image':new FormControl('',[Validators.required,Validators.maxLength(200),CustomValidators.validateUrl]),
      'video':new FormControl('',[Validators.required,Validators.maxLength(200),CustomValidators.validateUrl]),
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
            this.popup.showPopup("Información");
            this.popup.texto="Datos guardados correctamente";
          }else{
            this.popup.showPopup("ERROR");
            this.popup.texto="Los datos no se han guardado";
          }
        });
      }else{
        this._articlesservice.createArticle(article).subscribe(data =>{
          if(data.id){
            this.popup.showPopup("Información");
            this.popup.texto="Articulo creado correctaemnte";
            var url=`${'/article/'+data.id}`;
            location.assign(url);
          }else{
            this.popup.showPopup("ERROR");
            this.popup.texto="Articulo no creado";
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
        this.popupdelete.popupOpen("Información");
        this.popupdelete.texto=`${"Articulo con id "+this.postId+" borrado correctamente"}`;
        //location.assign('/');
      }else{
        this.popupdelete.popupOpen("ERROR");
        this.popupdelete.texto="Error. Articulo no borrado";
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
