import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cardNumber: '',
      cvv: '',
      expirationMonth: '01',
      expirationYear: '2017',
      displayErrorMsg: false,
      hasNameError: false,
      hasCardError: false,
      hasExpirationError: false,
      cardNumberLength: '16',
      cvvLength: '4',
      amexImgClass: null,
      visaImgClass: null,
      cardNumFieldClasses: ['row', 'inputs-group'],
      cvvFieldClasses: ['row', 'inputs-group']
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardNumChange = this.handleCardNumChange.bind(this);
    this.handleCvvChange = this.handleCvvChange.bind(this);
    this.handleMonthSelect = this.handleMonthSelect.bind(this);
    this.handleYearSelect = this.handleYearSelect.bind(this);
    this.handleCardNumKeyUp = this.handleCardNumKeyUp.bind(this);
    this.handleCvvKeyUp = this.handleCvvKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event handlers:

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleCardNumChange(e) {
    this.setState({cardNumber: e.target.value});
  }

  handleCvvChange(e) {
    this.setState({cvv: e.target.value});
  }

  handleMonthSelect(e) {
    this.setState({expirationMonth: e.target.value});
  }

  handleYearSelect(e) {
    this.setState({expirationYear: e.target.value});
  }

  handleCardNumKeyUp() {
    this.setState({
      cardNumberLength: '16',
      cvvLength: '4',
      amexImgClass: null,
      visaImgClass: null,
      cardNumFieldClasses: ['row', 'inputs-group']
    });
    
    if (this.startsWith4(this.state.cardNumber)) {
      this.setState({
        cardNumberLength: '16',
        cvvLength: '3',
        amexImgClass: 'transparent'
      });
    }

    if (this.hasAmexFirstTwoChars(this.state.cardNumber)) {
      this.setState({
        cardNumberLength: '15',
        cvvLength: '4',
        visaImgClass: 'transparent'
      });
    }
    
    if (this.isValidAmExNum(this.state.cardNumber) || this.isValidVisaNum(this.state.cardNumber)) {
      this.setState({
        cardNumFieldClasses: ['row', 'inputs-group', 'has-success']
      });
    } else {
      this.setState({
        cardNumFieldClasses: ['row', 'inputs-group', 'has-error']
      });
    }
  }

  handleCvvKeyUp() {
    this.setState({cvvFieldClasses: ['row', 'inputs-group']});
    
    if (this.isValidCardNumber(this.state.cardNumber, this.state.cvv)) {
      this.setState({
        cvvFieldClasses: ['row', 'inputs-group', 'has-success']
      });
    } else {
      this.setState({
        cvvFieldClasses: ['row', 'inputs-group', 'has-error']
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.setState({
      displayErrorMsg: true,
      hasNameError: false,
      hasCardError: false,
      hasExpirationError: false
    });
    
    if (!this.isValidName(this.state.name)) {
      this.setState({hasNameError: true});
    } else if (!this.isValidCardNumber(this.state.cardNumber, this.state.cvv)) {
      this.setState({hasCardError: true});
    } else if (!this.isValidExpiration(this.state.expirationMonth, this.state.expirationYear)) {
      this.setState({hasExpirationError: true});
    } else {
      this.setState({displayErrorMsg: false});
      alert('Great, everything looks good!');
    }
  }

  // Helper functions:

  isValidName(name) {
    return name.trim().length > 4;
  }

  isValidCardNumber(num, cvv) {
    const isValidVisa = this.isValidVisaNum(num) && this.isValidVisaCVV(cvv);
    const isValidAmEx = this.isValidAmExNum(num) && this.isValidAmExCVV(cvv);

    return isValidVisa || isValidAmEx;
  }

  startsWith4(num) {
    return num[0] === '4';
  }

  isValidVisaNum(num) {
    const isValidLength = num.length === 16;
    
    return isValidLength && this.startsWith4(num);
  }

  isValidVisaCVV(cvv) {
    return cvv.length === 3;
  }

  hasAmexFirstTwoChars(num) {
    const firstTwoChars = num.slice(0,2);

    return firstTwoChars === '34' || firstTwoChars === '37';
  }

  isValidAmExNum(num) {
    const isValidLength = num.length === 15;

    return isValidLength && this.hasAmexFirstTwoChars(num);
  }

  isValidAmExCVV(cvv) {
    return cvv.length === 4;
  }

  isValidExpiration(month, year) {
    const date = new Date();
    
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();

    if (year > currYear) {
      return true;
    } else if (+year === currYear) {
      return month > currMonth;
    }
    
    return false;
  }

  render() {
    return (
      <div className="app-container container-fluid">
        {this.state.displayErrorMsg ? <ErrorMessage
          hasNameError={this.state.hasNameError}
          hasCardError={this.state.hasCardError}
          hasExpirationError={this.state.hasExpirationError} /> : null}
        <Form 
          handleNameChange={this.handleNameChange}
          handleCardNumChange={this.handleCardNumChange}
          handleCvvChange={this.handleCvvChange}
          handleMonthSelect={this.handleMonthSelect}
          handleYearSelect={this.handleYearSelect}
          cardNumberLength={this.state.cardNumberLength}
          cvvLength={this.state.cvvLength}
          handleCardNumKeyUp={this.handleCardNumKeyUp}
          amexImgClass={this.state.amexImgClass}
          visaImgClass={this.state.visaImgClass}
          cardNumFieldClasses={this.state.cardNumFieldClasses}
          handleCvvKeyUp={this.handleCvvKeyUp}
          cvvFieldClasses={this.state.cvvFieldClasses}
          handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));