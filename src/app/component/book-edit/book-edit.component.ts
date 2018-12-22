import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { book } from '../../models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {

  bookObj: book = {
    "title": "",
    "isbn": "",
    "author": "",
    "publisher": "",
    "published_year": "",
    "updated_date": "",
    "_id": "",
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
  }

  getBook(id) {
    this.http.get('/book/' + id).subscribe(data => {
      this.bookObj.title = data["title"];
      this.bookObj.isbn = data["isbn"];
      this.bookObj.author = data["author"];
      this.bookObj.publisher = data["publisher"];
      this.bookObj.published_year = data["published_year"];
      this.bookObj.updated_date = data["updated_date"];
      this.bookObj._id = data["_id"];
    });
  }

  updateBook(id, data) {
    this.http.put('/book/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
