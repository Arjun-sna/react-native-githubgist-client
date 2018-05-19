import React from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { starredGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const StarredGistsProps = [
	'gistList',
	'showLoader',
  'fetchGists',
  'hasMoreData',
	'navigation',
];

const StarredGists = props => (
	<GistContent
		{...pick(props, StarredGistsProps)}
	/>
);

const mapStateToProps = ({ starredGistsData }, props) => ({
	gistList: starredGistsData.gists,
  showLoader: starredGistsData.inProgress,
  hasMoreData: starredGistsData.hasMoreData,
	navigation: props.navigation,
});

const mapDispatchToProps = (dispatch) => ({
	fetchGists: () => dispatch(starredGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarredGists);
