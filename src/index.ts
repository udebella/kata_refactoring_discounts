import {getAmount, getAmountFromMarketPlace, getWebDiscount} from "./utils";

export class Order {
    private readonly type: string;
    orderNumber: string;

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
                const amount: number = getAmount();
                const discount: number = getWebDiscount();
                if (amount - discount > 50) return amount - discount - 1
                return amount - discount;
            case "RETAIL":
                return getAmount();
            case "MARKET_PLACE":
                return getAmountFromMarketPlace();
        }
        throw new Error("Should be unreachable");
    };
}

