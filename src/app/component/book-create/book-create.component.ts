import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {

  private _subscriptions: Subject<void> = new Subject<void>();

  bookObj: {
    "title": string,
    "isbn": string,
    "author": string,
    "publisher": string,
    "published_year": string
  } = {
    "title": "",
    "isbn": "",
    "author": "",
    "publisher": "",
    "published_year": "",
  };

  constructor(private router: Router,
              private BookService: BookService) { }

  saveBook() {
    this.BookService.saveBook(this.bookObj).pipe(takeUntil(this._subscriptions)).subscribe(
      res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
    }, (err) => {
      console.log(err);
    });
  }

}
