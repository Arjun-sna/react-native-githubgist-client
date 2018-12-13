import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import { clearCache } from '../cache.actionType';

const ClearCacheScreen = ({ clearCache }) => (
	<Button
		onPress={clearCache}
		title="Clear Cache"
	/>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	clearCache: () => dispatch(clearCache()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearCacheScreen);
