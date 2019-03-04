import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackButton from './BackButton';
import { normalizeFont, colors } from '../../../config';

const ToolbarContainer = styled.View`
	height: 44;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
  align-items: center;
  background-color: ${colors.black}
`;

const Title = styled.Text`
	font-size: ${normalizeFont(16)}
  font-weight: bold;
  color: ${colors.white}
`;

const Toolbar = props => {
	let toolbarContent;

	if (typeof props.toolbarContent === 'string') {
		toolbarContent = <Title numberOfLines={1}>{props.toolbarContent}</Title>;
	} else if (typeof props.toolbarContent === 'function') {
		toolbarContent = props.toolbarContent();
	} else {
		toolbarContent = { ...props };
	}

	return (
		<ToolbarContainer>
			<BackButton onPress={props.onBackPress} />
			{
				toolbarContent
			}
		</ToolbarContainer>
	);
};

Toolbar.propTypes = {
	toolbarContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		// PropTypes.instanceOf(Object),
	]).isRequired,
	onBackPress: PropTypes.func.isRequired,
};

export default Toolbar;
