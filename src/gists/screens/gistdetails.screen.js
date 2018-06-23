import React from 'react';
import PropTypes from 'prop-types';
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
import { toggleFavoriteGist, fetchInitialFavoriteValue } from '../gists.actiontype';

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

	handleActionButtonClick = () => {
		const { id } = this.props.navigation.getParam('gistData');
		const action = (this.state.iconName === 'star') ?
			{ type: 'unstar', iconName: 'star-o' } : { type: 'star', iconName: 'star' };

		this.props.toggleGist({ id, type: action.type });
		this.setState({
			iconName: action.iconName,
		});
	}

	renderToobarContent = () => {
		return (
			<ToolbarContentContainer>
				{!this.props.inProgress &&
					(
						<TouchableOpacity	onPress={this.handleActionButtonClick}>
							<Icon
								name={this.state.iconName}
								size={20}
							/>
						</TouchableOpacity>
					)
				}
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
			<View style={{backgroundColor: '#5481b8'}}>
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
	toggleGist: data => dispatch(toggleFavoriteGist.action(data)),
	checkIfGistIsStarred: id => dispatch(fetchInitialFavoriteValue.action(id)),
});

const mapStateToProps = ({ initialFavoriteValue }) =>
	({
		isStarred: initialFavoriteValue.isStarred,
		inProgress: initialFavoriteValue.inProgress,
	});

GistDetails.propTypes = {
	toggleGist: PropTypes.func.isRequired,
	checkIfGistIsStarred: PropTypes.func.isRequired,
	isStarred: PropTypes.bool.isRequired,
	inProgress: PropTypes.bool.isRequired,
	navigation: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GistDetails);
