import React from 'react';
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MyGistsScreen from './gists/screens/mygists.screen';
import PublicGistsScreen from './gists/screens/publicgists.screen';
import StarredGistsScreen from './gists/screens/starredgists.screen';
import GistDetailsScreen from './gists/screens/gistdetails.screen';
import GistFileContentScreen from './gists/screens/gistfilecontent.screen';
import GistContentListScreen from './gists/screens/gistContentList.screen';
import GistCommentsScreen from './gists/screens/gistComments.screen';
import Navbar from './gists/screens/components/Navbar';

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#000000',
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

const MainTabsScreen = TabNavigator({
  MyGists: {
    screen: MyGistsScreen,
    navigationOptions: {
      tabBarLabel: 'My Gists',
      tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name="gist" />
    },
  },
  StarredGists: {
    screen: StarredGistsScreen,
    navigationOptions: {
      tabBarLabel: 'Starred',
      tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name="star" />
    },
  },
  PublicGists: {
    screen: PublicGistsScreen,
    navigationOptions: {
      tabBarLabel: 'Public',
      tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={23} name="globe" />
    },
  },
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    tintColor: 'blue',
    style: styles.tabStyle,
    labelStyle: styles.labelStyle,
    inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
    activeTintColor: 'white',
    indicatorStyle: {
      backgroundColor: 'white',
      height: 4,
    },
  },
  animationEnabled: true,
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop,
  lazy: true,
});

const GistFileContentAndCommentsScreen = TabNavigator({
  GistContent: {
    screen: GistContentListScreen,
    navigationOptions: {
      tabBarLabel: 'Content',
      tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={30} name="file" />
    },
  },
  GistComments: {
    screen: GistCommentsScreen,
    navigationOptions: {
      tabBarLabel: 'Comments',
      tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={30} name="comment-discussion" />
    },
  },
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    tintColor: 'blue',
    style: styles.tabStyle,
    labelStyle: styles.labelStyle,
    inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
    activeTintColor: 'white',
    indicatorStyle: {
      backgroundColor: 'white',
      height: 4,
    },
  },
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop,
});

const MainScreen = StackNavigator({
  MainTabs: {
    screen: MainTabsScreen,
    navigationOptions: {
      header: props => <Navbar {...props} />,
    },
  },
  GistDetails: {
    screen: GistFileContentAndCommentsScreen,
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      header: <GistDetailsScreen navigation={navigation} />,
    }),
  },
  GistFileContentView: {
    screen: GistFileContentScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export const GistApp = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: MainScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    URIPrefix: 'gitgistrn://',
  }
);
