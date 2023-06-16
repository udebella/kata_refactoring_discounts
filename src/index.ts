import {getAmount, getAmountFromMarketPlace, getWebDiscount} from "./utils";

export interface Order {
    getOrderNumber: () => string
    getTotalAmount: () => number
}

const compose = <T> (...fns: Function[]) => (value?: T) => fns.reduce((acc, next) => next(acc), value)

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

export const createMarketOrder = compose(order, market);
export const createRetailOrder = order;
export const createWebOrder = compose(order, web)
