import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchFileContent } from './../../api';

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
		return(
			<View>
				<Text>{this.fileContent}</Text>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.auth.access_token
})

export default connect(mapStateToProps, null)(GistFileScreen);