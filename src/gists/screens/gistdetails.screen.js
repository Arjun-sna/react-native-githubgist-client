import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import Header from './components/GistDetailHeader';
import Toolbar from './components/Toolbar';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import { processFiles } from '~/src/shared/processFiles';
import GistFileItem from './components/GistFileItem';
import forOwn from 'lodash/forOwn';
import { requestStarGist, checkStarredGist } from '../../api';
import { starGist, fetchInitialFavoriteValue } from '../gists.actiontype';

const HeaderProps = [
	'avatal_url',
	'login',
	'created_at',
];

const ToolbarContentContainer = styled.View`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

class GistDetails extends React.Component {
	state = {
		iconName: 'star-o',
	}

	componentWillMount() {
		const data = this.props.checkIfGistIsStarred(this.props.navigation.getParam('gistData').id);

		console.log('data------------------------------', data);
	}

	componentWillReceiveProps(nextProps) {
		console.log('(((((((((((((((((((((((((((((((', nextProps);
		if (nextProps.isStarred) {
			this.setState({
				iconName: 'star',
			});
		} else {
			this.setState({ iconName: 'star-o' });
		}
	}

	handleFileItemPress = fileData => {
		this.props.navigation.navigate('GistFileContentView', {
			fileData,
		});
	}

	handleActionButtonClick = () => {
		// requestStarGist(this.props.accessToken, this.props.navigation.getParam('gistData').id)
		// 	.then(() => this.setState({ iconName: 'star' }))
		// 	.catch(error => console.log(error));
		this.setState({ iconName: 'star' });
		this.props.starThisGist(this.props.navigation.getParam('gistData').id);
	}

	processFiles = fileData => {
		const filesList = [];
		let totalFileSize = 0;

		forOwn(fileData, value => 	{
			filesList.push(value);
			totalFileSize += value.size;
		});

		return { filesList, totalFileSize };
	};

	renderItem = ({ item }) => (
		<GistFileItem
			fileData={item}
			onFileItemPress={this.handleFileItemPress} />
	);

	renderToobarContent = () => {
		console.log('777777777777777777777777777777777', this.state.iconName);

		return (
			<ToolbarContentContainer>
				<TouchableOpacity	onPress={this.handleActionButtonClick}>
					<Icon
						name={this.state.iconName}
						size={20}
					/>
				</TouchableOpacity>
				<Icon
					name="globe"
					size={20}
				/>
				<Icon
					name="share"
					size={20}
				/>
				<MaterialIcon
					name="delete"
					size={20}
				/>
			</ToolbarContentContainer>
		);
	}


	render() {
		const { navigation } = this.props;
		const gistData = navigation.getParam('gistData', {});
		const { owner = {} } = gistData;
		const { totalFileSize } = this.processFiles(gistData.files);

		return (
			<View>
				<Header
					userImage={!isEmpty(owner) && owner.avatar_url}
					userName={isEmpty(owner) ? 'Anonymous' : owner.login}
					description={gistData.description}
					createdAt={gistData.created_At}
					gistSize={totalFileSize} />
				<Toolbar
					toolbarContent={this.renderToobarContent}
					onBackPress={() => this.props.navigation.goBack()} />
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	starThisGist: id => dispatch(starGist.action(id)),
	checkIfGistIsStarred: id => dispatch(fetchInitialFavoriteValue.action(id)),
});

const mapStateToProps = ({ initialFavoriteValue }) =>
	({ isStarred: initialFavoriteValue.isStarred });

export default connect(mapStateToProps, mapDispatchToProps)(GistDetails);
