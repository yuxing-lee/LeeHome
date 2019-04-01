export class stock {

    public No: string = "";
    public name: string = "";
    public shareCount: string = "";
    public transactionCount: string = "";
    public totalPrice: string = "";
    public openingPrice: string = "";
    public highestPrice: string = "";
    public lowestPrice: string = "";
    public closingPrice: string = "";
    public upsAndDowns: string = "";
    public spread: string = "";
    public finalBuyPrice: string = "";
    public finalBuyCount: string = "";
    public finalSellPrice: string = "";
    public finalsellCount: string = "";
    public ratio: string = "";
    public date: string = "";

    constructor(No?: string, name?: string, shareCount?: string,
                transactionCount?: string, totalPrice?: string, openingPrice?: string,
                highestPrice?: string, lowestPrice?: string, closingPrice?: string,
                upsAndDowns?: string, spread?: string, finalBuyPrice?: string,
                finalBuyCount?: string, finalSellPrice?: string, finalsellCount?: string,
                ratio?: string, date?: string) {
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