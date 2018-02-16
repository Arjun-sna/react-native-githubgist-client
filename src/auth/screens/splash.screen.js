import React from 'react';
import styled from 'styled-components';
import { Image, Text, Platform, Linking } from 'react-native';
import queryString from 'query-string';
// import CookieManager from 'react-native-cookies';
import { colors } from '../../config'
import { delay, resetNavigationTo } from '../../utils';

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
		const { navigation } = this.props;
		delay(resetNavigationTo('Login', navigation), 2000);
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
