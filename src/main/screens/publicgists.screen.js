import React from 'react';
import { Text } from 'react-native';
import navigatorService from '../../utils/navigatorService';

export default () => {
	navigatorService.printRoutes();
	return (
		<Text> This is the Public gists Screen </Text>
	)
};