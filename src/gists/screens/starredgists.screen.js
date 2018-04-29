import React from 'react';
import { connect } from 'react-redux';
import { starredGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const StarredGist = ({ starredGists, requestInProgress, fetchStarredGists }) => (
	<GistContent
		gistList={starredGists}
		fetchGists={fetchStarredGists}
		showLoader={requestInProgress}
		empltyListMessage="No public gists to display"
	/>
)

const mapStateToProps = ({ starredGistsData }) => ({
	starredGists: starredGistsData.gists,
	requestInProgress: starredGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStarredGists: () => dispatch(starredGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarredGist);
