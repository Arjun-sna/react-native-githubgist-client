import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { userGistsFetch } from '../gists.actiontype';
import navigatorService from '../../utils/navigatorService';

const MyGists = (props) => {
	navigatorService.printRoutes();
	props.fetchUserGists();
	return (
		<Text> This is the My gists Screen </Text>
	)
};


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	fetchUserGists: () => dispatch(userGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGists);
