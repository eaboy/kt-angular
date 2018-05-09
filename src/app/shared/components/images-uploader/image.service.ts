import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response, RequestMethod } from '@angular/http';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment";
import { User } from "@interfaces/users";
import { Article } from '../../../interfaces/articles';


@Injectable()

export class ImageService {


  public mensajeError = new EventEmitter<string>();
  public idArticulo: any = null;

  constructor(private http: Http, private _httpClient: HttpClient) {
  }


public postImage(url: string, image: File, hs?: Headers | { [name: string]: any }, partName: string = 'image', customFormData?: { [name: string]: any }, withCredentials?: boolean): Observable<Response> {
   

    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }

    let headers = new Headers();
    let options = new RequestOptions({ method: RequestMethod.Post});   


    if (withCredentials) {
      options.withCredentials = withCredentials;
    }

    if (headers) {
      options.headers = headers;
    }

    // add custom form data
    let formData = new FormData();
    for (let key in customFormData) {
      formData.append(key, customFormData[key]);
    }
    formData.append(partName, image);
    return this.http.post(environment.apiUrl+url, formData, options);
  }


 isArticle(object: any): object is Article {
    return 'image' in object;
 }

 isUser(object: any): object is User {
    return 'username' in object;
 }


  getAdjuntos(url: string, obj:any): Observable<any[]>{  
    if(url.startsWith('/subirImagen')){
      return this.getImagenPost(this.idArticulo);
    }else{
      return this.getAvatar(obj);
    }
  }


  //Llamadas a endpoints para la gestión de avatares
  getAvatar(obj: any): Observable<string[]> { 
      if(typeof obj == 'number'){
        return this._httpClient.get<string[]>(`${environment.apiUrl}/getAvatar/${obj}`);
      }else{
        let id = obj[0].id;
        return this._httpClient.get<string[]>(`${environment.apiUrl}/getAvatar/${id}`);
      }
      
  }

  eliminarAvatar(id: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${environment.apiUrl}/deleteAvatar${id}`); 
  }

  //Llamadas a endpoints para la gestión de imágenes de artículos

  getImagenPost(id: any): Observable<string[]> {
        this.idArticulo = id;
        return this._httpClient.get<string[]>(`${environment.apiUrl}/getImagen/${id}`);    
  }

  eliminarImagenPost(id: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${environment.apiUrl}/deleteImagen${id}`); 
  }





}