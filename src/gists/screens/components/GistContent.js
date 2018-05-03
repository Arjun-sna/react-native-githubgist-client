import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	View,
	Text,
	StyleSheet,
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

class GistListContent extends React.Component {
	componentDidMount() {
		if (this.props.gistList.length < 1) {
			this.props.fetchGists();
		}
	}

	handleListEndReached = () => {
		this.props.fetchGists();
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
					<Text style={styles.noMoreGistText}>
						No More Gists exists.
					</Text>
				</View>
			);
		default:
			return (
				<GistItem
					gistData={item}
					onClickGist={id => {
						console.log('clicked ', id);
					}}
				/>
			);
		}
	}

	render() {
		const { gistList, showLoader, hasMoreData } = this.props;
		const toAppendData = hasMoreData ? {
			type: 'preloader',
			id: 'preloader'
		} : {
			type: 'noData',
			id: 'noData',
		};

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
};

GistListContent.defaultProps = {
	emptyListMessage: 'This user has not created any Gist yet',
	showLoader: false,
	gistList: [],
};

export default GistListContent;
