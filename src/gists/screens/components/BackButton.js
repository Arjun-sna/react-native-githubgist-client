// @flow
import React from 'react';
import styled from 'styled-components';

const BackButtonContainer = styled.TouchableOpacity`
	height: 40;
	width: 50;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.Image`
	width: 17px;
	height: 16px;
	tintColor: ${props => props.color};
`;

type Props = {
  onPress: () => void,
	color?: string,
	testID?: string,
}

const BackButton = (props: Props) => (
  <BackButtonContainer onPress={props.onPress}>
    <Icon color={props.color}
      source={{ uri: 'back_grey' }}
    />
  </BackButtonContainer>
);

BackButton.defaultProps = {
	color: '#595959',
};

export default BackButton;
