import React from 'react';
import { View, FlatList, Text } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import Header from './components/GistDetailHeader';
import Toolbar from './components/Toolbar';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import { processFiles } from '~/src/shared/processFiles';
import GistFileItem from './components/GistFileItem';
import forOwn from 'lodash/forOwn';

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
	handleFileItemPress = fileData => {
		this.props.navigation.navigate('GistFileContentView', {
			fileData,
		});
	}

	processFiles = fileData => {
		const filesList = [];
		let totalFileSize = 0;

		forOwn(fileData, value => 	{
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

	renderToobarContent = () => {
		return (
			<ToolbarContentContainer>
				<Icon
					onPress={this.handleActionButtonClick}
					name="star-o"
					size={20}
				/>
				<Icon
					name="globe"
					size={20}
				/>
				<Icon
					name="share"
					size={20}
				/>
				<MaterialIcon
					name="delete"
					size={20}
				/>
			</ToolbarContentContainer>
		);
	}


	render() {
		const { navigation } = this.props;
		const gistData = navigation.getParam('gistData', {});
		const { owner = {} } = gistData;
		const { totalFileSize } = this.processFiles(gistData.files);

		return (
			<View>
				<Header
					userImage={!isEmpty(owner) && owner.avatar_url}
					userName={isEmpty(owner) ? 'Anonymous' : owner.login}
					description={gistData.description}
					createdAt={gistData.created_At}
					gistSize={totalFileSize} />
				<Toolbar
					toolbarContent={this.renderToobarContent}
					onBackPress={() => this.props.navigation.goBack()} />
			</View>
		);
	}
}
