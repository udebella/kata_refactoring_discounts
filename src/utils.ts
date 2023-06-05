export const getAmount = (): number => randomBetween(10,100);

export const getWebDiscount = (): number => randomBetween(1,9);

export const getAmountFromMarketPlace = (): number => 100;

export const randomBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};