import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import CardView from 'react-native-cardview';
import { colors, normalizeFont } from '../../../config';

const Container = styled(CardView)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	margin: 5px;
`;

const MetaContainer = styled.View`
	flex: 1;
	display: flex;
	padding: 5px;
	flex-direction: row;
`;

const FileName = styled.Text`
	flex: 1;
	font-weight: bold;
	padding: 5px;
	font-size: ${normalizeFont(14)};
`;

const MetaDetail = styled.Text`
	flex: 1;
	font-size: ${normalizeFont(12)};
	color: ${colors.greyDark}
`;

export default ({fileName, language, size}) => {
	return (
		<Container cardElevation={2}
		cardMaxElevation={2}
		cornerRadius={5}>
			<FileName>{fileName}</FileName>
			<MetaContainer>
				<MetaDetail>{language}</MetaDetail>
				<MetaDetail>{size}</MetaDetail>
			</MetaContainer>
		</Container>
	)
}