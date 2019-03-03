import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Octicons'

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
      <View style={styles.navBar}>
        <Icon
          name="logo-github"
          size={100}
          color='#FFFFFF'
          style={{height: 40}}/>
        <Icon
          name="logo-gist"
          size={58}
          color='#FFFFFF'          
          style={{height: 40}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
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
