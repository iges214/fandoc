import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Customer Service Section */}
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Information</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/size-guides">Size Guides</a></li>
              <li><a href="/product-care">Product Care</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Intimacy Blog</a></li>
              <li><a href="/wellness-guides">Wellness Guides</a></li>
              <li><a href="/affiliate">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/terms-of-sale">Terms of Sale</a></li>
              <li><a href="/accessibility">Accessibility</a></li>
              <li><a href="/compliance">Compliance</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="footer-section">
            <h4>Stay Connected</h4>
            <div className="newsletter">
              <p>Get intimacy tips and exclusive offers</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
            
            <div className="contact-info">
              <p>Customer Support:</p>
              <a href="mailto:support@example.com">+234-9060000000</a>
              <p>Mon-Sat: 9AM-10PM WAT</p>
              <p>Sun: 1PM-10pm WAT</p>
            </div>
          </div>
        </div>

        {/* Security & Payment Section */}
        <div className="security-section">
          <div className="discretion-badges">
            <div className="badge">
              <span className="badge-icon">📦</span>
              <span>Discreet Packaging</span>
            </div>
            <div className="badge">
              <span className="badge-icon">💳</span>
              <span>Discreet Billing</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🔒</span>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span className="payment-icon">🤳Transfer</span>
              <span className="payment-icon">💳VISA</span>
              <span className="payment-icon">💳MASTERCARD</span>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" aria-label="Whatsap" className="social-link"></a>
            <a href="#" aria-label="Instagram" className="social-link">Instagram</a>
            <a href="#" aria-label="Twitter" className="social-link">Twitter</a>
            <a href="#" aria-label="YouTube" className="social-link">YouTube</a>
          </div>

          <div className="copyright">
            <p>&copy; {currentYear} Intimacy Wellness Co. All rights reserved.</p>
            <p className="disclaimer">For adults 18+. Please enjoy responsibly.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
