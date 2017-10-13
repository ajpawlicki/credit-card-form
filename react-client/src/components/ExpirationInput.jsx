import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ExpirationInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row inputs-group">
        <label>Expiration:</label>
        <select id="month" onChange={this.props.handleMonthSelect}>
          <option value="01">January</option>
          <option value="02">February </option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select id="year" onChange={this.props.handleYearSelect}>
          <option value="2017"> 2017</option>
          <option value="2018"> 2018</option>
          <option value="2019"> 2019</option>
          <option value="2020"> 2020</option>
          <option value="2021"> 2021</option>
          <option value="2022"> 2022</option>
        </select>
      </div>
    );
  }
}

export default ExpirationInput;