import React from "react";
import { connect } from "react-redux";

//import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import { CATEGORIES_QUERY } from "../graphql/queries";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import HeaderOptions from "./header-options.component";
import CurrencyDropdown from "../currency-dropdown/currency-dropdown.component";
import CurrencyIcon from "../currency-icon/currency-icon.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrencyHidden } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from "reselect";
import { toggleCurrencyHidden } from "../../redux/currency/currency.action";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { FaTimes, FaBars } from "react-icons/fa";

import "./header.style.scss";

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }
  render() {
    const { hidden, hiddenSwitch, toggleCurrencyHidden } = this.props;

    return (
      <div className="parent">
        <div
          className="header"
          // onClick={() => (hiddenSwitch ? "" : toggleCurrencyHidden())}
        >
          <div
            className={` ${this.state.isOpen ? "" : "options-close"} options`}
          >
            <Query query={CATEGORIES_QUERY}>
              {({ loading, data }) => {
                if (loading) return <p>Loading....</p>;

                const categories = data?.categories;
                return categories.map((category) => (
                  <HeaderOptions
                    key={category.name}
                    category={category}
                    onClick={() => this.setState({ isOpen: false })}
                  />
                ));
              }}
            </Query>
          </div>
          <button
            className="nav-btn"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            {this.state.isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="logo-container">
            {" "}
            <Logo className="logo" />
          </div>

          <div className="cart">
            <div>
              <CurrencyIcon />
            </div>
            <div>
              <CartIcon />
            </div>
            {hiddenSwitch ? null : <CurrencyDropdown />},
            {hidden ? null : <CartDropdown />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  hiddenSwitch: selectCurrencyHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyHidden: () => dispatch(toggleCurrencyHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
