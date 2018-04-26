import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import pluralize from 'pluralize';
import { colors } from '../../../config';

const Container = styled.TouchableOpacity`
	flex-direction: column;
	padding: 5px 10px;
`;

const Title = styled.Text`
	font-weight: bold;
	margin: 3px 0;
	color: ${colors.black}
`
const DetailsContainer = styled.View`;
	display: flex;
	flex-direction: row;
`;

const DetailsText = styled.Text`
	flex: 1;
	margin-right: 5px;
	text-align: ${props => props.right ? 'right' : 'left'};
	color: ${colors.greyDark}	
`;

const GistOverview = ({ gistData, onClickGist }) => {
	return (
		<Container onPress={() => onClickGist(gistData.id)}>
			<Title>{gistData.description}</Title>
			<DetailsContainer>
				<DetailsText>{moment(gistData.created_at).format('DD MMM YYYY')}</DetailsText>
				<DetailsText right>{pluralize('File', Object.keys(gistData.files).length, true)}</DetailsText>
			</DetailsContainer>
		</Container>
	)
}

export default GistOverview;