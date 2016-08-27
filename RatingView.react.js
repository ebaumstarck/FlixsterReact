import React, { PropTypes } from 'react'
import {
  Text,
} from 'react-native'

class RatingView extends React.Component {
  render() {
    var style;
    if (this.props.rating >= 5.0) {
      style = { color: 'green' };
    } else if (this.props.rating >= 3.5) {
      style = { color: 'black' };
    } else {
      style = { color: 'red' };
    }
    return (
      <Text style={style}>{this.props.rating}</Text>
    );
  }
}

RatingView.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingView;
