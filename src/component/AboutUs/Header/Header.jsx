/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  AccountCircleOutlined,
  KeyboardArrowDown,
  LocalPhoneOutlined,
  MicNone,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="d-flex align-item--center justify-content--space-between f-wrap">
            <div className="header__logo">
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/0521/9811/3433/files/logo-1.png?v=1621430855"
                  alt="logo"
                />
              </a>
            </div>
            <div className="header__actions">
              <ul>
                <li>
                  <a href="#" className="d-flex align-item--center">
                    <span>EN</span>
                    <KeyboardArrowDown />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <LocalPhoneOutlined />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <ShoppingCartOutlined />
                  </a>
                </li>

                <li>
                  <a href="#">
                    <AccountCircleOutlined />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="d-flex align-item--center justify-content--space-between f-wrap">
            <nav>
              <ul>
                <li>
                  <a href="#">Buy Machines</a>
                </li>
                <li>
                  <a href="#">Sell Machines</a>
                </li>
                <li>
                  <a href="#">
                    <span className="d-flex align-item--center">
                      Services
                      <KeyboardArrowDown />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="d-flex align-item--center">
                      Shops
                      <KeyboardArrowDown />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </nav>
            <div className="search-input">
              <div className="input-icon search-icon">
                <Search />
              </div>
              <input placeholder="Search" />
              <div className="input-icon voice-icon">
                <MicNone />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
