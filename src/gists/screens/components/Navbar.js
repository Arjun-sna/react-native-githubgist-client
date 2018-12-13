import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';

type Props = {
  navigation: {
    navigate: (routeName: string) => void,
  }
}

class Navbar extends Component<Props> {
  onMenuPress() {
    const { navigation } = this.props;
    navigation.navigate('DrawerOpen');
  }

  renderLeftButton() {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => this.onMenuPress()}
      >
        <Image
          style={styles.icon}
          source={{ uri: 'menu' }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#516790', true);
      StatusBar.setTranslucent(false);
    }
    StatusBar.setBarStyle('light-content');
    return (
      <NavigationBar
        statusBar={{
          tintColor: '#5481b8',
          style: 'light-content',
        }}
        title={{
          title: 'GithubGist',
          style: styles.navBarTitle,
        }}
        style={styles.navBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#5481b8',
  },
  navBarTitle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'stretch',    
    textAlign: 'center',
  },
  touchableOpacity: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 12,
  },
});

export default Navbar;
