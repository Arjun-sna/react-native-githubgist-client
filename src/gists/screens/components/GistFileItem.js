import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import fileSize from 'filesize';
import CardView from 'react-native-cardview';
import { colors, normalizeFont } from '../../../config';

const CardContainer = styled(CardView)`
  padding: 2%;
`;

// const TouchableContainer = styled.TouchableOpacity`
// 	display: flex;
// 	flex-direction: column;
// `;

const MetaContainer = styled.View`
	flex: 1;
	display: flex;
  flex-direction: row;
  padding: 2% 0;
`;

const FileName = styled.Text`
	flex: 1;
	font-weight: bold;
	font-size: ${normalizeFont(14)};
`;

const MetaDetail = styled.Text`
	flex: 1;
	font-size: ${normalizeFont(12)};
	color: ${colors.greyDark}
`;

type Props = {
	fileData: Object,
	onFileItemPress: () => void,
}

export default ({ fileData, onFileItemPress }: Props) => {
	return (
    <TouchableOpacity onPress={() => onFileItemPress(fileData)}>
      <CardContainer
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
      >
        <FileName>{fileData.filename}</FileName>
        <MetaContainer>
          <MetaDetail>{fileData.language}</MetaDetail>
          <MetaDetail>{fileSize(fileData.size)}</MetaDetail>
        </MetaContainer>
		  </CardContainer>
    </TouchableOpacity>
	);
};
