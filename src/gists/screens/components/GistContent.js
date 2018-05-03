import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';
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

	renderListItem = ({ item }) => (
		<GistItem
			gistData={item}
			onClickGist={id => {
				console.log('clicked ', id);
			}}
		/>
	)

	render() {
		const { gistList, showLoader } = this.props;

		return (
			<Container>
				{
					showLoader ? (
						<ActivityIndicator size="small" />
					) : (
						<FlatList
							data={gistList}
							keyExtractor={item => item.id}
							renderItem={this.renderListItem}
							ItemSeparatorComponent={() => <ListItemSeparator />}
							onEndReached={this.props.fetchGists}
							ListEmptyComponent={() => <EmptyList message={this.props.emptyListMessage} />}
						/>
					)
				}
			</Container>
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
}

export default GistListContent;
