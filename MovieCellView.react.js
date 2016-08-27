import React, { PropTypes } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import RatingView from './RatingView.react'
import { getPosterURI } from './api'

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    // borderWidth: 1,
    // borderColor: 'rgb(246, 28, 143)',
  },
  textContainer: {
    // padding: 10,
    flex: 1,
    justifyContent: 'space-between',  // space-around
  },
  text: {
    color: 'rgb(57, 57, 57)',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

class MovieCellView extends React.Component {
  renderRating(rating) {
    var style;
    if (rating >= 5.0) {
      style = { color: 'green' };
    } else if (rating >= 3.5) {
      style = { color: 'black' };
    } else {
      style = { color: 'red' };
    }
    return (
      <Text style={style}>{rating}</Text>
    );
  }

  render() {
    const { movie } = this.props
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick(movie)}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: getPosterURI(movie) }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.title]}
              numberOfLines={1}
            >
              {movie.title}
            </Text>
            <Text
              style={styles.text}
              numberOfLines={1}
            >
              Rating: <RatingView rating={movie.vote_average} />
            </Text>
            <Text
              style={styles.text}
              numberOfLines={3}
            >
              {movie.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

MovieCellView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MovieCellView
