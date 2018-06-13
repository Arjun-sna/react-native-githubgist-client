import React from 'react';
import styled from 'styled-components';
import { Text, ScrollView, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles/hljs';
import Toolbar from './components/Toolbar';
import { normalizeFont, colors } from '../../config';
import { fetchFileContent } from './../../api';
import LoadingView from './components/LoadingView';

const Container = styled.View`
	flex: 1;
	background: #FFFFFF;
	padding-top: 20px;
`;

const syntaxHighlighterStyle = {
	...GithubStyle,
	hljs: {
		background: 'white',
	},
};

const CodeContainer = styled.View`
	flex: 1;
	padding-vertical: 10;
	padding-horizontal: 10;
	margin-bottom: 10;
`;

const ErrorContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const ErrorText = styled.Text`
	text-align: center;
	color: ${colors.greyDark};
	font-size: ${normalizeFont(14)};
`;

class GistFileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: '',
		};
		this.fileContent = '';
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
			error: '',
		});

		const { navigation, accessToken } = this.props;
		const fileData = navigation.getParam('fileData', {});

		fetchFileContent(accessToken, fileData.raw_url)
			.then(response => {
				this.fileContent = response;
				this.setState({
					isLoading: false,
				});
			})
			.catch(err => {
				console.log(`err ${JSON.stringify(err)}`);
				this.setState({
					error: err,
				});
			});
	}

	render() {
		const { navigation } = this.props;
		const fileName = navigation.state.params.fileData.filename;
		const fileType = fileName.split('.').pop();
		const { isLoading, error } = this.state;

		return (
			<Container>
				<Toolbar
					toolbarContent={fileName}
					onBackPress={() => navigation.goBack()}
				/>
				{ isLoading && <LoadingView animating center />}
				{ !isLoading && !isEmpty(error) &&
					<ErrorContainer>
						<ErrorText>{error}</ErrorText>
					</ErrorContainer>
				}
				{ !isLoading && !error &&
					<ScrollView>
						<CodeContainer>
							<SyntaxHighlighter
								language={fileType}
								CodeTag={Text}
								codeTagProps={{ style: { paddingRight: 15, paddingBottom: 0 } }}
								style={syntaxHighlighterStyle}
								fontSize={normalizeFont(12)}
							>
								{this.fileContent}
							</SyntaxHighlighter>
						</CodeContainer>
					</ScrollView>
				}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	accessToken: state.auth.access_token,
});

export default connect(mapStateToProps, null)(GistFileScreen);
