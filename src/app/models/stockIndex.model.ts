export class stockIndex {

    public stockNo: string = "";
    public stockName: string = "";
    public index: string = "";

    constructor(stockNo?: string, stockName?: string, index?: string) {
        this.stockNo = stockNo;
        this.stockName = stockName;
        this.index = index;
    }
}