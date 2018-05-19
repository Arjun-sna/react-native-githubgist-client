import React from 'react';
import { View, FlatList } from 'react-native';
import pick from 'lodash/pick';
import forOwn from 'lodash/forOwn'
import Header from './components/GistDetailHeader';
import GistFileItem from './components/GistFileItem';
import ListEmptyComponent from './components/EmptyListComponent';

const HeaderProps = [
	'avatal_url',
	'login',
  'created_at',
];

export default class GistDetails extends React.Component {
	
	renderItem = ({item}) =>( 
			<GistFileItem 
					fileName={item.filename}
					language={item.language}
					size={item.size}/>
		);


	processFiles = (gistFiles) => {
		const filesList = [];
		forOwn(gistFiles, (value) => 	filesList.push(value))
		return filesList;
	};

	render() {
		const { navigation } = this.props;
		const gistData = navigation.getParam('gistData', {});
		const { owner } = gistData;
		const gistFiles = this.processFiles(gistData.files);

		return(
			<View>
				<Header 
					userImage={owner.avatar_url}
					userName={owner.login}
					createdAt={gistData.created_At}/>
				<FlatList
					data={gistFiles}
					renderItem={this.renderItem}
					keyExtractor={item => item.filename}
					ListEmptyComponent={() => <EmptyList message="Gist doesn't have any file" />}					
				/>
			</View>
		)
	}
}
