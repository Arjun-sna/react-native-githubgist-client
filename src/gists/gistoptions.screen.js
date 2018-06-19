import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from './../config';

const GistOptions = () => (
	<View style={{
		flex: 1, backgroundColor: colors.white, borderWidth: 5, borderColor: 'red',
	}}>
		<TouchableOpacity style={{ padding: '2%' }}>
			<Text>Delete</Text>
		</TouchableOpacity>
		<TouchableOpacity style={{ padding: '2%' }}>
			<Text>Cancel</Text>
		</TouchableOpacity>
	</View>

);

export default GistOptions;
