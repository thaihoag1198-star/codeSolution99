import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TOKENS } from '../../constants/tokens';
import { SEARCH_DEBOUNCE_MS } from '../../constants/config';
import { useDebounce } from '../../hooks/useDebounce';
import { calculateUSDValue } from '../../utils/calculations';
import { formatPrice } from '../../utils/formatters';
import './TokenInput.css';

const TokenInput = ({
  label,
  token,
  otherToken,
  amount,
  onTokenSelect,
  onAmountChange,
  onAmountBlur,
  error,
  readOnly = false,
  showBalance = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);
  const dropdownRef = useRef(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const usdValue = calculateUSDValue(amount, token.price);
  const showUsdValue = amount && parseFloat(amount) > 0;

  const filteredTokens = useMemo(() => {
    if (!debouncedSearchQuery) return TOKENS;
    const query = debouncedSearchQuery.toLowerCase();
    return TOKENS.filter(t => 
      t.symbol.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
          setSearchQuery('');
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelectToken = (selectedToken) => {
    const shouldSwap = selectedToken.id === otherToken.id;
    onTokenSelect(selectedToken, shouldSwap);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      onAmountChange?.(e);
    }
  };

  const handleImageError = (tokenId) => {
    setImageErrors(prev => new Set(prev).add(tokenId));
  };

  const shouldShowImage = (token) => {
    return token.icImg && !imageErrors.has(token.id);
  };

  return (
    <div className="token-input-section">
      <div className="section-header">
        <span className="section-label">{label}</span>
        {showBalance && (
          <span className="section-balance">Balance: 10.00</span>
        )}
      </div>
      
      <div className="input-row">
        {/* Token Selector */}
        <div className="token-selector-wrapper" ref={dropdownRef}>
          <div 
            className="token-selector" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {shouldShowImage(token) ? (
              <img 
                src={token.icImg} 
                alt={token.symbol}
                className="token-icon-img"
                onError={() => handleImageError(token.id)}
              />
            ) : (
              <span className="token-icon" style={{ color: token.color }}>
                {token.icon}
              </span>
            )}
            <span className="token-symbol">{token.symbol}</span>
            <span className="dropdown-arrow">▼</span>
            
            {isDropdownOpen && (
              <div className="token-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="token-search">
                  <input
                    type="text"
                    placeholder="Search tokens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>

                <div className="token-list">
                  {filteredTokens.length > 0 ? (
                    filteredTokens.map(t => (
                      <div
                        key={t.id}
                        className={`token-option ${t.id === token.id ? 'active' : ''}`}
                        onClick={() => handleSelectToken(t)}
                      >
                        {shouldShowImage(t) ? (
                          <img 
                            src={t.icImg} 
                            alt={t.symbol}
                            className="token-icon-img"
                            onError={() => handleImageError(t.id)}
                          />
                        ) : (
                          <span className="token-icon" style={{ color: t.color }}>
                            {t.icon}
                          </span>
                        )}
                        <div className="token-info">
                          <span className="token-symbol">{t.symbol}</span>
                          <span className="token-name">{t.name}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">No tokens found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-input-wrapper">
          <input
            type="text"
            className={`amount-input ${error ? 'input-error' : ''}`}
            placeholder="0.0"
            value={amount}
            onChange={handleChange}
            onBlur={onAmountBlur}
            readOnly={readOnly}
          />
        </div>
      </div>

      {error ? (
        <div className="input-error-message">{error}</div>
      ) : (
        showUsdValue ? (
          <div className="usd-value">
            ≈ ${formatPrice(usdValue)} USD
          </div>
        ) : (
          <div className="empty-value"/>
        )
      )}
    </div>
  );
};

export default TokenInput;

