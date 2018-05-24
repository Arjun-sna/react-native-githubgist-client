import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import BackButton from './BackButton';

const ToolbarContainer = styled.View`
	height: 44;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
`;

export default (props) => {
	return(
		<ToolbarContainer>
			<BackButton onPress={props.onBackPress}/>
			<Text>Test toolbar</Text>
		</ToolbarContainer>
	)
}