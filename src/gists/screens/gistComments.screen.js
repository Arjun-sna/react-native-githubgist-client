import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';
import { fetchGistComments } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';

const Comment = styled.Text`
  font-size: 15;
`;

const CommentView = styled.View`
  flex: 1;
  padding: 2%;
`;

class GistCommentsScreen extends React.Component {
	componentDidMount() {
		this.props.fetchComments(this.props.navigation.getParam('gistData').id);
	}

  renderItem = ({ item }) => (
  	<CommentView>
  	  <Comment>{item.body}</Comment>
  	</CommentView>
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
