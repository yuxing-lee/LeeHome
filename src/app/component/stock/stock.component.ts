import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Services
import { StockService } from '../../services/stock.service';

//Models
import { stockIndex } from '../../models/stockIndex.model';

//Components
import { StockTableComponent } from '../../component/stock/stock-table/stock-table.component';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent {

    @ViewChild(StockTableComponent) stockTableComponent: StockTableComponent;

    private _subscriptions: Subject<void> = new Subject<void>();

    constructor(private stockService: StockService) { }

    public stockOnChange(stock: stockIndex) {
        this.stockTableComponent.currentStock(stock);
    }

    public getAllStock() {
        this.stockService.getAllStock().pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                for(let i = 0; i < data.length; i++)
                {
                    if(data[i]["rowCount"] != 52){
                        console.log(data[i]["title"])
                    }
                }
            }, err => {
                console.log(err);
            });
    }
}