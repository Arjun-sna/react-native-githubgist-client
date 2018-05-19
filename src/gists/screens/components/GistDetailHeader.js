import React from 'react';
import styled from 'styled-components';
import { Text, Image } from 'react-native';
import moment from 'moment';
import { colors, normalizeFont } from '../../../config';

const Container = styled.View`
	display: flex;
	flex-direction: row;
	padding-top: 20;
	margin: 10px;
`;

const DetailsContainer = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	margin: 0 10px;
`;

const Avatar = styled.Image`
	height: 50;
	border-radius: 25;
	width: 50;
`

const Title = styled.Text`
	font-weight: bold;
	margin: 3px 0;
	color: ${colors.black}
	font-size: ${normalizeFont(16)};
`;

const SubTitle = styled.Text`
	margin: 3px 0;
	color: ${colors.greyDarkest}
`;

export default GistDetailsHeader = ({userImage, userName, createdAt}) => {
	return (
		<Container>
			<Avatar source={{uri: userImage}} />
			<DetailsContainer>
				<Title>{userName}</Title>
				<SubTitle>{moment(createdAt).format('MMM DD, YYYY')}</SubTitle>
			</DetailsContainer>
		</Container>
	)
}