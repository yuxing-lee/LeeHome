import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '../../models/book.model';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Components
import { CreateModalComponent } from './create-modal/create-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

    private _subscriptions: Subject<void> = new Subject<void>();

    @ViewChild(CreateModalComponent) createModal: CreateModalComponent;
    @ViewChild(EditModalComponent) editModal: EditModalComponent;

    constructor(private router: Router,
        private Bookservice: BookService) { }

    books = new Array<book>();

    ngOnInit(): void {
        this.getAllBooks();
    }

    public getAllBooks(): void {
        this.Bookservice.getBooks().pipe(takeUntil(this._subscriptions)).subscribe(
            books => {
                this.books = books;
            }, err => {
                console.log(err);
            });
    }

    public createBook(): void {
        this.createModal.show();
    }

    public getBookDetail(id: string): void {
        this.editModal.getBook(id);
    }
}
