import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { userGistsFetch } from '../gists.actiontype';
import navigatorService from '../../utils/navigatorService';
import GistItem from './components/SingleGistOverview';
import EmptyList from './components/EmptyListComponent';
import ListItemSeparator from './components/ListItemSeparator';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

class MyGists extends React.Component {
	componentDidMount() {
		this.props.fetchUserGists();
	}

	renderListItem = ({item}) => (
		<GistItem 
			gistData={item}
			onClickGist={(id) => console.log('Clicked ' +  id)}
		/>
	)

	render() {
		const { userGists, requestInProgress } = this.props; 
		return (
			<Container>
				{
					requestInProgress ?
						<ActivityIndicator size="small"/> :
						userGists.length > 0 ? 
							<FlatList
								data={userGists}
								keyExtractor={item => item.id}
								renderItem={this.renderListItem}
								ItemSeparatorComponent={() => <ListItemSeparator />}
							/> :
							<EmptyList message="This user has not created any Gist yet" />
				}
			</Container>
		)
	}
}

const mapStateToProps = ({ userGistsData }) => ({
	userGists: userGistsData.gists,
	requestInProgress: userGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchUserGists: () => dispatch(userGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGists);
