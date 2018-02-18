import React from 'react';
import {
	View,
	StyleSheet,
	Linking,
	WebView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { Button } from 'react-native-elements';
import queryString from 'query-string';
import { colors } from '../../config'
import { resetNavigationTo } from '../../utils';

export const CLIENT_ID = '9ad8569261681e200601';
export const CLIENT_SECRET = '3b825b8ab987cfce15404837ac3dc0abdbdae4cc';
let stateRandom = Math.random().toString();

const SignInContainer = styled.View`
	flex: 1;
	padding-top: 20;
	background-color: #1f2327;
`;

const BrowserSection = styled.View`
	flex: 5;
`;

const ContentSection = styled.View`
	flex: 2;
	justify-content: center;
	align-items: center;
`;

const BrowserLoader = styled.View`
	flex: 1;
	position: absolute;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	background-color: ${colors.githubDark};
`;

const LoaderText = styled.Text`
	fontSize: 20;
	color: ${colors.white};
	padding-bottom: 20;
`;

const StyledButton = styled(Button).attrs({
	buttonStyle: {
		backgroundColor: colors.transparent,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: colors.white,
		paddingVertical: 10,
		paddingHorizontal: 30,
		shadowColor: colors.transparent,
	},
	textStyle: {
		fontSize: 12,
	}
}) ``;

export default class Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	toggleCancelButton = (e, disabled) => {
		const url = e.nativeEvent.url;

		if (url === 'https://github.com/session') {
			this.setState({ cancelDisabled: disabled });
		}
	}

	handleOpenURL = ({ url }) => {
		if (url && url.substring(0, 12) === 'gitgistrn://') {
			const [, queryStringFromUrl] = url.match(/\?(.*)/);
			const { state, code } = queryString.parse(queryStringFromUrl);
			const { auth, getUser, navigation } = this.props;

			if (stateRandom === state) {
				this.setState({
					code,
					showLoader: true,
					loaderText: 'Please wait...',
				});

				stateRandom = Math.random().toString();
				
				resetNavigationTo('Main', this.props.navigation);
				// CookieManager.clearAll().then(() => {
				// 	auth(code, state).then(() => {
				// 		getUser().then(() => {
				// 			resetNavigationTo('Main', navigation);
				// 		});
				// 	});
				// });
			}
		}
	}

	onNavigationStateChange = navState => {
		const url = navState.url;

		this.handleOpenURL({ url });
	};

	renderLoading() {
		return (
			<BrowserLoader>
				<LoaderText>Loading...</LoaderText>
				<ActivityIndicator color={colors.white} size="large" />
			</BrowserLoader>
		);
	};

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.navigation.navigate('Main');
		} else {
			if (Platform.OS === 'android') {
				Linking.addEventListener('url', this.handleOpenURL);
				Linking.getInitialURL().then(url => {
					if (url) {
						this.handleOpenURL({ url });
					}
				});
			}
		}
	}

	render() {
		return (
			<SignInContainer>
				<BrowserSection>
					<WebView
						source={{
							uri: `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=gitgistrn://welcome&scope=user%20gist&state=${stateRandom}`,
						}}
						onLoadStart={e => this.toggleCancelButton(e, true)}
						onLoadEnd={e => this.toggleCancelButton(e, false)}
						onNavigationStateChange={e => this.onNavigationStateChange(e)}
						renderLoading={() => this.renderLoading()}
						startInLoadingState
						javaScriptEnabled
					/>
				</BrowserSection>
				<ContentSection>
					<StyledButton
						title="Cancel"
						disabled={this.state.cancelDisabled}
						onPress={() => { }}
					/>
				</ContentSection>
			</SignInContainer>
		)
	}

	componentWillUnmount() {
		if (Platform.OS === 'android') {
			Linking.removeEventListener('url', this.handleOpenURL);
		}
	}
};
