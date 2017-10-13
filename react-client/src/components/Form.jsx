import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NameInput from './NameInput.jsx';
import CardNumberInput from './CardNumberInput.jsx';
import CvvInput from './CvvInput.jsx';
import ExpirationInput from './ExpirationInput.jsx';

import amexLogo from '../img/amex.jpg';
import visaLogo from '../img/visa.jpg';

class Form extends Component {
  constructor(props) {
    super(props);
  }

  typeNumsOnly(e) {
    const isValidKey = [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1;
    const isSelectAll = e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true);
    const isReloadPage = e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true);
    const isDirectionKey = e.keyCode >= 35 && e.keyCode <= 40;
    
    if (isValidKey || isSelectAll || isReloadPage || isDirectionKey) return;
    
    const isNotANumber = e.shiftKey || (e.keyCode < 48 || e.keyCode > 57);
    const isNotOnNumberPad = e.keyCode < 96 || e.keyCode > 105;

    if (isNotANumber && isNotOnNumberPad) e.preventDefault();
  }

  render() {
    return (
      <div className="form-container">
        <h4>Enter your credit card information</h4>
        
        <form onSubmit={this.props.handleSubmit}>
          <NameInput handleNameChange={this.props.handleNameChange} />

          <CardNumberInput
            handleCardNumChange={this.props.handleCardNumChange}
            typeNumsOnly={this.typeNumsOnly}
            cardNumberLength={this.props.cardNumberLength}
            handleCardNumKeyUp={this.props.handleCardNumKeyUp}
            cardNumFieldClasses={this.props.cardNumFieldClasses} />

          <CvvInput
            handleCvvChange={this.props.handleCvvChange}
            typeNumsOnly={this.typeNumsOnly}
            cvvLength={this.props.cvvLength}
            handleCvvKeyUp={this.props.handleCvvKeyUp}
            cvvFieldClasses={this.props.cvvFieldClasses} />

          <ExpirationInput handleMonthSelect={this.props.handleMonthSelect} handleYearSelect={this.props.handleYearSelect}/>

          <div className="row inputs-group">
            <img src={amexLogo} id="amex" className={this.props.amexImgClass}/>
            <img src={visaLogo} id="visa" className={this.props.visaImgClass}/>
          </div>

          <div className="row inputs-group">
            <button className="btn btn-default" type="submit" id="submit">Submit</button>
          </div>
          
        </form>
      </div>
    );
  }
}

export default Form;