import React, { useEffect } from 'react';
import { MODAL_AUTO_CLOSE_MS, PRICE_IMPACT_WARNING_THRESHOLD } from '../../constants/config';
import './SwapDetails.css';

const SwapDetails = ({ isOpen, onClose, swapData }) => {
  if (!isOpen) return null;

  const { fromAmount, fromToken, toAmount, toToken, exchangeRate, priceImpact } = swapData;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, MODAL_AUTO_CLOSE_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div className="swap-popup">
      <div className="popup-header">
        <span className="popup-title">🔄 Swap Details</span>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>

      <div className="popup-body">
        <div className="popup-row">
          <span className="popup-label">From:</span>
          <span className="popup-value">
            <span className="token-icon" style={{ color: fromToken.color }}>
              {fromToken.icon}
            </span>
            {fromAmount} {fromToken.symbol}
          </span>
        </div>

        <div className="popup-arrow">→</div>

        <div className="popup-row">
          <span className="popup-label">To:</span>
          <span className="popup-value">
            <span className="token-icon" style={{ color: toToken.color }}>
              {toToken.icon}
            </span>
            {toAmount} {toToken.symbol}
          </span>
        </div>

        <div className="popup-divider"></div>

        <div className="popup-info-row">
          <span className="info-label">Rate:</span>
          <span className="info-text">
            1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
          </span>
        </div>

        <div className="popup-info-row">
          <span className="info-label">Impact:</span>
          <span className={`info-text ${parseFloat(priceImpact) > PRICE_IMPACT_WARNING_THRESHOLD ? 'warning' : ''}`}>
            {priceImpact}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SwapDetails;

