import React from 'react';
import { connect } from 'react-redux';
import {
	FlatList,
	TextInput,
	View,
	Keyboard,
	Text,
	ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import CardView from 'react-native-cardview';
import TimeAgo from 'time-ago';
import { fetchGistComments } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';
import { addComments } from '../../api';
import { colors } from '../../config';

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
	background-color: #33B5E5;
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
		};
		this.timeout = null;
	}
	componentDidMount() {
		this.fetchComments();
	}

	onPressItem = () => {
		Keyboard.dismiss();
		const { id } = this.props.navigation.getParam('gistData');

		addComments(this.state.comment, id, this.props.accessToken)
			.then(() => {
				this.setState({ comment: '' });
				this.fetchComments();
			})
			.catch(console.log);
	}

	fetchComments = () => {
		this.props.fetchComments(this.props.navigation.getParam('gistData').id);
	}

  renderItem = ({ item }) => {
  	return (
  		<View style={{ flex: 1 }}>
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
  		</View>
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
  		</React.Fragment>
  	);
  }
}
const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchGistComments.action(id)),
});
const mapStateToProps = ({ gistComments, auth }) => ({
	comments: gistComments.comments,
	accessToken: auth.access_token,
	inProgress: gistComments.inProgress,
});

export default connect(mapStateToProps, mapDispatchToProps)(GistCommentsScreen);
