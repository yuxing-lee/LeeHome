import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Services
import { StockService } from '../../../services/stock.service';

//Models
import { stockIndex } from '../../../models/stockIndex.model';
import { stock } from '../../../models/stock.model';

@Component({
    selector: 'app-stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent {

    private _subscriptions: Subject<void> = new Subject<void>();

    public stockList = new Array<stock>();
    
    constructor(private stockService: StockService) { }

    public currentStock(stock: stockIndex): void {
        this.stockService.getStockByIndex(stock.index).pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                this.stockList = data.slice();
            }, err => {
                console.log(err);
            });
    }
}
