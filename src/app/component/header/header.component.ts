import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CreatUserModalComponent } from './creat-user-modal/creat-user-modal.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    @ViewChild(CreatUserModalComponent) creatUserModal: CreatUserModalComponent;

    constructor(private router: Router) { }

    public logout(): void {
        localStorage.removeItem('jwtToken');
        this.router.navigate(['login']);
    }

    public signUp(): void {
        this.creatUserModal.show();
    }

    public hrefTo(href: string): void {
        this.router.navigate([href]);
    }
}
