import {Order} from "../src";
import * as Utils from "../src/utils";


describe('Orders', function () {

    describe('order all', () => {
        test('should have default order number if it was not initialized', () => {
            const type = "WRONG_ORDER_TYPE";
            const order: Order = new Order(type);

            expect(order.getOrderNumber()).toEqual("defaultOrderNumber")
        })
        test('should have an order number if it when well initialized', () => {
            const type = "WRONG_ORDER_TYPE";
            const order: Order = new Order(type, "123ABC456");

            expect(order.getOrderNumber()).toEqual("123ABC456")
        })
    });

    describe('order WEB', () => {
        test('should return amount - discount as total amount when order is web and total amount <= 50', () => {
            const type = "WEB";
            const order: Order = new Order(type);

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 59);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(50)
        })
        test('should add a -1 discount on web order when total amount is > 50', () => {
            const type = "WEB";
            const order: Order = new Order(type);

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 70);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(60)
        })

        test('should add a -10 discount on web order when total amount is >= 70', () => {
            const type = "WEB";
            const order: Order = new Order(type);

            const getAmountSpy = jest.spyOn(Utils, 'getAmount');
            const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
            getAmountSpy.mockImplementationOnce(() => 79);
            getWebDiscountSpy.mockImplementationOnce(() => 9);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(60)
        })
    });

    describe('order RETAIL', () => {
        test('should return a total amount between 10 and 100 when order is retail', () => {
            const type = "RETAIL";
            const order: Order = new Order(type);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toBeGreaterThanOrEqual(10)
            expect(totalAmount).toBeLessThanOrEqual(100)
        })
    });

    describe('order MARKET_PLACE', () => {
        test('should return 100 as total amount when order is from a market place', () => {
            const type = "MARKET_PLACE";
            const order: Order = new Order(type);

            const totalAmount = order.getTotalAmount();
            expect(totalAmount).toEqual(100)
        })

        test('should display Market-Place: before order number for Market Place order', () => {
            const type = "MARKET_PLACE";
            const order: Order = new Order(type, "123ABC456");

            expect(order.getOrderNumber()).toEqual("Market-Place:123ABC456")
        })
    });

    describe('order WRONG_ORDER_TYPE', () => {
        test('should throw error if order type is not supported', () => {
            const type = "WRONG_ORDER_TYPE";
            const order: Order = new Order(type);

            expect(() => order.getTotalAmount()).toThrowError();
        })
    });
});