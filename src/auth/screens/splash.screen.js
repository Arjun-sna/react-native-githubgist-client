import React from 'react';
import styled from 'styled-components';
import { Image, Text, Platform, Linking } from 'react-native';
import queryString from 'query-string';
// import CookieManager from 'react-native-cookies';
import { colors } from '../../config'

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

let stateRandom = Math.random().toString();

class Splash extends React.Component {
	render() {
		return (
			<LogoContainer>
				<Logo source={require('../../assets/logo.png')} resizeMode="contain" />
			</LogoContainer>
		);
	}
}

const mapStateToProps = state => ({
	isLoggingIn: state.auth.isLoggingIn,
	isAuthenticated: state.auth.isAuthenticated,
	hasInitialUser: state.auth.hasInitialUser
});

const mapDispatchToProps = dispatch => ({
	auth: (code, state) => dispatch(doAuth(code, state)),
});

export default Splash;
