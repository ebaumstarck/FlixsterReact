import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MoviesView from './MoviesView.react'
import NavApp from './NavApp.react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'green',
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    height: 50,
    backgroundColor: 'rgb(94, 94, 94)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabBarText: {
    color: 'white',
    fontSize: 20,
  },
})

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'now',
    };
    this.moviesView = null;
  }

  setSortOrder(sortOrder) {
    this.setState({ currentTab: sortOrder });
    if (this.moviesView) {
      this.moviesView.setSortOrder(sortOrder);
    }
  }

  renderTabBar() {
    const selectedStyle = tabName => {
      if (tabName !== this.state.currentTab) {
        return { color: 'rgba(255, 255, 255, 0.36)' };
      }
      return { color: 'white' };
    };
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => this.setSortOrder('now')}>
          <Text style={[styles.tabBarText, selectedStyle('now')]}>Now Playing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setSortOrder('top')}>
          <Text style={[styles.tabBarText, selectedStyle('top')]}>Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setSortOrder('bad')}>
          <Text style={[styles.tabBarText, selectedStyle('bad')]}>Bad Request</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderScene() {
    return (
      <View style={styles.scene}>
        <MoviesView
          ref={(ref) => {
            this.moviesView = ref;
          }}
          onMovieClick={this.props.onMovieClick}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScene()}
        {this.renderTabBar()}
      </View>
    );
  }
}

TabBar.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default TabBar
