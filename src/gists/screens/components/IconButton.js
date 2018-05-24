// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const IconButtonContainer = styled.TouchableOpacity`
	height: 40;
	width: 50;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

type Props = {
  onPress: () => void,
	color?: string,
	testID?: string,
}

const BackButton = (props: Props) => (
  <IconButtonContainer onPress={props.onPress}>
		<Icon 
			name='md-arrow-round-back'
			size={30}
    />
  </IconButtonContainer>
);

BackButton.defaultProps = {
	color: '#595959',
};

export default BackButton;
