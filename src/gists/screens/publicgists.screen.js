import React from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { publicGistsFetch } from '../gists.actiontype';
import GistContent from './components/GistContent';

const PublicGistsProps = [
	'gistList',
	'showLoader',
	'fetchGists',
	'hasMoreData',
	'navigation',
];

const PublicGists = props => (
	<GistContent
		{...pick(props, PublicGistsProps)}
	/>
);

const mapStateToProps = ({ publicGistsData }, props) => ({
	gistList: publicGistsData.gists,
	showLoader: publicGistsData.inProgress,
	hasMoreData: publicGistsData.hasMoreData,
	navigation: props.navigation,
});

const mapDispatchToProps = dispatch => ({
	fetchGists: () => dispatch(publicGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicGists);
