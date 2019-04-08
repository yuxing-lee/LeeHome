import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    constructor(private router: Router,
        private userService: UserService) { }

    public canActivate() {
        return this.check();
    }

    private check() {
        return this.userService.checkJWT()
            .pipe(
                map(
                    data => {
                        if(!data)
                            this.router.navigateByUrl('/login');
                        return data;
                    }),
                catchError(
                    error => {
                        return Observable.bind(false);
                    })
            );
    }
}