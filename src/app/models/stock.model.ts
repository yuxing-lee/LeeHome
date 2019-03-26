export class stock {

    public No: string = "";
    public name: string = "";
    public shareCount: number = 0;
    public transactionCount: number = 0;
    public totalPrice: number = 0;
    public openingPrice: number = 0;
    public highestPrice: number = 0;
    public lowestPrice: number = 0;
    public closingPrice: number = 0;
    public upsAndDowns: string = "";
    public spread: string = "";
    public finalBuyPrice: number = 0;
    public finalBuyCount: number = 0;
    public finalSellPrice: number = 0;
    public finalsellCount: number = 0;
    public ratio: number = 0;
    public date: string = "";

    constructor(No?: string, name?: string, shareCount?: number,
                transactionCount?: number, totalPrice?: number, openingPrice?: number,
                highestPrice?: number, lowestPrice?: number, closingPrice?: number,
                upsAndDowns?: string, spread?: string, finalBuyPrice?: number,
                finalBuyCount?: number, finalSellPrice?: number, finalsellCount?: number,
                ratio?: number, date?: string) {
        this.No = No;
        this.name = name;
        this.shareCount = shareCount;
        this.transactionCount = transactionCount;
        this.totalPrice = totalPrice;
        this.openingPrice = openingPrice;
        this.highestPrice = highestPrice;
        this.lowestPrice = lowestPrice;
        this.closingPrice = closingPrice;
        this.upsAndDowns = upsAndDowns;
        this.spread = spread;
        this.finalBuyPrice = finalBuyPrice;
        this.finalBuyCount = finalBuyCount;
        this.finalSellPrice = finalSellPrice;
        this.finalsellCount = finalsellCount;
        this.ratio = ratio;
        this.date = date;
    }
}