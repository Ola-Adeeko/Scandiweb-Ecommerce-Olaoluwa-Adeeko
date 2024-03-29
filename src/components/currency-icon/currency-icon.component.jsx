import React from "react";
import { connect } from "react-redux";
import {
  selectCurrencyHidden,
  selectCurrencySwitch,
} from "../../redux/currency/currency.selector";
import { createStructuredSelector } from "reselect";

import "./currency-icon.style.scss";

import { toggleCurrencyHidden } from "../../redux/currency/currency.action";

class CurrencyIcon extends React.Component {
  render() {
    const { currencySwitch, toggleCurrencyHidden, hiddenSwitch } = this.props;

    return (
      <div className="currency-icon" onClick={toggleCurrencyHidden}>
        <span className="label">{currencySwitch.symbol}</span>
        <span className={`${hiddenSwitch ? "accent" : "decent"}`}>&#x5E;</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyHidden: () => dispatch(toggleCurrencyHidden()),
});
const mapStateToProps = createStructuredSelector({
  hiddenSwitch: selectCurrencyHidden,
  currencySwitch: selectCurrencySwitch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyIcon);
