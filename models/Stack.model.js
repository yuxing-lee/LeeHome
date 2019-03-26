module.exports = function (No, name, shareCount, transactionCount, totalPrice, openingPrice, highestPrice, lowestPrice, closingPrice, upsAndDowns, spread,
    finalBuyPrice, finalBuyCount, finalSellPrice, finalsellCount, ratio, date) {
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