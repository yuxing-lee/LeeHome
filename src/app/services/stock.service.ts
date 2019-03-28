import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpoint } from '../consts/api-endpoint.const';

import { stock } from '../models/stock.model';
import { stockIndex } from '../models/stockIndex.model';

@Injectable()
export class StockService extends BaseService {

    public getAllStock(): Observable<any> {
        return this.http.get('/api/stock/', this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public getStockIndex(): Observable<stockIndex[]> {
        return this.http.get('/api/stock/index', this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public getStockByIndex(index: string): Observable<stock[]> {
        return this.http.get('/api/stock/index/' + index, this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }
}
