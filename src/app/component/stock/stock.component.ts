import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Services
import { StockService } from '../../services/stock.service';

//Models
import { stockIndex } from '../../models/stockIndex.model';
import { stock } from '../../models/stock.model';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    public stockList = new Array<stock>();

    constructor(private stockService: StockService) { }

    public stockOnChange(stock: stockIndex) {
        this.stockService.getStockByIndex(stock.index).pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                this.stockList = data.slice();
            }, err => {
                console.log(err);
            });
    }

    public getAllStock() {
        this.stockService.getAllStock().pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                }
            }, err => {
                console.log(err);
            });
    }

    private averageByDays(stockList: Array<stock>, start: number, length: number): number {
        let total = 0;
        let minDate = start - length;
        for (start; start > minDate; start--) {
            total = parseFloat(stockList[start].closingPrice) + total;
        }
        return total / length;
    }
}