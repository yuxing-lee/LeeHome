//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, DropdownModule } from 'primeng/primeng';

//Components
import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { BookCreateComponent } from './component/book-create/book-create.component';
import { BookEditComponent } from './component/book-edit/book-edit.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from "./component/login/login.component";
import { SignupComponent } from './component/signup/signup.component';
import { StockComponent } from './component/stock/stock.component';
import { StockDropdownComponent } from './component/stock/stock-dropdown/stock-dropdown.component';
import { StockTableComponent } from './component/stock/stock-table/stock-table.component';

//Services
import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { StockService } from './services/stock.service';


const appRoutes: Routes = [
    { path: 'books', component: BookComponent, data: { title: 'Book List' } },
    { path: 'book-details/:id', component: BookDetailComponent, data: { title: 'Book Details' } },
    { path: 'book-create', component: BookCreateComponent, data: { title: 'Create Book' } },
    { path: 'book-edit/:id', component: BookEditComponent, data: { title: 'Edit Book' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'signup', component: SignupComponent, data: { title: 'Sign Up' } },
    { path: 'stock', component: StockComponent, data: { title: 'Stock' } },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        BookDetailComponent,
        BookCreateComponent,
        BookEditComponent,
        HeaderComponent,
        LoginComponent,
        SignupComponent,
        StockComponent,
        StockDropdownComponent,
        StockTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(
            appRoutes
        ),
        BrowserAnimationsModule,
        DataTableModule,
        DropdownModule
    ],
    providers: [
        UserService,
        BookService,
        StockService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
