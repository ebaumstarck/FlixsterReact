import React from 'react'
import {
  BackAndroid,
  Navigator,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native'
import ColorView from './ColorView.react'
import MovieDetailView from './MovieDetailView.react'
import TabBar from './TabBar.react'
import TrailerView from './TrailerView.react'

const routes = [
  { title: 'Movies View', id: 0 },
]

const routeMapper = {
  LeftButton: (route, navigator) => {
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }
    return null;
  },
  RightButton: () => null,
  Title: (route) => <Text>{route.title}</Text>,
}

class NavApp extends React.Component {
  componentDidMount() {
    this.onBackAndroid = this.onBackAndroid.bind(this);

    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    this.navigator = null;
  }

  onBackAndroid() {
    console.log('back android');
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }
    return false;
  }

  render() {
    const renderScene = (route, navigator) => {
      this.navigator = navigator;
      const onPress = () => {
        if (route.id === 0) {
          navigator.push(routes[1])
        } else {
          navigator.pop()
        }
      };

      const onMovieClick = (movie) => {
        console.log('movie clicked: ' + movie.title);
        if (navigator.getCurrentRoutes().length === 1) {
          navigator.push({
            movie: movie,
            id: 1,
          });
        }
      };

      const onTrailerClick = (movie) => {
        console.log('trailer clicked: ' + movie.title);
        if (navigator.getCurrentRoutes().length === 2) {
          navigator.push({
            movie: movie,
            id: 2,
          });
        }
      };

      if (route.id === 0) {
        return (
          <TabBar
            onMovieClick={onMovieClick}
          />
        );
      } else if (route.id === 1) {
        return (
          <MovieDetailView
            movie={route.movie}
            onTrailerClick={onTrailerClick}
          />
        );
      } else {
        return (
          <TrailerView movie={route.movie} />
        );
      }
    };
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={renderScene}
      />
    );
  }
}

export default NavApp
