import "./Header.css";
import logoImg from "../../images/turnerscars_logo_1line_horz_true-rgb-desktop.png";
import { useState } from "react";

export default function Header() {
  return (
    <div className="home">
      <div className="header">
        <div className="logoContainer">
          <img src={logoImg} className="logo" alt="logo" />
        </div>
        <nav className="main-menu">
        <div className="bottom_nav">
            <div className="nav_content">
                <ul>
                    <li>Find a Car</li>
                    <li>How to Buy</li>
                    <li>Sell your Car</li>
                    <li>Finance & Insurance</li>
                    <li>Turners Subscription</li>
                </ul>
            </div>
        </div>
        </nav>
      </div>
      <div className="description"></div>
    </div>
  );
}
