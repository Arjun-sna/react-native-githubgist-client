import { StackNavigator, TabNavigator } from 'react-navigation';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MyGistsScreen from './main/screens/mygists.screen';
import PublicGistsScreen from './main/screens/publicgists.screen';
import StarredGistsScreen from './main/screens/starredgists.screen';

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
		Main: {
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
