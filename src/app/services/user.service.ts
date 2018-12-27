import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpoint } from '../consts/api-endpoint.const';

@Injectable()
export class UserService extends BaseService {

  public logIn(loginData: object): Observable<string> {
    return this.http.post('/api/user/signin', loginData)
      .pipe(map(ApiEndpoint.ExtractData),
            catchError(ApiEndpoint.HandleError));
  }

  public signUp(signUpData: object): Observable<string> {
    return this.http.post('/api/user/signup', signUpData)
      .pipe(map(ApiEndpoint.ExtractData),
            catchError(ApiEndpoint.HandleError));
  }

}
