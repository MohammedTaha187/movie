import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Me</h3>
          <p>Hi, I'm Mohamed, a Full Stack Developer passionate about creating dynamic and responsive web applications.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: <a href="mailto:ant833292@gmail.com">ant833292@gmail.com</a></li>
            <li>Phone: 01212299383</li>
            <li>Location: Cairo, Egypt</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Me</h3>
          <ul className="social-links">
            <li><a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mohamed. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
