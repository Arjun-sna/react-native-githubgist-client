import React from 'react';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { userGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const MyGistsProps = [
  'gistList',
  'showLoader',
  'fetchGists',
  'hasMoreData',
  'navigation',
];

const MyGists = props => (
  <GistContent
    {...pick(props, MyGistsProps)}
  />
);

const mapStateToProps = ({ userGistsData }, props) => ({
  gistList: userGistsData.gists,
  showLoader: userGistsData.inProgress,
  hasMoreData: userGistsData.hasMoreData,
  navigation: props.navigation,
});

const mapDispatchToProps = dispatch => ({
  fetchGists: () => dispatch(userGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGists);
