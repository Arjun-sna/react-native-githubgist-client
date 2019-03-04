import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Octicons'
import { colors } from '../../../config';

const BackButtonContainer = styled.TouchableOpacity`
	height: 40;
	width: 50;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const BackButton = (props) => (
	<BackButtonContainer onPress={props.onPress}>
		<Icon
      color={colors.white}
      size={30}
			name="arrow-left"
		/>
	</BackButtonContainer>
);

BackButton.defaultProps = {
	color: '#595959',
};

export default BackButton;
