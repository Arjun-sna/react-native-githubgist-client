import React from 'react';
import { View, Text } from 'react-native';

const GistOverview = ({ gistData }) => {
	return (
		<View>
			<Text>{gistData.description}</Text>
			<Text>{gistData.created_at}</Text>
		</View>
	)
}

export default GistOverview;