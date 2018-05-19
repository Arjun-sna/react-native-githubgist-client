import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Text, Image } from 'react-native';
import moment from 'moment';
import fileSize from 'filesize';
import { colors, normalizeFont } from '../../../config';

const Container = styled.View`
	display: flex;
	align-items: center;
	flex-direction: row;
	padding-top: 20;
	margin: 8px;
`;

const DetailsContainer = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	margin: 0 8px;
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
	font-size: ${normalizeFont(12)};
`;

export default GistDetailsHeader = ({userImage, userName, createdAt, description, gistSize}) => {
	return (
		<Container>
			<Avatar source={{uri: userImage}} />
			<DetailsContainer>
				<Title numberOfLines={2}>
					{userName}
					<SubTitle>{!isEmpty(description) ? ` / ${description}` : ''}</SubTitle>
				</Title>
				<SubTitle>{`${moment(createdAt).format('MMM DD, YYYY')} - ${fileSize(gistSize)}`}</SubTitle>
			</DetailsContainer>
		</Container>
	)
}