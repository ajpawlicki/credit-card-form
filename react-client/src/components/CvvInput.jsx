import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CvvInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="cvv-field" className={this.props.cvvFieldClasses.join(' ')}>
        <label className="control-label col-sm-2" htmlFor="cvv2">CVV2</label>
        <div className="col-sm-10">
          <input className="form-control"
            type="text"
            id="cvv2"
            placeholder="CVV2"
            maxLength={this.props.cvvLength}
            onChange={this.props.handleCvvChange}
            onKeyDown={this.props.typeNumsOnly}
            onKeyUp={this.props.handleCvvKeyUp}/>
        </div>
      </div>
    );
  }
}

export default CvvInput;