import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  WebView,
} from 'react-native';
import { fetchMovieTrailers } from './api';

const styles = StyleSheet.create({
  centering: {},
});

class TrailerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trailerUrl: null,
    };
  }

  componentDidMount() {
    fetchMovieTrailers(this.props.movie.id)
      .then((trailerUrl) => {
        this.setState({
          trailerUrl: `https://www.youtube.com/watch?v=${trailerUrl}`,
        });
      });
  }

  render() {
    if (!this.state.trailerUrl) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      );
    }
    return (
      <WebView
        source={{ uri: this.state.trailerUrl }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

TrailerView.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default TrailerView;
