import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-warning container error-container" id="error-container">
        <div className="row">
          <i className="glyphicon glyphicon-exclamation-sign"></i>
          <span>There was a problem:</span>
        </div>
        <div className="row" id="error-type">
          {this.props.hasNameError ? <div>Invalid name</div> : null}
          {this.props.hasCardError ? <div>Invalid card number and cvv</div> : null}
          {this.props.hasExpirationError ? <div>Invalid expiration</div> : null}
        </div>
      </div>
    );
  }
}

export default ErrorMessage;