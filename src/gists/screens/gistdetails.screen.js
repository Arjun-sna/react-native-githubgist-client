import React from 'react';
import { View, FlatList, Text } from 'react-native';
import pick from 'lodash/pick';
import forOwn from 'lodash/forOwn'
import styled from 'styled-components';
import Header from './components/GistDetailHeader';
import GistFileItem from './components/GistFileItem';
import ListEmptyComponent from './components/EmptyListComponent';
import Toolbar from './components/Toolbar';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const HeaderProps = [
	'avatal_url',
	'login',
  'created_at',
];

const ToolbarContentContainer = styled.View`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

export default class GistDetails extends React.Component {
	
	renderItem = ({item}) =>( 
			<GistFileItem 
					fileData={item}
					onFileItemPress={this.handleFileItemPress}/>
		);
	
	handleFileItemPress = (fileData) => {
		this.props.navigation.navigate('GistFileContentView', {
			fileData
		})
	}


	processFiles = (gistFiles) => {
		const filesList = [];
		let totalFileSize = 0;
		forOwn(gistFiles, (value) => 	{
			filesList.push(value);
			totalFileSize += value.size;
		})
		return { filesList, totalFileSize };
	};

	renderToobarContent = () => {
		return(
			<ToolbarContentContainer>
				<Icon
					onPress={this.handleActionButtonClick}
					name='star-o'
					size={20}
					/>
				<Icon
					name='globe'
					size={20}
					/>
				<Icon
					name='share'
					size={20}
					/>
				<MaterialIcon
					name='delete'
					size={20}
					/>
			</ToolbarContentContainer>
		)
	}

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
				<Toolbar 
					toolbarContent={this.renderToobarContent}
					onBackPress={() => this.props.navigation.goBack()}/>
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
