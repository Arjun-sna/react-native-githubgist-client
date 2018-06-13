import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import CardView from 'react-native-cardview';
import TimeAgo from 'time-ago';
import { fetchGistComments } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';

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

class GistCommentsScreen extends React.Component {
	componentDidMount() {
		this.props.fetchComments(this.props.navigation.getParam('gistData').id);
	}

  renderItem = ({ item }) => (
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
  )

  render() {
  	return (
  		<FlatList
  			keyExtractor={item => item.id}
  			data={this.props.comments}
  			renderItem={this.renderItem}
  			ListEmptyComponent={() => <ListEmptyComponent message="No comments found" />}
  		/>
  	);
  }
}

const mapDispatchToProps = dispatch => ({
	fetchComments: id => dispatch(fetchGistComments.action(id)),
});
const mapStateToProps = ({ gistComments }) => ({
	comments: gistComments.comments,
});

export default connect(mapStateToProps, mapDispatchToProps)(GistCommentsScreen);
