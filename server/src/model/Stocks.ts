import * as  SimplexNoise from "simplex-noise";
import moment = require("moment");
import _ = require("lodash");

export class Stocks {
    private _lastTime = 0;
    private _stocks: Stock[] = [];
    private _simplex = new SimplexNoise('seed');

    constructor() {
        let sectors = ["Sector 1", "Sector 2", "Sector 3", "Sector 4"]
        let magnitudes = [1, 10, 20, 50, 100];
        let swings = [8, 9, 10];

        for (var s = 0; s < 30; s++) {
            let stock = new Stock();
            stock.Index = s;
            stock.Ticker = "Stock " + this.makeid(3) + s;
            stock.Sector = sectors[Math.floor(Math.random()*sectors.length)];
            stock.Magnitude = magnitudes[Math.floor(Math.random()*magnitudes.length)];
            stock.Swing = swings[Math.floor(Math.random()*swings.length)];

            for (var t = 0; t < 60; t++) {
                this.UpdateStock(stock, t);
            }
            this._stocks.push(stock);
        }
        this._lastTime = 60;
    }

    private makeid(length:number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     public UpdateAllStocks(): void {
         this._stocks.forEach(s => {
             this.UpdateStock(s, this._lastTime);
         });
         this._lastTime += 1;
     }

     public UpdateStock(stock:Stock, time:number) {
        let p = new Price();
        p.Time = time;
        p.Price = ((this._simplex.noise2D(stock.Index, time / stock.Swing) + 1) / 2) * stock.Magnitude;
        stock.Prices.push(p);
        stock.Prices = _.takeRight(stock.Prices, 60);
     }

     public ToReturn(): any {
         let ret = [];

         let now = moment("2018-01-01");

         this._stocks.forEach(s => {
             let stock = {};
             let prices = [];
             s.Prices.forEach(p => {
                let t = p.Time;
                let tt = now.add(t * 1, "minutes").toDate().getTime();
                prices.push({
                    "time": tt,
                    "price": p.Price
                })
             });
             stock["name"] = s.Ticker;
             stock["sector"] = s.Sector;
             stock["prices"] = prices;
             ret.push(stock);
         });

         return {stocks: ret};
     }

}

export class Stock {
    public Index: number;
    public Magnitude: number;
    public Swing: number;
    public Ticker: string;
    public Sector: string;
    public Prices: Price[] = [];
}

export class Price {
    public Time:number;
    public Price: number;
}