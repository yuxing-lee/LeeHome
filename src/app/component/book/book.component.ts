import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '../../models/book.model';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private _subscriptions: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private Bookservice: BookService) { }

  books = new Array<book>();
  
  ngOnInit() {
    this.Bookservice.getBooks().pipe(takeUntil(this._subscriptions)).subscribe(
      books => {
        this.books = books;
      }, err => {
        console.log(err);
      });
  }

  show(id: string) {
    this.router.navigate(['/book-details', id]);
  }

}
