import React from 'react';
import { View } from 'react-native';
import pick from 'lodash/pick';
import Header from './components/GistDetailHeader';

const HeaderProps = [
	'avatal_url',
	'login',
  'created_at',
];

export default ({ navigation }) => {
	const gistData = navigation.getParam('gistData', {});
	const { owner } = gistData;

	return(
		<View>
			<Header 
				userImage={owner.avatar_url}
				userName={owner.login}
				createdAt={gistData.created_At}/>
		</View>
	)
}