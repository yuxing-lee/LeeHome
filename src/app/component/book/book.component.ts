import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) { }

  books: any;
  
  ngOnInit() {
    this.http.get('/book').subscribe(data => {
      this.books = data;
    });
  }

  show(id: string) {
    this.router.navigate(['/book-details', id]);
  }

}
