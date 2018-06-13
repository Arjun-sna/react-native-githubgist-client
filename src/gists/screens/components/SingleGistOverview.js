import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
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
`;

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

class GistOverview extends React.Component {
	// shouldComponentUpdate(nextProps) {
	// 	return !(isEqual(this.props.gistData, nextProps.gistData));
	// }

	render() {
		const {
			gistData,
			onClickGist,
		} = this.props;

		const title = gistData.description ? gistData.description : Object.keys(gistData.files)[0];

		return (
			<Container onPress={() => onClickGist(gistData)}>
				<Title>{title}</Title>
				<DetailsContainer>
					<DetailsText>{moment(gistData.created_at).format('DD MMM YYYY')}</DetailsText>
					<DetailsText right>{pluralize('File', Object.keys(gistData.files).length, true)}</DetailsText>
				</DetailsContainer>
			</Container>
		);
	}
}

export default GistOverview;
