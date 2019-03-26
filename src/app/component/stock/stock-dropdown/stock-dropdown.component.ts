import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StockService } from '../../../services/stock.service';

import { stockIndex } from '../../../models/stockIndex.model';

@Component({
    selector: 'app-stock-dropdown',
    templateUrl: './stock-dropdown.component.html',
    styleUrls: ['./stock-dropdown.component.css']
})
export class StockDropdownComponent implements OnInit {

    @Output() stockOnChange: EventEmitter<stockIndex> = new EventEmitter<stockIndex>();

    private _subscriptions: Subject<void> = new Subject<void>();

    public stockIndexList = new Array<stockIndex>();

    constructor(private stockService: StockService) { }

    ngOnInit() {
        this.stockService.getStockIndex().pipe(takeUntil(this._subscriptions)).subscribe(
            data => {
                this.stockIndexList = data.slice();
                this.stockIndexList.splice(0, 0, new stockIndex(null, "請選擇股票", null));
            }, err => {
                console.log(err);
            });
    }

    public selectStock(event): void {
        let stock = event.value;
        console.log(stock)
        if (stock.index)
            this.stockOnChange.emit(stock);
    }

}
