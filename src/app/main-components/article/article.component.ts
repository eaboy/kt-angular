import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../shared/services/communication/communication.service';
import { Article } from '../../article';
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, NgForm,FormBuilder } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers:[CommunicationService]
})
export class ArticleComponent implements OnInit {
  private articleForm: FormGroup;
  constructor(private _commumicationservice: CommunicationService,
              private _activatedRoute: ActivatedRoute,
              private location: Location,) { }

  postId: Article
  postData$: Observable<Article[]>;

  ngOnInit() {
    this.articleForm = new FormGroup({
      'idpost': new FormControl(),
      'title': new FormControl(),
      'id_user': new FormControl(),
      'text': new FormControl(),
      'categories': new FormControl(),
      'pub_date': new FormControl(),
      'slug':new FormControl(),
    });
    this._activatedRoute.params.subscribe(paramsId => {
      this.postId = paramsId.postId;
    });
    if(this.postId){
      console.log('lll');
      var url=`${'/article/'+this.postId}`;
      var postData = this._commumicationservice.getData(url).subscribe(data =>{
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
          
      });
        }else{
          console.log("Some error occured")
        };
      });
    }
  }
  message:string;
  onSaveArticle(){
    const article: Article={
                            id:this.articleForm.value.idpost,
                            title:this.articleForm.value.title,
                            id_user:29,
                            text:this.articleForm.value.text,
                            categories:this.articleForm.value.categories,
                            pub_date: moment(this.articleForm.value.pub_date).format('YYYY-MM-DD'),
                            slug: this.buildslug(this.articleForm.value.title)
                          };
    
    if(this.articleForm.value.idpost){
      var url=`${'/article/'+this.articleForm.value.idpost}`;
      this._commumicationservice.editData(url, article).subscribe(data =>{
        if(data.id){
          console.log('ok');
          alert("Datos guardados correctamente");
        }else{
          console.log("Some error occured")
          alert("Error. Datos no guardados")
        }
      });
    }else{
      var url='/article/new/';
      this._commumicationservice.postData(url, article).subscribe(data =>{
        if(data.id){
          console.log('ok');
          alert("Entada creada correctamente")
          var url=`${'/article/'+data.id}`;
          location.assign(url);
        }else{
          console.log("Some error occured")
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
