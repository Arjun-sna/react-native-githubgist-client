import React from 'react';
import { connect } from 'react-redux';
import { publicGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';


const PublicGist = ({ publicGists, requestInProgress, fetchPublicGists }) => (
	<GistContent
		gistList={publicGists}
		fetchGists={fetchPublicGists}
		showLoader={requestInProgress}
		empltyListMessage="No public gists to display"
	/>
)

const mapStateToProps = ({ publicGistsData }) => ({
	publicGists: publicGistsData.gists,
	requestInProgress: publicGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPublicGists: () => dispatch(publicGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicGist);
