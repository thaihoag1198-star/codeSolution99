import { DECIMAL_PLACES, PRICE_DECIMAL_PLACES } from '../constants/config';

export const formatNumber = (num: number | string, decimals: number = DECIMAL_PLACES): string => {
  if (!num || isNaN(Number(num))) return '0';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals
  });
};

export const formatPrice = (price: number | string): string => {
  return formatNumber(price, PRICE_DECIMAL_PLACES);
};

export const formatPercentage = (percentage: number): string => {
  if (!percentage || isNaN(percentage)) return '0.00%';
  return `${percentage.toFixed(2)}%`;
};

