import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {

  bookObj: book = {
    "title": "",
    "isbn": "",
    "author": "",
    "publisher": "",
    "published_year": "",
    "updated_date": "",
    "_id": "",
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
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
  
  deletebookObj(id) {
    this.http.delete('/book/'+id)
      .subscribe(res => {
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  toUpdateView(id) {
    this.router.navigate(['/book-edit', id]);
  }

}
