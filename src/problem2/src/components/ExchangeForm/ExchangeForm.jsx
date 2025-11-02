import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTokenSwap } from '../../hooks/useTokenSwap';
import { MIN_AMOUNT, MAX_AMOUNT } from '../../constants/config';
import TokenInput from '../TokenInput/TokenInput';
import SwapButton from '../SwapButton/SwapButton';
import SwapDetails from '../SwapDetails/SwapDetails';
import { formatNumber } from '../../utils/formatters';
import './ExchangeForm.css';

const swapSchema = yup.object({
  amount: yup
    .string()
    .required('Amount is required')
    .test('valid-format', 'Invalid number format', (value) => {
      if (!value) return false;
      const validFormat = /^(0|0\.\d+|[1-9]\d*\.?\d*)$/;
      return validFormat.test(value);
    })
    .test('is-number', 'Must be a valid number', (value) => {
      return value ? !isNaN(Number(value)) : false;
    })
    .test('is-positive', `Amount must be at least ${MIN_AMOUNT}`, (value) => {
      return value ? Number(value) >= MIN_AMOUNT : false;
    })
    .test('max-amount', `Amount must not exceed ${MAX_AMOUNT.toLocaleString()}`, (value) => {
      return value ? Number(value) <= MAX_AMOUNT : true;
    })
});

const ExchangeForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    fromToken,
    toToken,
    toAmount,
    exchangeRate,
    priceImpact,
    setFromToken,
    setToToken,
    setFromAmount,
    handleSwapTokens,
  } = useTokenSwap();

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(swapSchema),
    defaultValues: {
      amount: ''
    },
    mode: 'onChange' 
  });

  const fromAmount = watch('amount');

  React.useEffect(() => {
    setFromAmount(fromAmount);
  }, [fromAmount, setFromAmount]);

  const handleSwapTokensWithForm = useCallback(() => {
    handleSwapTokens();
    setValue('amount', toAmount || '', { shouldValidate: false });
  }, [handleSwapTokens, setValue, toAmount]);

  const createTokenSelectHandler = useCallback((isFromToken) => (token, shouldSwap) => {
    if (shouldSwap) {
      if (isFromToken) {
        setFromToken(token);
        setToToken(fromToken);
      } else {
        setToToken(token);
        setFromToken(toToken);
      }
    } else {
      isFromToken ? setFromToken(token) : setToToken(token);
    }
  }, [fromToken, toToken, setFromToken, setToToken]);

  const handleFromTokenSelect = useCallback(
    createTokenSelectHandler(true),
    [createTokenSelectHandler]
  );

  const handleToTokenSelect = useCallback(
    createTokenSelectHandler(false),
    [createTokenSelectHandler]
  );

  const onSubmit = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="exchange-form-container">
      <form className="exchange-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState }) => (
            <TokenInput
              label="From"
              token={fromToken}
              otherToken={toToken}
              amount={field.value}
              onTokenSelect={handleFromTokenSelect}
              onAmountChange={field.onChange}
              onAmountBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <SwapButton onClick={handleSwapTokensWithForm} />

        <TokenInput
          label="To (estimated)"
          token={toToken}
          otherToken={fromToken}
          amount={toAmount ? formatNumber(parseFloat(toAmount), 6) : ''}
          onTokenSelect={handleToTokenSelect}
          readOnly={true}
        />

        <button 
          type="submit"
          className="submit-button"
          disabled={!fromAmount || parseFloat(fromAmount) <= MIN_AMOUNT || parseFloat(fromAmount) > MAX_AMOUNT}
        >
          Show Information
        </button>
      </form>

      {isModalOpen && (
        <SwapDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          swapData={{
            fromAmount,
            fromToken,
            toAmount: parseFloat(toAmount).toFixed(6),
            toToken,
            exchangeRate: exchangeRate.toFixed(6),
            priceImpact: priceImpact.toFixed(2)
          }}
        />
      )}
    </div>
  );
};

export default ExchangeForm;

