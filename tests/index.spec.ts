import {Order} from "../src";
import * as Utils from "../src/utils";


describe('Orders', function () {

    test('should return amount - discount as total amount when order is web and total amount <= 50', () => {
        const type: string = "WEB";
        const order: Order = new Order(type);

        const getAmountSpy = jest.spyOn(Utils, 'getAmount');
        const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
        getAmountSpy.mockImplementationOnce(() => 59);
        getWebDiscountSpy.mockImplementationOnce(() => 9);

        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toEqual(50)
    })
    test('should add a -1 discount on web order when total amount is > 50', () => {
        const type: string = "WEB";
        const order: Order = new Order(type);

        const getAmountSpy = jest.spyOn(Utils, 'getAmount');
        const getWebDiscountSpy = jest.spyOn(Utils, 'getWebDiscount');
        getAmountSpy.mockImplementationOnce(() => 70);
        getWebDiscountSpy.mockImplementationOnce(() => 9);

        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toEqual(60)
    })
    test('should return a total amount between 10 and 100 when order is retail', () => {
        const type: string = "RETAIL";
        jest.requireActual("../src/utils")

        const order: Order = new Order(type);

        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toBeGreaterThanOrEqual(10)
        expect(totalAmount).toBeLessThanOrEqual(100)
    })
    test('should return 100 as total amount when order is from a market place', () => {
        const type: string = "MARKET_PLACE";
        const order: Order = new Order(type);

        const totalAmount = order.getTotalAmount();
        expect(totalAmount).toEqual(100)
    })
    test('should throw error if order type is not supported', () => {
        const type: string = "WRONG_ORDER_TYPE";
        const order: Order = new Order(type);

        expect(() => order.getTotalAmount()).toThrowError();
    })
    test('should have default order number if it was not initialized', () => {
        const type: string = "WRONG_ORDER_TYPE";
        const order: Order = new Order(type);

        expect(order.orderNumber).toEqual("defaultOrderNumber")
    })
    test('should have an order number if it when well initialized', () => {
        const type: string = "WRONG_ORDER_TYPE";
        const order: Order = new Order(type, "123ABC456");

        expect(order.orderNumber).toEqual("123ABC456")
    })
});