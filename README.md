# CodeSolution99

A simplified crypto token exchange application based on CodeSolution10, with consolidated components and cleaner structure.

## Project Structure

```
codingslt99/
├── src/
│   ├── problem1/          # Sum to N implementations
│   ├── problem2/          # Token Exchange Application (simplified)
│   └── problem3/          # Wallet Page refactoring
└── README.md
```

## Comparison with Original

### Component Simplification

| Original | Simplified | Changes |
|----------|------------|---------|
| TokenSection | TokenInput | Renamed, merged selector + input |
| TokenSelector | - | Merged into TokenInput |
| AmountInput | - | Merged into TokenInput |
| SwapIconButton | SwapButton | Renamed |
| SwapModal | SwapDetails | Renamed |
| CurrencySwapForm | ExchangeForm | Renamed |

### Code Reduction

- **Problem 2**: Reduced from 10 tokens to 5 tokens
- **Components**: Consolidated from 6 small components to 4 main components
- **Functionality**: Same features, less code

## Features

- Token selection with search and debounce
- Real-time exchange rate calculation
- Price impact estimation
- Modern UI with dark mode support
- Form validation with React Hook Form
- Responsive design
- Auto-closing swap details modal

## Setup

```bash
cd src/problem2
npm install
npm run dev
```

## Technologies

- React 18
- TypeScript
- Vite
- React Hook Form
- Yup (validation)

## License

MIT
