import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import BackButton from './BackButton';
import { normalizeFont } from '../../../config'

const ToolbarContainer = styled.View`
	height: 44;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const Title = styled.Text`
	font-size: ${normalizeFont(16)}
	font-weight: bold;
`;

export default (props) => {
	let toolbarContent;
	if (typeof props.toolbarContent === 'string') {
		toolbarContent = <Title>{props.toolbarContent}</Title>
	} else if (typeof props.toolbarContent === 'function') {
		toolbarContent = props.toolbarContent();
	} else {
		toolbarContent = props.toolbarContent;
	}

	return(
		<ToolbarContainer>
			<BackButton onPress={props.onBackPress}/>
			{
				toolbarContent 
			}
		</ToolbarContainer>
	)
}