import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { book } from '../../models/book.model';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent {

  private _subscriptions: Subject<void> = new Subject<void>();

  bookObj = new book;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private BookService: BookService) { }

  private ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
  }

  getBook(id) {
    this.BookService.getBookDetail(id).pipe(takeUntil(this._subscriptions)).subscribe(
      data => {
        this.bookObj = data;
      }, err =>{
        console.log(err);
      });
  }

  updateBook(id, data) {
    this.BookService.updateBook(id, data).pipe(takeUntil(this._subscriptions)).subscribe(
      res => {
        let id = res['_id'];
          this.router.navigate(['/book-details', id]);
      }, err =>{
        console.log(err);
      });
  }

}
