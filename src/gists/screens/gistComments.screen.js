import React from 'react';
import PropTypes from 'prop-types';
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
import CardContainer from './components/CardContainer';
import TimeAgo from 'time-ago';
import concat from 'lodash/concat';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import { fetchGistComments, deleteComment, addComment } from '../gists.actiontype';
import ListEmptyComponent from './components/EmptyListComponent';
import { colors } from '../../config';
import GistOptions from './components/gistoptions.screen';

const Container = styled(CardContainer)`
  padding: 8px;
`
const Comment = styled.Text`
  font-size: 15;
  color: black;
  padding: 0 0 2% 0;
`;
const UserProfilePicture = styled.Image`
  height: 30;
  width: 30;
  borderRadius: 15;
`;
const UserProfile = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const DetailsContainer = styled.View`
  padding-left: 2%;
`;
const Username = styled.Text`
  font-size: 14;
  padding-bottom: 1%;
  fontWeight: bold;
`;
const CommentDate = styled.Text`
  fontSize: 12;
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
  background-color: ${colors.themeBlue};
`;
const EndOfViewStyle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 20;
  margin-top: 20;
`;

const getGistComments = item => ({ type: item, id: item });

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
    this.fetchComments(true);
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

  fetchComments = (clearCache = false) => {
    this.props.fetchComments({ id: this.props.navigation.getParam('gistData').id, clearCache });
  }

  deleteComment = () => {
    this.onCancel();
    this.props.deleteThisComment({
      gistId: this.props.navigation.getParam('gistData').id,
      commentId: this.state.commentId,
    });
  }

  handleOnEndReached = () => {
    this.fetchComments();
  }

  renderItem = ({ item }) => {
    switch (item.type) {
    case 'preloader':
      return (
        <EndOfViewStyle>
          <ActivityIndicator
            size="large"
            color="#33B5E5"
          />
        </EndOfViewStyle>
      );
    case 'noData':
      return (
        <EndOfViewStyle>
          <ListEmptyComponent
            message="No more comments found for this gist"
          />
        </EndOfViewStyle>
      );
    default: {
      const { currentUserId } = this.props;
      const commentUserId = item.user.id;

      return (
        <Container
          activeOpacity={commentUserId === currentUserId ? 0.8 : 1}
          onPress={
            commentUserId === currentUserId ?
              () => this.openGistOptions(item.id, item.user.id) : undefined
          }>
          <UserProfile>
            <UserProfilePicture source={{ uri: item.user.avatar_url }} />
            <DetailsContainer>
              <Username>{item.user.login}</Username>
              <CommentDate>{TimeAgo.ago(item.created_at)}</CommentDate>
            </DetailsContainer>
          </UserProfile>
          <Comment>{item.body}</Comment>
        </Container>
        ); 
      }
    }
  }

  renderList = comments => {
    return (
      <React.Fragment>
        <FlatList
          style={{ marginBottom: '11%', flexGrow: 1 }}
          keyExtractor={item => item.id}
          data={comments}
          renderItem={this.renderItem}
          ListEmptyComponent={() => <ListEmptyComponent message="No comments found" />}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={this.handleOnEndReached}
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
            underlineColorAndroid="rgba(0,0,0,0)"
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

  render() {
    if (isEmpty(this.props.gistData)) {
      return (
        <EndOfViewStyle>
          <ActivityIndicator size="large" color={colors.pictonBlue} />
        </EndOfViewStyle>
      );
    } else if (this.props.gistData && this.props.gistData.comments) {
      const { comments = [], hasMoreComments } = this.props.gistData;
      const toAppendData = hasMoreComments ? getGistComments('preloader') : getGistComments('noData');
      const uniqComments = uniqBy(concat(comments, toAppendData), ({ id }) => (id));

      return this.renderList(uniqComments);
    }

    return null;
  }
}
const mapDispatchToProps = dispatch => ({
  fetchComments: data => dispatch(fetchGistComments.action(data)),
  deleteThisComment: data => dispatch(deleteComment.action(data)),
  addThisComment: data => dispatch(addComment.action(data)),
});
const mapStateToProps = ({ gistComments, loggedInUser }, ownProps) => ({
  gistData: gistComments[ownProps.navigation.getParam('gistData').id],
  currentUserId: loggedInUser.userId,
  inProgress: gistComments.inProgress,
});

GistCommentsScreen.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  addThisComment: PropTypes.func.isRequired,
  deleteThisComment: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
  hasMoreComments: PropTypes.bool,
  navigation: PropTypes.instanceOf(Object).isRequired,
  gistData: PropTypes.instanceOf(Object),
};

GistCommentsScreen.defaultProps = {
  hasMoreComments: true,
  gistData: {},
};
export default connect(mapStateToProps, mapDispatchToProps)(GistCommentsScreen);
