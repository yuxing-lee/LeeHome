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

    stockOnChange(stock: stockIndex) {
        this.stockTableComponent.currentStock(stock);
    }
}