import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_FROM_TOKEN, DEFAULT_TO_TOKEN, Token } from '../constants/tokens';
import { calculateExchangeRate, calculateOutputAmount, calculatePriceImpact } from '../utils/calculations';

export const useTokenSwap = () => {
  const [fromToken, setFromToken] = useState<Token>(DEFAULT_FROM_TOKEN);
  const [toToken, setToToken] = useState<Token>(DEFAULT_TO_TOKEN);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [priceImpact, setPriceImpact] = useState<number>(0);

  useEffect(() => {
    if (fromToken?.id && toToken?.id) {
      const rate = calculateExchangeRate(fromToken, toToken);
      setExchangeRate(rate);
    }
  }, [fromToken?.id, toToken?.id]);

  useEffect(() => {
    const numAmount = parseFloat(fromAmount);
    if (fromAmount && !isNaN(numAmount) && numAmount > 0) {
      const output = calculateOutputAmount(fromAmount, exchangeRate);
      setToAmount(output.toString());
      const impact = calculatePriceImpact(numAmount, fromToken);
      setPriceImpact(impact);
    } else {
      setToAmount('');
      setPriceImpact(0);
    }
  }, [fromAmount, exchangeRate, fromToken?.id]);

  const handleSwapTokens = useCallback((): void => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  }, [fromToken, toToken, toAmount]);

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    exchangeRate,
    priceImpact,
    setFromToken,
    setToToken,
    setFromAmount,
    handleSwapTokens,
  };
};

