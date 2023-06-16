import {createMarketOrder, createRetailOrder, createWebOrder, Order} from "../src";
import * as Utils from "../src/utils";


describe('Orders', function () {

    describe('order WEB', () => {
        test('should have default order number if it was not initialized', () => {
            const order: Order = createWebOrder();

            expect(order.getOrderNumber()).toEqual("defaultOrderNumber")
        })
        test('should have an order number if it when well initialized', () => {
            const order: Order = createWebOrder("123ABC456");

            expect(order.getOrderNumber()).toEqual("123ABC456")
        })

        test('should return amount - discount as total amount when order is web and total amount <= 50', () => {
            const order: Order = createWebOrder();

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 59);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(50)
        })
        test('should add a -1 discount on web order when total amount is > 50', () => {
            const order: Order = createWebOrder();

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 70);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(60)
        })

        test('should add a -10 discount on web order when total amount is >= 70', () => {
            const order: Order = createWebOrder();

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 79);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(60)
        })
    });

    describe('order RETAIL', () => {
        test('should have default order number if it was not initialized', () => {
            const order: Order = createRetailOrder();

            expect(order.getOrderNumber()).toEqual("defaultOrderNumber")
        })
        test('should have an order number if it when well initialized', () => {
            const order: Order = createRetailOrder("123ABC456");

            expect(order.getOrderNumber()).toEqual("123ABC456")
        })
        test('should return a total amount between 10 and 100 when order is retail', () => {
            const order: Order = createRetailOrder();

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toBeGreaterThanOrEqual(10)
            expect(totalAmount).toBeLessThanOrEqual(100)
        })
    });

    describe('order MARKET_PLACE', () => {
        test('should return 100 as total amount when order is from a market place', () => {
            const order: Order = createMarketOrder();

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(100)
        })

        test('should have default order number if it was not initialized', () => {
            const order: Order = createMarketOrder();

            expect(order.getOrderNumber()).toEqual("Market-Place:defaultOrderNumber")
        })
        test('should display Market-Place: before order number for Market Place order', () => {
            const order: Order = createMarketOrder("123ABC456");

            expect(order.getOrderNumber()).toEqual("Market-Place:123ABC456")
        })
    });
});