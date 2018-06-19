import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import Header from './components/GistDetailHeader';
import Toolbar from './components/Toolbar';
import { processFiles } from '../../shared/processFiles';
import GistFileItem from './components/GistFileItem';
import { starGist, fetchInitialFavoriteValue, UnstarGist } from '../gists.actiontype';

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
		iconName: this.props.isStarred ? 'star' : 'star-o',
	}

	componentWillMount() {
		this.props.checkIfGistIsStarred(this.props.navigation.getParam('gistData').id);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			iconName: nextProps.isStarred ? 'star' : 'star-o',
		});
	}

	handleFileItemPress = fileData => {
		this.props.navigation.navigate('GistFileContentView', {
			fileData,
		});
	}

	handleActionButtonClick = () => {
		const { id } = this.props.navigation.getParam('gistData');

		if (this.state.iconName === 'star') {
			this.props.UnstarThisGist(id);
			this.setState({
				iconName: 'star-o',
			});
		} else {
			this.props.starThisGist(id);
			this.setState({
				iconName: 'star',
			});
		}
	}

	renderItem = ({ item }) => (
		<GistFileItem
			fileData={item}
			onFileItemPress={this.handleFileItemPress} />
	);

	renderToobarContent = () => {
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
		const { totalFileSize } = processFiles(gistData.files);

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
	UnstarThisGist: id => dispatch(UnstarGist.action(id)),
});

const mapStateToProps = ({ initialFavoriteValue }) =>
	({ isStarred: initialFavoriteValue.isStarred });

export default connect(mapStateToProps, mapDispatchToProps)(GistDetails);
