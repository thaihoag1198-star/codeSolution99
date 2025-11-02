export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  icon: string;
  color: string;
  icImg?:string,
}

export const TOKENS: Token[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45000.00,
    icon: '₿',
    color: '#F7931A',
    icImg:'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3200.00,
    icon: 'Ξ',
    color: '#627EEA',
    icImg:'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    price: 1.00,
    icon: '₮',
    color: '#26A17B',
    icImg:'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 320.00,
    icon: 'B',
    color: '#F3BA2F',
    icImg:'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 98.50,
    icon: '◎',
    color: '#14F195',
    icImg:'https://assets.coingecko.com/coins/images/4128/large/solana.png'
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    icon: '$',
    color: '#2775CA',
    icImg:'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.62,
    icon: '✕',
    color: '#000000',
    icImg:'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.48,
    icon: '₳',
    color: '#0033AD',
    icImg:'https://assets.coingecko.com/coins/images/975/large/cardano.png'
  },
  {
    id: 'doge',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.08,
    icon: 'Ð',
    color: '#C2A633',
    icImg:'https://assets.coingecko.com/coins/images/5/large/dogecoin.png'
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.85,
    icon: '⬟',
    color: '#8247E5',
    icImg:'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png'
  }
];

export const DEFAULT_FROM_TOKEN: Token = TOKENS[0];
export const DEFAULT_TO_TOKEN: Token = TOKENS[1];

