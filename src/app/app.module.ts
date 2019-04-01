//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, DropdownModule, DialogModule, ChartModule, ProgressSpinnerModule } from 'primeng/primeng';
import { ToastrModule } from 'ngx-toastr';

//Components
import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from "./component/login/login.component";
import { StockComponent } from './component/stock/stock.component';
import { StockDropdownComponent } from './component/stock/stock-dropdown/stock-dropdown.component';
import { StockTableComponent } from './component/stock/stock-table/stock-table.component';
import { CreateModalComponent } from './component/book/create-modal/create-modal.component';
import { EditModalComponent } from './component/book/edit-modal/edit-modal.component';
import { CreatUserModalComponent } from './component/header/creat-user-modal/creat-user-modal.component';
import { StockLineChartComponent } from './component/stock/stock-line-chart/stock-line-chart.component';

//Services
import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { StockService } from './services/stock.service';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
    { path: "", component: BookComponent, canActivate: [AuthService] },
    { path: 'books', redirectTo: '/', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'books', component: BookComponent, data: { title: 'Book List' }, canActivate: [AuthService] },
    { path: 'stock', component: StockComponent, data: { title: 'Stock' }, canActivate: [AuthService] }
];

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        HeaderComponent,
        LoginComponent,
        StockComponent,
        StockDropdownComponent,
        StockTableComponent,
        CreateModalComponent,
        EditModalComponent,
        CreatUserModalComponent,
        StockLineChartComponent
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
        DropdownModule,
        DialogModule,
        ToastrModule.forRoot(),
        ChartModule,
        ProgressSpinnerModule
    ],
    providers: [
        UserService,
        BookService,
        StockService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
