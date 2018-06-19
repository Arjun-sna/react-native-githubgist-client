import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from './../config';

const GistOptions = ({ onDelete, onCancel }) => (
	<View style={{
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	}}>
		<View style={{ backgroundColor: colors.white, width: '85%' }}>
			<TouchableOpacity
				style={{ padding: '4%', borderBottomWidth: 1, borderColor: colors.grey }}
				onPress={onDelete}>
				<Text style={{ color: colors.red, fontSize: 18, fontStyle: '600' }}>Delete</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ padding: '4%' }}
				onPress={onCancel}>
				<Text style={{ color: colors.pictonBlue, fontSize: 18, fontStyle: '600' }}>Cancel</Text>
			</TouchableOpacity>
		</View>
	</View>
);

export default GistOptions;
