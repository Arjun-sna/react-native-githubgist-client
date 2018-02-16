import React from 'react';
import {
	StackNavigator
} from 'react-navigation';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MainScreen from './main/screens/gistlist.screen';

export const GistApp = StackNavigator({
	Splash: {
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	Main: {
		screen: MainScreen,
		navigationOptions: {
			header: null
		}
	}
});