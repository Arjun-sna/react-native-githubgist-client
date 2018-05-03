import React from 'react';
import { connect } from 'react-redux';
import { userGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const MyGists = ({ userGists, requestInProgress, fetchUserGists }) => (
	<GistContent
		gistList={userGists}
		fetchGists={fetchUserGists}
		showLoader={requestInProgress}
	/>
)

const mapStateToProps = ({ userGistsData }) => ({
	userGists: userGistsData.gists,
	requestInProgress: userGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchUserGists: () => dispatch(userGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGists);
