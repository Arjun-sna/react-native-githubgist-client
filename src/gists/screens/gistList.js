import React from 'react';
import { View, FlatList, Text } from 'react-native';
import forOwn from 'lodash/forOwn';
import GistFileItem from '~/src/gists/screens/components/GistFileItem';

export default class GistList extends React.Component {
  processFiles = gistFiles => {
  	const filesList = [];
  	let totalFileSize = 0;

  	forOwn(gistFiles, value => 	{
  		filesList.push(value);
  		totalFileSize += value.size;
  	});

  	return { filesList, totalFileSize };
  };

	renderItem = ({ item }) => (
		<GistFileItem
			fileData={item}
			onFileItemPress={this.handleFileItemPress} />
	);

	render() {
  	const { navigation } = this.props;
  	const gistData = navigation.getParam('gistData', {});
		const { filesList: gistFiles, totalFileSize } = this.processFiles(gistData.files);

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
