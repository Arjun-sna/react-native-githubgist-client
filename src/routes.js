import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MyGistsScreen from './gists/screens/mygists.screen';
import PublicGistsScreen from './gists/screens/publicgists.screen';
import StarredGistsScreen from './gists/screens/starredgists.screen';
import ClearCacheScreen from './cache/screens/cache.screen.js';

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
	ClearCache: {
		screen: ClearCacheScreen,
		navigationOptions: {
			tabBarLabel: 'Clear Cache'
		},
	},
}, {
	tabBarOptions: {
		showLabel: true,
	},
	tabBarPosition: 'top',
});

const Home = DrawerNavigator({
	Home: {
		screen: MainScreen,
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
