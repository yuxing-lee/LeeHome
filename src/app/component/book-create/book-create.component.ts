import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { book } from '../../models/book.model'

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {

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

  constructor(private http: HttpClient, private router: Router) { }

  saveBook() {
    console.log(this.bookObj)
    this.http.post('/book', this.bookObj)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
