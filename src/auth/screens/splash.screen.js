import React from 'react';
import styled from 'styled-components';
import { Image, Text, Platform, Linking } from 'react-native';
import queryString from 'query-string';
// import CookieManager from 'react-native-cookies';
import { colors } from '../../config'
import navigatorService from '../../utils/navigatorService';

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

class Splash extends React.Component {
	componentDidMount() {
		// console.log('didmount resetting now')
		setTimeout(() => { console.log('resetting now');navigatorService.reset('Login')}, 2000);
	}

	componentWillUnmount() {
		// console.log('splash will unmount ' + navigatorService.printRoutes());		
	}

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
