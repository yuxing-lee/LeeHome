import { Component, Input } from '@angular/core';

//Models
import { stock } from '../../../models/stock.model';

@Component({
    selector: 'app-stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent {

    @Input() stockList: Array<stock>;
    
    constructor() { }

}
