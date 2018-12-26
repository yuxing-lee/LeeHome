import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';

import { ApiEndpoint } from '../consts/api-endpoint.const'

@Injectable()
export class BaseService {

  private readonly _defaultContentType: string = ApiEndpoint.ContentTypes.JSON;

  constructor(protected http: Http) { }

  protected getRequestOptions(contentType?: string): RequestOptions {

    let _token = localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : "";
    
    let _headers: Headers = new Headers();
    _headers.append("Content-Type", this._defaultContentType);
    _headers.append("Authorization", _token);

    let options = new RequestOptions({ headers: _headers });
    return options;
  }
}
