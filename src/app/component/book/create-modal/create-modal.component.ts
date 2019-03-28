import { Component, Output, EventEmitter } from '@angular/core';

import { BookService } from '../../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { book } from '../../../models/book.model';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    public bookObj = new book;

    public display: boolean = false;

    @Output() saveComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private BookService: BookService) { }

    saveBook() {
        this.BookService.saveBook(this.bookObj).pipe(takeUntil(this._subscriptions)).subscribe(
            res => {
                this.display = false;
                this.bookObj = new book;
                this.saveComplete.emit();
            }, (err) => {
                console.log(err);
            });
    }

    public show() {
        this.display = true;
    }
}
