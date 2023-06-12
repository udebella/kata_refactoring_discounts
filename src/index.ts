import {getAmount, getAmountFromMarketPlace, getWebDiscount} from "./utils";

export class Order {
    private readonly type: string;
    private readonly orderNumber: string;

    constructor(type: string, orderNumber?: string) {
        this.type = type
        if (!orderNumber) this.orderNumber = "defaultOrderNumber"
        else this.orderNumber = orderNumber
    }
    getOrderNumber (): string {
        if (this.type === "MARKET_PLACE") {
            return `Market-Place:${this.orderNumber}`
        }
        else return this.orderNumber
    }

    getTotalAmount = (): number => {
        switch (this.type) {
            case "WEB":
                const totalAmount = getAmount() - getWebDiscount();
                let bonusDiscount = 0;
                if (totalAmount >= 70){
                    bonusDiscount = 10
                }
                else if (totalAmount > 50) {
                    bonusDiscount = 1
                }
                return totalAmount - bonusDiscount;
            case "RETAIL":
                return getAmount();
            case "MARKET_PLACE":
                return getAmountFromMarketPlace();
        }
        throw new Error("Should be unreachable");
    };
}

