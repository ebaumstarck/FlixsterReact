import React, { PropTypes } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ListView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import movieData from './movieData.js'
import MovieCellView from './MovieCellView.react'
import {
  badFetchMovies,
  fetchMovies,
} from './api'
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  overlay: {
    // flex: 1,
    // position: 'absolute',
    left: 0,
    top: 0,
    // opacity: 0.5,
    backgroundColor: 'gray',
    width: width,
  },
  warningText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
});

class MoviesView extends React.Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: dataSource,
      loading: true,
      loadingError: false,
      movies: null,
      refreshing: false,
      sortOrder: '<none>',
    }

    this.renderRow = this.renderRow.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setMovies = this.setMovies.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.fetchData()
  }

  setMovies(movies, sortOrder) {
    if (movies) {
      if (sortOrder === 'top') {
        movies.sort((a, b) => b.vote_average - a.vote_average);
      } else {
        movies.sort((a, b) => b.popularity - a.popularity);
      }
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(movies),
      loading: false,
      loadingError: false,
      movies: movies,
      sortOrder: sortOrder,
    });
  }

  fetchData() {
    const self = this;
    return (
      this.state.sortOrder === 'bad' ? badFetchMovies() : fetchMovies()
    )
      .then((movies) => {
        self.setMovies(movies, self.state.sortOrder);
      })
      .catch((error) => {
        console.log(error.msg);
        self.setState({
          loadingError: true,
          loading: false,
          refreshing: false,
        })
      });
  }

  renderRow(movie) {
    return (
      <MovieCellView
        movie={movie}
        onClick={this.props.onMovieClick}
      />
    )
  }

  setSortOrder(sortOrder) {
    if (this.state.movies) {
      this.setMovies(this.state.movies.slice(), sortOrder);
    }
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData()
      .then(() => {
        this.setState({ refreshing: false });
      });
  }

  renderHeader() {
    if (this.state.loadingError) {
      return (
        <View style={styles.overlay}>
          <Text style={styles.warningText}>⚠️ Network Error</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      );
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        renderHeader={this.renderHeader}
      />
    );
      // </View>
  }
}

MoviesView.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MoviesView
