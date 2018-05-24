import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import fileSize from 'filesize';
import CardView from 'react-native-cardview';
import { colors, normalizeFont } from '../../../config';

const CardContainer = styled(CardView)`
	padding: 8px;
	margin: 3px 5px;
`;

const TouchableContainer = styled.TouchableOpacity`
	display: flex;
	flex-direction: column;
`;

const MetaContainer = styled.View`
	flex: 1;
	display: flex;
	padding: 3px;
	flex-direction: row;
`;

const FileName = styled.Text`
	flex: 1;
	font-weight: bold;
	padding: 3px;
	font-size: ${normalizeFont(14)};
`;

const MetaDetail = styled.Text`
	flex: 1;
	font-size: ${normalizeFont(12)};
	color: ${colors.greyDark}
`;

export default ({fileData, onFileItemPress}) => {
	return (
		<CardContainer 
			cardElevation={2}
			cardMaxElevation={2}
			cornerRadius={5}
			>
			<TouchableContainer onPress={() => onFileItemPress(fileData)}>
				<FileName>{fileData.filename}</FileName>
				<MetaContainer>
					<MetaDetail>{fileData.language}</MetaDetail>
					<MetaDetail>{fileSize(fileData.size)}</MetaDetail>
				</MetaContainer>
			</TouchableContainer>
		</CardContainer>
	)
}