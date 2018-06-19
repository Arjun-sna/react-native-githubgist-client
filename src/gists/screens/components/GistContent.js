import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	View,
	Text,
	StyleSheet,
	RefreshControl,
} from 'react-native';

import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import uniqBy from 'lodash/uniqBy';
import styled from 'styled-components';
import GistItem from './SingleGistOverview';
import EmptyList from './EmptyListComponent';
import ListItemSeparator from './ListItemSeparator';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	marginTop: 25;
`;

const getGistItem = item => ({ type: item, id: item });

class GistListContent extends React.Component {
	state={
		refreshing: false,
	}
	componentDidMount() {
		if (this.props.gistList.length < 1) {
			this.props.fetchGists();
		}
	}

	handleListEndReached = () => {
		this.props.fetchGists();
	}

	handleGistItemClick = gistData => {
		this.props.navigation.navigate('GistDetails', {
			gistData,
		});
	}

	renderListItem = ({ item }) => {
		switch (item.type) {
		case 'preloader':
			return (
				<View style={styles.endOfViewStyle}>
					<ActivityIndicator
						size="large"
					/>
				</View>
			);
		case 'noData':
			return (
				<View style={styles.endOfViewStyle}>
					<EmptyList
						message="No more gists found for this category"
					/>
				</View>
			);
		default:
			return (
				<GistItem
					gistData={item}
					onClickGist={this.handleGistItemClick}
				/>
			);
		}
	}

	onRefresh = () => {
		this.setState({ refreshing: true });
		this.props.fetchGists({ shouldRefresh: true });
		// this.setState({ refreshing: false });
	}

	// renderRefreshControl = () => {
	// 	this.setState({ refreshing: true });
	// 	<RefreshControl
	// 		refreshing={this.state.refreshing}
	// 		onRefresh={this.onRefresh} />;
	// }

	render() {
		const { gistList, showLoader, hasMoreData } = this.props;

		const toAppendData = hasMoreData ? getGistItem('preloader') : getGistItem('noData');

		const uniqGists = uniqBy(concat(gistList, toAppendData), ({ id }) => (id));

		return (
			<View>
				<FlatList
					data={uniqGists}
					keyExtractor={item => item.id}
					renderItem={this.renderListItem}
					ItemSeparatorComponent={() => <ListItemSeparator />}
					onEndReachedThreshold={0.01}
					onEndReached={this.handleListEndReached}
					ListEmptyComponent={() => <EmptyList message={this.props.emptyListMessage} />}
					removeClippedSubviews
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

GistListContent.propTypes = {
	emptyListMessage: PropTypes.string,
	showLoader: PropTypes.bool,
	fetchGists: PropTypes.func.isRequired,
	gistList: PropTypes.array, // eslint-disable-line
	hasMoreData: PropTypes.bool.isRequired,
};

GistListContent.defaultProps = {
	emptyListMessage: 'This user has not created any Gist yet',
	showLoader: false,
	gistList: [],
};

const styles = StyleSheet.create({
	endOfViewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		padding: 20,
	},
	noMoreGistText: {
		fontSize: 25,
	},
});

export default GistListContent;
