import React from 'react';
import './RightInfo.css';

export default function RightInfo (){
  const handleQuickOrder = () => {
    console.log('Quick order initiated');
  };

  const handleWhatsAppOrder = () => {
    console.log('WhatsApp order initiated');
  };

  return (
    <div className="right-info-container"> {/* Added container */}
      {/* Top Card */}
      <div className="sensual-card">
        <div className="card-icon">🔥</div>
        <h3 className="card-title">Quick & Discreet Ordering</h3>
        <p className="card-description">
          You can Order without Signing up, all we need is your Name and Phone Number to Reach you for Delivery
        </p>
        <button 
          className="sensual-btn primary-btn"
          onClick={handleQuickOrder}
        >
          ORDER NOW
        </button>
      </div>

      {/* Bottom Card */}
      <div className="sensual-card">
        <div className="card-icon">💬</div>
        <h3 className="card-title">Order via Whatsapp Now!</h3>
        <p className="card-description">
          Get personalized recommendations and discreet support through our WhatsApp service
        </p>
        <button 
          className="sensual-btn secondary-btn"
          onClick={handleWhatsAppOrder}
        >
          ORDER NOW
        </button>
      </div>
    </div>
  );
};