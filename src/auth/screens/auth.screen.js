import React from 'react';
import { logIn, fetchAuthUser } from '../auth.actiontype';
import {
  View,
  StyleSheet,
  Linking,
  WebView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-native-elements';
import Config from 'react-native-config';
import queryString from 'query-string';
import { colors } from '../../config';
import navigatorService from '../../utils/navigatorService';

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

const ViewContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: ${colors.white};
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
  },
})``;

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  toggleCancelButton = (e, disabled) => {
    const { url } = e.nativeEvent;

    if (url === 'https://github.com/session') {
      this.setState({ cancelDisabled: disabled });
    }
  }

  handleOpenURL = ({ url }) => {
    if (url.startsWith(Config.REDIRECT_URI)) {
      const [, queryStringFromUrl] = url.match(/\?(.*)/);
      const { state, code } = queryString.parse(queryStringFromUrl);
      const { login, getUser, navigation } = this.props;

      if (stateRandom === state) {
        this.setState({
          code,
          showLoader: true,
          loaderText: 'Please wait...',
        });
        stateRandom = Math.random().toString();
        login(code, state);
      }
    }
  }

  onNavigationStateChange = navState => {
    const { url } = navState;

    this.handleOpenURL({ url });
  };

  renderLoading = () => {
    return (
      <BrowserLoader>
        <LoaderText>Loading...</LoaderText>
        <ActivityIndicator color={colors.white} size="large" />
      </BrowserLoader>
    );
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      // console.log('Resetting  ain');
      // navigatorService.printRoutes();
      navigatorService.reset('Home');
    } else if (Platform.OS === 'android') {
      Linking.addEventListener('url', this.handleOpenURL);
      Linking.getInitialURL().then(url => {
        if (url) {
          console.log('Linking');
          this.handleOpenURL({ url });
        }
      });
    }
  }

  shouldShowLogin = () => {
    const { isRequestInProgress, isAuthenticated } = this.props;

    return !isRequestInProgress && !isAuthenticated;
  }

  render() {
    console.log(`rendering aut ${this.shouldShowLogin()}`);

    return (
      <ViewContainer>
        {this.shouldShowLogin() && (
          <SignInContainer>
            <BrowserSection>
              <WebView
                source={{
                  uri: `https://github.com/login/oauth/authorize?response_type=token&client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=user%20gist&state=${stateRandom}`,
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
                onPress={() => { console.log('press'); this.props.login('da', 'adf'); }}
              />
            </ContentSection>
          </SignInContainer>)}
        {
          this.props.isRequestInProgress && (
            this.renderLoading()
          )
        }
      </ViewContainer>
    );
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      Linking.removeEventListener('url', this.handleOpenURL);
    }
  }
}

const mapStateToProps = state => ({
  isRequestInProgress: state.auth.inprogress || state.loggedInUser.inprogress,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapStateToDispatch = dispatch => ({
  login: (code, state) => dispatch(logIn.action({ code, state })),
});

export default connect(mapStateToProps, mapStateToDispatch)(Auth);
