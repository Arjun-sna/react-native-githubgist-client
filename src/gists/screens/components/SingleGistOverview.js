import React from 'react';
import { View, Text } from 'react-native';
import sytled from 'styled-components';
import styled from 'styled-components';

const Container = styled.View`
	flex-direction: column;
	padding: 5px 10px;
`;

const Title = styled.Text`
	font-weight: bold;
	margin: 3px 0;
`

const GistOverview = ({ gistData }) => {
	return (
		<Container>
			<Title>{gistData.description}</Title>
			<Text>{gistData.created_at}</Text>
		</Container>
	)
}

export default GistOverview;