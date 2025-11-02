# Problem 3: Code Refactoring

## Problematic Code

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  // missing blockchain property, but it's used below in balance.blockchain
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {} // BoxProps doesn't exist

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => { // using any loses type safety
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) { // bug: lhsPriority is not defined, should be balancePriority
          if (balance.amount <= 0) { // wrong logic: keeping negative/zero amounts instead of positive
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        
      });
  }, [balances, prices]); // prices not used in this useMemo

  // not memoized, recalculates every render
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map( // using wrong array: sortedBalances instead of formattedBalances
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount; // what if prices[balance.currency] is undefined?
      return (
        <WalletRow
          className={classes.row} // classes is not defined
          key={index} // using index as key is bad practice
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted} // sortedBalances doesn't have formatted property
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```

## Issues to Fix

1. **Type errors**: Missing properties, BoxProps undefined, using any
2. **Logic bugs**: lhsPriority undefined, filter logic reversed, missing return in sort
3. **Performance**: formattedBalances not memoized, unused dependency
4. **React issues**: index as key, no null check for prices, classes undefined

See `index.tsx` for the refactored solution.
