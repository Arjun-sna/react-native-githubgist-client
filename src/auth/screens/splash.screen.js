import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { colors } from '../../config';

const LogoContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 100;
  height: 100;
`;

export default class Splash extends React.Component {
  render() {
    return (
      <LogoContainer>
        <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
      </LogoContainer>
    );
  }
}
