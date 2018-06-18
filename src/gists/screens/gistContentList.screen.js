import React from 'react';
import { View, FlatList, Text } from 'react-native';
import forOwn from 'lodash/forOwn';
// import { processFiles } from '~/src/shared/processFiles';
import GistFileItem from './components/GistFileItem';


export default class GistList extends React.Component {
	renderItem = ({ item }) => (
		<GistFileItem
			fileData={item}
			onFileItemPress={this.handleFileItemPress} />
	);

processFiles = fileData => {
	const filesList = [];
	let totalFileSize = 0;

	forOwn(fileData, value => 	{
		filesList.push(value);
		totalFileSize += value.size;
	});

	return { filesList, totalFileSize };
};


render() {
  	const { navigation } = this.props;
  	const gistData = navigation.getParam('gistData', {});
	const { filesList: gistFiles } = this.processFiles(gistData.files);

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
