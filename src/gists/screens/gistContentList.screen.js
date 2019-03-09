import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { processFiles } from '../../shared/processFiles';
import GistFileItem from './components/GistFileItem';
import EmptyList from './components/EmptyListComponent';

export default class GistList extends React.Component {
  renderItem = ({ item }) => (
    <GistFileItem
      fileData={item}
      onFileItemPress={this.handleFileItemPress} />
  );

  handleFileItemPress = fileData => {
    this.props.navigation.navigate('GistFileContentView', {
      fileData,
    });
  }

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

GistList.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
