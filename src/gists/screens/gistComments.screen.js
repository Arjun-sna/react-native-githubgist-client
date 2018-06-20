import React from 'react';
import { connect } from 'react-redux';
import {
	FlatList,
	TextInput,
	Keyboard,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	Modal,
} from 'react-native';
import styled from 'styled-components';
import CardView from 'react-native-cardview';
import TimeAgo from 'time-ago';
import { fetchGistComments, deleteComment, addComment } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';
import { colors } from '../../config';
import GistOptions from './components/gistoptions.screen';

const CardContainer = styled(CardView)`
	padding: 3%;
	margin: 3px 5px;
`;

const Comment = styled.Text`
	font-size: 15;
	color: black;
	padding: 2%;
`;

const UserProfilePicture = styled.Image`
	height: 50;
	width: 50;
	borderRadius: 25;
`;

const UserProfile = styled.View`
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

const DetailsContainer = styled.View`
	padding: 2%;
`;

const Username = styled.Text`
	font-size: 16;
	padding: 2%;
`;

const CommentDate = styled.Text`
	font-size: 14;
`;

const InputContainer = styled.View`
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: flex-end;
	background-color: ${colors.white};
	position: absolute;
	bottom: 0;
`;

const Button = styled.TouchableOpacity`
	padding: 3%;
	align-self: center;
	background-color: ${colors.pictonBlue};
`;

const ActivityIndicatorContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

class GistCommentsScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: '',
			isVisible: false,
			commentId: null,
		};
	}
	componentDidMount() {
		this.fetchComments();
	}

	onPressItem = () => {
		Keyboard.dismiss();
		this.setState({ comment: '' });
		const { id } = this.props.navigation.getParam('gistData');

		this.props.addThisComment({ gistId: id, comment: this.state.comment });
	}

	onCancel = () => {
		this.setState({ isVisible: false });
	}

	openGistOptions = (commentId, userId) => {
		if (userId !== this.props.currentUserId) return;
		this.setState({
			isVisible: true,
			commentId,
		});
	}

	fetchComments = () => {
		this.props.fetchComments(this.props.navigation.getParam('gistData').id);
	}

	deleteComment = () => {
		this.onCancel();
		this.props.deleteThisComment({
			gistId: this.props.navigation.getParam('gistData').id,
			commentId: this.state.commentId,
		});
	}

  renderItem = ({ item }) => {
  	return (
  		<TouchableOpacity
  			style={{ flex: 1 }}
  			onLongPress={() => this.openGistOptions(item.id, item.user.id)}>
  			<CardContainer
  				cardElevation={2}
  				cardMaxElevation={2}
  				cornerRadius={5}
  			>
  				<UserProfile>
  					<UserProfilePicture source={{ uri: item.user.avatar_url }} />
  					<DetailsContainer>
  						<Username>{item.user.login}</Username>
  						<CommentDate>{TimeAgo.ago(item.created_at)}</CommentDate>
  					</DetailsContainer>
  				</UserProfile>
  				<Comment>{item.body}</Comment>
  			</CardContainer>
  		</TouchableOpacity>
  	);
  }

  render() {
  	const { comments, inProgress } = this.props;

  	if (inProgress) {
  		return (
  			<ActivityIndicatorContainer>
  				<ActivityIndicator size="large" color="#33B5E5" />
  			</ActivityIndicatorContainer>
  		);
  	}

  	return (
  		<React.Fragment>
  			<FlatList
  				style={{ marginBottom: '11%', flexGrow: 1 }}
  				keyExtractor={item => item.id}
  				data={this.props.comments}
  				renderItem={this.renderItem}
  				ListEmptyComponent={() => <ListEmptyComponent message="No comments found" />}
  				extraData={this.props}
  			/>
  			<InputContainer>
  				<TextInput
  					style={{
  						width: '82%',
  					}}
  					placeholder="Add comment here"
  					value={this.state.comment}
  					onChangeText={comment => this.setState({ comment })}
  					underlineColorAndroid={colors.white}
  				/>
  				<Button
  					onPress={this.onPressItem}>
  					<Text style={{ color: colors.white, fontWeight: '600' }}>Submit</Text>
  				</Button>
  			</InputContainer>
  			<Modal
  				onRequestClose={() => {}}
  				visible={this.state.isVisible}
				 	transparent>
  				<GistOptions onDelete={this.deleteComment} onCancel={this.onCancel} />
  			</Modal>
  		</React.Fragment>
  	);
  }
}
const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchGistComments.action(id)),
	deleteThisComment: data => dispatch(deleteComment.action(data)),
	addThisComment: data => dispatch(addComment.action(data)),
});
const mapStateToProps = ({ gistComments, loggedInUser }) => ({
	comments: gistComments.comments,
	currentUserId: loggedInUser.userId,
	inProgress: gistComments.inProgress,
});

export default connect(mapStateToProps, mapDispatchToProps)(GistCommentsScreen);
