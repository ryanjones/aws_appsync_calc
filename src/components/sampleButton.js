import React from 'react';
import PropTypes from 'prop-types';
//import { goToAnchor } from 'react-scrollable-anchor'

class SampleButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.sampleCallback = this.props.sampleCallback
  }

  handleClick() {
    this.sampleCallback({
      operations: this.props.operations,
      realTimeUpdates: this.props.realTimeUpdates,
      connectionMinutes: this.props.connectionMinutes,
      userCount: this.props.userCount,
      transferCharges: this.props.transferCharges})
      // if(this.props.jump) {
      //   goToAnchor(this.props.jump)
      // }
  }

  render() {
    return (
      <button onClick={(e) => this.handleClick(e) }
      data-amplify-analytics-on='click'
      data-amplify-analytics-name='click'
      data-amplify-analytics-attrs='attr1:PopulateSample1'
      className="ui large button">
        Populate Sample Data
      </button>
    );
  }
}

SampleButton.propTypes = {
  operations: PropTypes.number,
  realTimeUpdates: PropTypes.number,
  connectionMinutes: PropTypes.number,
  userCount: PropTypes.number,
  transferCharges: PropTypes.number,
  sampleCallback: PropTypes.func
};

export default SampleButton;