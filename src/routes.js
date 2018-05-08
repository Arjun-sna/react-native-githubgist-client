import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MyGistsScreen from './gists/screens/mygists.screen';
import PublicGistsScreen from './gists/screens/publicgists.screen';
import StarredGistsScreen from './gists/screens/starredgists.screen';
import ClearCacheScreen from './cache/screens/cache.screen.js';

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#33B5E5',
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});

const MainScreen = TabNavigator({
	MyGists: {
		screen: MyGistsScreen,
		navigationOptions: {
			tabBarLabel: 'My Gists',
		},
	},
	StarredGists: {
		screen: StarredGistsScreen,
		navigationOptions: {
			tabBarLabel: 'Starred',
		},
	},
	PublicGists: {
		screen: PublicGistsScreen,
		navigationOptions: {
			tabBarLabel: 'Public Gists',
		},
	},
}, {
	tabBarOptions: {
    showLabel: true,
    tintColor: 'blue',
    style: styles.tabStyle,
    labelStyle: styles.labelStyle,
  },
  animationEnabled: true,
	tabBarPosition: 'top',
});

const Home = DrawerNavigator({
	Home: {
		screen: MainScreen,
  },
  ClearCache: {
		screen: ClearCacheScreen,
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
			screen: Home,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		URIPrefix: 'gitgistrn://',
	}
);