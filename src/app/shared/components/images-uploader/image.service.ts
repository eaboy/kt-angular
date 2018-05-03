import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response, RequestMethod } from '@angular/http';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment";



@Injectable()
export class ImageService {
  constructor(private http: Http, private _httpClient: HttpClient) {
  }


public postImage(url: string, image: File, hs?: Headers | { [name: string]: any }, partName: string = 'image', customFormData?: { [name: string]: any }, withCredentials?: boolean): Observable<Response> {
   
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }


    let headers = new Headers();
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, OPTIONS');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type");
    //let options = new RequestOptions({ method: RequestMethod.Post, headers: headers, body:JSON.stringify(GroupM),  url:this._GroupsUrl  });    
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

  getAdjuntos(obj: any): Observable<string[]> {       
      return this._httpClient.get<string[]>(`${environment.apiUrl}/adjuntosexcursiones/${obj.fecha}/${obj.folleto}/${obj.cuadro}/${obj.codigoDestino}/${obj.clave}`);
  }

}