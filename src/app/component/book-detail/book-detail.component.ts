import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { book } from '../../models/book.model';

import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {

  private _subscriptions: Subject<void> = new Subject<void>();

  bookObj: book = {
    "title": "",
    "isbn": "",
    "author": "",
    "publisher": "",
    "published_year": "",
    "updated_date": "",
    "_id": "",
  };

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private http: HttpClient,
              private BookService: BookService) { }

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
    this.BookService.getBookDetail(id).pipe(takeUntil(this._subscriptions)).subscribe(
      data => {
        this.bookObj = data;
      }, err =>{
        console.log(err);
      });
  }
  
  deletebook(id) {
    this.BookService.deletebook(id).pipe(takeUntil(this._subscriptions)).subscribe(
      res => {
        this.router.navigate(['/books']);
      }, err =>{
        console.log(err);
      });
  }

  toUpdateView(id) {
    this.router.navigate(['/book-edit', id]);
  }

}
