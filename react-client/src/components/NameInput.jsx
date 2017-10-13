import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NameInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row inputs-group">
        <label className="control-label col-sm-2" htmlFor="name">Name</label>
        <div className="col-sm-10">
          <input className="form-control"
            type="text"
            id="name"
            placeholder="Name"
            onChange={this.props.handleNameChange}/>
        </div>
      </div>
    );
  }
}

export default NameInput;