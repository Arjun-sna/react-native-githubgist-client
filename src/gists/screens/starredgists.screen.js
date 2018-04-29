import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { starredGistsFetch } from '../gists.actiontype';
import navigatorService from '../../utils/navigatorService';
import GistItem from './components/SingleGistOverview';
import EmptyList from './components/EmptyListComponent';
import ListItemSeparator from './components/ListItemSeparator';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

class StarredGist extends React.Component {
	componentDidMount() {
		if (this.props.starredGists.length < 1) {
			this.props.fetchStarredGists();
		}
	}

	renderListItem = ({item}) => (
		<GistItem 
			gistData={item}
			onClickGist={(id) => console.log('Clicked ' +  id)}
		/>
	)

	render() {
		const { starredGists, requestInProgress } = this.props; 
		return (
			<Container>
				{
					requestInProgress ?
						<ActivityIndicator size="small"/> :
						starredGists.length > 0 ? 
							<FlatList
								data={starredGists}
								keyExtractor={item => item.id}
								renderItem={this.renderListItem}
								ItemSeparatorComponent={() => <ListItemSeparator />}
							/> :
							<EmptyList message="No public gists to display" />
				}
			</Container>
		)
	}
}

const mapStateToProps = ({ starredGistsData }) => ({
	starredGists: starredGistsData.gists,
	requestInProgress: starredGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStarredGists: () => dispatch(starredGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarredGist);
