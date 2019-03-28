import { Component, Output, EventEmitter } from '@angular/core';
import { book } from '../../../models/book.model';

import { BookService } from '../../../services/book.service';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    public bookObj = new book;
    public display: boolean = false;

    @Output() editComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private BookService: BookService,
                private toastrService: ToastrService) { }

    public getBook(id) {
        this.display = true;
        this.BookService.getBookDetail(id).pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                this.bookObj = data;
            }, err => {
                this.toastrService.error(err)
            });
    }

    public updateBook(id, data) {
        this.BookService.updateBook(id, data).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.display = false;
                this.toastrService.success("Update Done!!!");
                this.editComplete.emit();
            }, err => {
                this.toastrService.error(err)
            });
    }

    public deletebook(id) {
        var res = confirm("確認刪除?");
        if (res == true) {
            this.BookService.deletebook(id).pipe(takeUntil(this._subscriptions)).subscribe(
                res => {
                    this.display = false;
                    this.toastrService.success("Delete Done!!!")
                    this.editComplete.emit();
                }, err => {
                    this.toastrService.error(err)
                });
        }
    }
}
