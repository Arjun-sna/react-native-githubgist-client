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
		let totalFileSize = 0;
		forOwn(gistFiles, (value) => 	{
			filesList.push(value);
			totalFileSize += value.size;
		})
		return { filesList, totalFileSize };
	};

	render() {
		const { navigation } = this.props;
		const gistData = navigation.getParam('gistData', {});
		const { owner } = gistData;
		const { filesList:gistFiles, totalFileSize } = this.processFiles(gistData.files);

		return(
			<View>
				<Header 
					userImage={owner.avatar_url}
					userName={owner.login}
					description={gistData.description}
					createdAt={gistData.created_At}
					gistSize={totalFileSize}/>
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
