import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CardNumberInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="card-number-field" className={this.props.cardNumFieldClasses.join(' ')}>
        <label className="control-label col-sm-2" htmlFor="card-number">Card Number</label>
        <div className="col-sm-10">
          <input className="form-control"
            type="text" id="card-number"
            placeholder="Card Number"
            maxLength={this.props.cardNumberLength}
            onChange={this.props.handleCardNumChange}
            onKeyDown={this.props.typeNumsOnly}
            onKeyUp={this.props.handleCardNumKeyUp}/>
        </div>
      </div>
    );
  }
}

export default CardNumberInput;