import { Component, Input } from '@angular/core';

//Models
import { stock } from '../../../models/stock.model';
import CanvasJS from '../../../../assets/canvasjs.min';

@Component({
    selector: 'app-stock-line-chart',
    templateUrl: './stock-line-chart.component.html',
    styleUrls: ['./stock-line-chart.component.css']
})
export class StockLineChartComponent {

    @Input() set stockList(stockList: Array<stock>) {
        if (stockList.length != 0) {
            let dataPoints = [];
            let dataLines = [];
            let dataLinesTwo = [];
            stockList.sort(function (a, b) {
                return a.date > b.date ? 1 : -1;
            });
            for (let i = 4; i < stockList.length; i++) {
                let point = {
                    x: new Date(parseInt(stockList[i].date.substring(0, 4)), parseInt(stockList[i].date.substring(4, 6)) - 1, parseInt(stockList[i].date.substring(6, 8))),
                    y: [parseFloat(stockList[i].openingPrice), parseFloat(stockList[i].highestPrice), parseFloat(stockList[i].lowestPrice), parseFloat(stockList[i].closingPrice)]
                };
                let line = {
                    x: new Date(parseInt(stockList[i].date.substring(0, 4)), parseInt(stockList[i].date.substring(4, 6)) - 1, parseInt(stockList[i].date.substring(6, 8))),
                    y: this.averageByDays(stockList, i, 5)
                };
                if (i >= 19) {
                    let lineTwo = {
                        x: new Date(parseInt(stockList[i].date.substring(0, 4)), parseInt(stockList[i].date.substring(4, 6)) - 1, parseInt(stockList[i].date.substring(6, 8))),
                        y: this.averageByDays(stockList, i, 20)
                    };
                    dataLinesTwo.push(lineTwo);
                }
                dataPoints.push(point);
                dataLines.push(line);
            }
            this.drawLine(dataPoints, dataLines, dataLinesTwo);
        }
    }

    constructor() { }

    private averageByDays(stockList: Array<stock>, start: number, length: number): number {
        let total = 0;
        let minDate = start - length;
        for (start; start > minDate; start--) {
            total = parseFloat(stockList[start].closingPrice) + total;
        }
        return total / length;
    }

    private toggleDataSeries(e): void {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    private drawLine(dataPoints, dataLines, dataLinesTwo): void {
        let c = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            title: {
                text: "Stock"
            },
            axisX: {
                valueFormatString: "YYYY-MM-DD"
            },
            axisY: {
                includeZero: false,
                prefix: "NT$",
                title: "Price"
            },
            toolTip: {
                shared: true
            },
            legend: {
                reversed: true,
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [{
                type: "candlestick",
                showInLegend: true,
                name: "Stock Price",
                yValueFormatString: "$#,##0.00",
                xValueFormatString: "YYYY-MM-DD",
                dataPoints: dataPoints
            },
            {
                type: "line",
                showInLegend: true,
                name: "5天",
                yValueFormatString: "$#,##0.00",
                xValueFormatString: "YYYY-MM-DD",
                dataPoints: dataLines
            },
            {
                type: "line",
                showInLegend: true,
                name: "20天",
                yValueFormatString: "$#,##0.00",
                xValueFormatString: "YYYY-MM-DD",
                dataPoints: dataLinesTwo
            }]
        });
        c.render();
    }
}
