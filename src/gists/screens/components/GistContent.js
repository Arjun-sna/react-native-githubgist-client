import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';
import GistItem from './SingleGistOverview';
import EmptyList from './EmptyListComponent';
import ListItemSeparator from './ListItemSeparator';

const Container = styled.View`
	flex: 1;
  justify-content: center;
  marginTop: 25;
`;

export default class GistListContent extends React.Component {
	componentDidMount() {
		if (this.props.gistList.length < 1) {
			this.props.fetchGists();
		}
	}

	renderListItem = ({ item }) => (
    <GistItem
			gistData={item}
			onClickGist={(id) => console.log('Clicked ' +  id)}
		/>
	)

	render() {
    const { gistList, showLoader } = this.props; 
    
		return (
      <Container>
				{
					showLoader ? (
            <ActivityIndicator size="small"/>
          ) : (
            <FlatList
              data={gistList}
              keyExtractor={item => item.id}
              renderItem={this.renderListItem}
              ItemSeparatorComponent={() => <ListItemSeparator />}
              onEndReached={this.props.fetchGists}
              ListEmptyComponent={() => <EmptyList message={this.props.empltyListMessage} />}
            />
          )
				}
			</Container>
		)
	}
}