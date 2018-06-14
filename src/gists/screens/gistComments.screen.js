import React from 'react';
import { connect } from 'react-redux';
import { FlatList, TextInput, Button, View, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import CardView from 'react-native-cardview';
import TimeAgo from 'time-ago';
import { fetchGistComments } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';
import { addComments } from '~/src/api';

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

// const CommentBox = styled.TextInput`
// `;

class GistCommentsScreen extends React.Component {
	state = {
		comment: '',
	}
	componentDidMount() {
		console.log('id---------------------------', this.props.navigation.getParam('gistData').id);
		this.props.fetchComments(this.props.navigation.getParam('gistData').id);
	}

	componentWillReceiveProps(nextProps) {
		console.log('lllll', nextProps);
	}

	// onEndReachedThreshold = () => {
	// 	this.setState({
	// 		i: this.state.i + 6,
	// 	}, () => {
	// 		this.props.fetchComments(this.props.navigation.getParam('gistData').id, this.state.i);
	// 	});
	// }


	onPressItem = () => {
		addComments(this.state.comment, this.props.navigation.getParam('gistData').id, this.props.accessToken)
			.then(() => {
				this.setState({ comment: '' });
				this.props.fetchComments(this.props.navigation.getParam('gistData').id);
			});
	}

  renderItem = ({ item }) => {
  	return (
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
  	);
  }

  render() {
  	const { comments } = this.props;

  	return (
  		<React.Fragment>
  			<FlatList
  				style={{ marginBottom: '4%' }}
  				keyExtractor={item => item.id}
  				data={this.props.comments}
  				renderItem={this.renderItem}
  				ListEmptyComponent={() => <ListEmptyComponent message="No comments found" />}
  				extraData={this.props}
  				// onEndReachedThreshold={0.2}
  				// onEndReachedThreshold={this.onEndReachedThreshold}
  			/>
  			<View style={{
  				flex: 1,
  				flexDirection: 'row',
  				alignItems: 'flex-end',
  				marginHorizontal: 2,
  				backgroundColor: 'white',
  				position: 'absolute',
  				bottom: 0,
  			}}>
  			<TextInput
  				style={{
  					width: '88%',
  				}}
  					placeholder="Add comment here"
  					value={this.state.comment}
  					onChangeText={comment => this.setState({ comment })}
  			/>
  			<Button title="Add" onPress={this.onPressItem} />
  			</View>
  		</React.Fragment>
  	);
  }
}
// style={{ position: 'absolute', bottom: 0, right: 0 }} />
const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchGistComments.action(id)),
});
const mapStateToProps = ({ gistComments, auth }) => ({
	comments: gistComments.comments,
	accessToken: auth.access_token,
});

export default connect(mapStateToProps, mapDispatchToProps)(GistCommentsScreen);
