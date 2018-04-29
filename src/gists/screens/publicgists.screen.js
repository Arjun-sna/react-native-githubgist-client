import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { publicGistsFetch } from '../gists.actiontype';
import navigatorService from '../../utils/navigatorService';
import GistItem from './components/SingleGistOverview';
import EmptyList from './components/EmptyListComponent';
import ListItemSeparator from './components/ListItemSeparator';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

class PublicGist extends React.Component {
	componentDidMount() {
		if (this.props.publicGists.length < 1) {
			this.props.fetchPublicGists();
		}
	}

	renderListItem = ({item}) => (
		<GistItem 
			gistData={item}
			onClickGist={(id) => console.log('Clicked ' +  id)}
		/>
	)

	render() {
		const { publicGists, requestInProgress } = this.props; 
		return (
			<Container>
				{
					requestInProgress ?
						<ActivityIndicator size="small"/> :
						publicGists.length > 0 ? 
							<FlatList
								data={publicGists}
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

const mapStateToProps = ({ publicGistsData }) => ({
	publicGists: publicGistsData.gists,
	requestInProgress: publicGistsData.inProgress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPublicGists: () => dispatch(publicGistsFetch.action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicGist);
