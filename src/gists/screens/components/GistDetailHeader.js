import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import fileSize from 'filesize';
import { colors, normalizeFont } from '../../../config';
import defaultUserImage from '../../../assets/default_user_image.png';

const Container = styled.View`
	display: flex;
	align-items: center;
	flex-direction: row;
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
`;

const Title = styled.Text`
	font-weight: bold;
	margin: 3px 0;
	color: ${colors.white}
	font-size: ${normalizeFont(16)};
`;

const SubTitle = styled.Text`
	margin: 3px 0;
	color: ${colors.white}
	font-size: ${normalizeFont(12)};
`;

type Props = {
	userImage: string,
	userName: string,
	createdAt: string,
	description: string,
	gistSize: string,
}

export default GistDetailsHeader = ({
	userImage, userName, createdAt, description, gistSize,
}: Props) => {
	return (
		<Container>
			<Avatar source={userImage ? { uri: userImage } : defaultUserImage} />
			<DetailsContainer>
				<Title numberOfLines={2}>
					{userName}
					<SubTitle>{!isEmpty(description) ? ` / ${description}` : ''}</SubTitle>
				</Title>
				<SubTitle>{`${moment(createdAt).format('MMM DD, YYYY')} - ${fileSize(gistSize)}`}</SubTitle>
			</DetailsContainer>
		</Container>
	);
};
