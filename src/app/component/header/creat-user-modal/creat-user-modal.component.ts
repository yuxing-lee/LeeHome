import { Component } from '@angular/core';

import { user } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-creat-user-modal',
  templateUrl: './creat-user-modal.component.html',
  styleUrls: ['./creat-user-modal.component.css']
})
export class CreatUserModalComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    constructor(private UserService: UserService,
                private toastrService: ToastrService) { }

    public display = false;
    public signUpData = new user;

    public signUp() {
        this.UserService.signUp(this.signUpData).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.toastrService.success(res)
                this.display = false;
            }, err => {
                this.toastrService.error(err)
            }
        );
    }

    public show() {
        this.signUpData = new user;
        this.display = true;
    }
}
