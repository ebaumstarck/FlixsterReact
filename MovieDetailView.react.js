import React, { PropTypes } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  getBackdropURI,
} from './api'
import RatingView from './RatingView.react'

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: 200,
    // width: 400,
  },
  text: {
    color: 'rgb(57, 57, 57)',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
  },
});

class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const { movie } = this.props;
    console.log('backdrop URI: ' + getBackdropURI(movie));
    return (
      <View style={styles.container}>
        {this.state.loading &&
          <ActivityIndicator
            animating={true}
            style={[styles.centering, { height: 80 }]}
            size="large"
          />
        }
        <TouchableOpacity
          onPress={() => this.props.onTrailerClick(movie)}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: getBackdropURI(movie) }}
            onLoadEnd={() => this.setState({ loading: false })}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{movie.title}</Text>
        <RatingView rating={movie.vote_average} />
        <Text style={styles.text}>
          {movie.overview}
        </Text>
      </View>
    );
  }
}

MovieDetailView.propTypes = {
  movie: PropTypes.object.isRequired,
  onTrailerClick: PropTypes.func.isRequired,
}

export default MovieDetailView
