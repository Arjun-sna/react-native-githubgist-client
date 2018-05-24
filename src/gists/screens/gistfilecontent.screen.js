import React from 'react';
import styled from 'styled-components';
import { Text, ScrollView } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles/hljs';
import Toolbar from './components/Toolbar';
import { normalizeFont } from '../../config';
import { fetchFileContent } from './../../api';

const Container = styled.View`
	padding-top: 20px;
`;

const syntaxHighlighterStyle = {
  ...GithubStyle,
  hljs: {
    background: 'white',
  },
};

class GistFileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: ''
		}
		this.fileContent = '';
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
		})

		const { navigation, accessToken } = this.props;
		const fileData = navigation.getParam('fileData', {});
		
		fetchFileContent(accessToken, fileData.raw_url)
			.then(response => {
				this.fileContent = response;
				this.setState({
					isLoading: true,
				});
			})
			.catch(err => {
				console.log('err ' + JSON.stringify(err));
				this.setState({
					error: err,
				})
			})
	}

	render() {
		const { navigation } = this.props;
		const fileType = navigation.state.params.fileData.filename.split('.').pop();

		return(
			<Container>
				<Toolbar onBackPress={() => navigation.goBack()} />
				<ScrollView>
					<SyntaxHighlighter
						language={fileType}
						CodeTag={Text}
						codeTagProps={{ style: {paddingRight: 15, paddingBottom: 0}}}
						style={syntaxHighlighterStyle}
						fontSize={normalizeFont(12)}
					>
						{this.fileContent}
					</SyntaxHighlighter>
				</ScrollView>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.auth.access_token
})

export default connect(mapStateToProps, null)(GistFileScreen);