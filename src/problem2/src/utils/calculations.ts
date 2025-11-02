import { Token } from '../constants/tokens';

export const calculateExchangeRate = (fromToken: Token, toToken: Token): number => {
  if (!fromToken || !toToken || !fromToken.price || !toToken.price) {
    return 0;
  }
  return fromToken.price / toToken.price;
};

export const calculateOutputAmount = (inputAmount: string | number, exchangeRate: number): number => {
  if (!inputAmount || !exchangeRate || isNaN(Number(inputAmount))) {
    return 0;
  }
  return parseFloat(String(inputAmount)) * exchangeRate;
};

export const calculateUSDValue = (amount: string | number, price: number): number => {
  if (!amount || !price || isNaN(Number(amount))) {
    return 0;
  }
  return parseFloat(String(amount)) * price;
};

export const calculatePriceImpact = (inputAmount: string | number, fromToken: Token): number => {
  if (!inputAmount || !fromToken || isNaN(Number(inputAmount))) {
    return 0;
  }
  const tradeSize = parseFloat(String(inputAmount)) * fromToken.price;
  if (tradeSize < 1000) return 0.1;
  if (tradeSize < 10000) return 0.3;
  if (tradeSize < 100000) return 0.8;
  return 1.5;
};

