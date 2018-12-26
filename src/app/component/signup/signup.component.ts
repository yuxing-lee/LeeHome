import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { user } from '../../models/user.model'; 

import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  private _subscriptions: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private UserService: UserService) { }

  signupData:user = { username: '', password: '' };

  signup() {
    this.UserService.signUp(this.signupData).pipe(takeUntil(this._subscriptions)).subscribe(
      resp => {
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      }
    );
  }
}
