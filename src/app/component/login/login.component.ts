import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { user } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private _subscriptions: Subject<void> = new Subject<void>();

    constructor(private router: Router, 
                private userService: UserService,
                private toastrService: ToastrService) { }

    public loginData = new user;

    ngOnInit() {
        if (localStorage.getItem('jwtToken'))
            this.router.navigateByUrl('/books');
    }

    public login() {
        this.userService.logIn(this.loginData).pipe(takeUntil(this._subscriptions)).subscribe(
            token => {
                localStorage.setItem('jwtToken', token);
                this.router.navigateByUrl('/books');
            }, err => {
                this.toastrService.error("密碼輸入錯誤")
                console.log(err);
            });
    }
}
