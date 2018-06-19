import React from 'react';
import { FlatList } from 'react-native';
import { processFiles } from '../../shared/processFiles';
import GistFileItem from './components/GistFileItem';


export default class GistList extends React.Component {
	renderItem = ({ item }) => (
		<GistFileItem
			fileData={item}
			onFileItemPress={this.handleFileItemPress} />
	);

	render() {
  	const { navigation } = this.props;
  	const gistData = navigation.getParam('gistData', {});
		const { filesList: gistFiles } = processFiles(gistData.files);

  	return (
  		<FlatList
  			data={gistFiles}
  			renderItem={this.renderItem}
  			keyExtractor={item => item.filename}
  			ListEmptyComponent={() => <EmptyList message="Gist doesn't have any file" />}
  		/>
  	);
	}
}
