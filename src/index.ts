import {getAmount, getAmountFromMarketPlace, getWebDiscount} from "./utils";

export interface Order {
    getOrderNumber: () => string
    getTotalAmount: () => number
}
function compose<T1, T2, T3>(
    f : (x : T2) => T3,
    g : (x?: T1) => T2
): (x?: T1) => T3 {
    return x => f(g(x));
}

const order = (orderNumber = 'defaultOrderNumber'): Order => ({
    getOrderNumber: () => orderNumber,
    getTotalAmount: getAmount
})

const market = (order: Order): Order => ({
    getOrderNumber: () => `Market-Place:${order.getOrderNumber()}`,
    getTotalAmount: getAmountFromMarketPlace
})

const web = (order: Order): Order => ({
    ...order,
    getTotalAmount: () => {
        const amountBeforeBonusDiscount = getAmount() - getWebDiscount();
        const bonusDiscount = computeBonusDiscount(amountBeforeBonusDiscount);
        return amountBeforeBonusDiscount - bonusDiscount;
    }
})

const computeBonusDiscount = (amount: number): number =>
    amount >= 70    ? 10    :
    amount > 50     ? 1     :
                      0

export const createMarketOrder = compose(market, order);
export const createRetailOrder = order;
export const createWebOrder = compose(web, order)
