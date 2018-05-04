import React from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { starredGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const MyGistsProps = [
	'gistList',
	'showLoader',
  'fetchGists',
  'hasMoreData',
];

const StarredGists = props => (
	<GistContent
		{...pick(props, MyGistsProps)}
	/>
);

const mapStateToProps = ({ starredGistsData }) => ({
	gistList: starredGistsData.gists,
  showLoader: starredGistsData.inProgress,
  hasMoreData: starredGistsData.hasMoreData,
});

const mapDispatchToProps = (dispatch) => ({
	fetchGists: () => dispatch(starredGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarredGists);
