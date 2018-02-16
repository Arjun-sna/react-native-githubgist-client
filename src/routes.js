import React from 'react';
import {
	StackNavigator
} from 'react-navigation';
import SplashScreen from './auth/screens/splash.screen';

export const GistApp = StackNavigator({
	Splash: {
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
});