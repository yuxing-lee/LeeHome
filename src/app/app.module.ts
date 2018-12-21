import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { BookCreateComponent } from './component/book-create/book-create.component';
import { BookEditComponent } from './component/book-edit/book-edit.component';
import { HeaderComponent } from './component/header/header.component';


const appRoutes: Routes = [
  { path: 'books', component: BookComponent, data: { title: 'Book List' } },
  { path: 'book-details/:id', component: BookDetailComponent, data: { title: 'Book Details' } },
  { path: 'book-create', component: BookCreateComponent, data: { title: 'Create Book' } },
  { path: 'book-edit/:id', component: BookEditComponent, data: { title: 'Edit Book' } },
  { path: '', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
