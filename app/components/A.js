/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const SnapshotVideo = memo(({item}) => {
  React.useEffect(() => {
    console.log('rendering', item.key);
    return () => {
      console.log('unmounted', item.key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {height: SCREEN_HEIGHT} = useWindowDimensions();
  return (
    <View style={{...styles.item, height: SCREEN_HEIGHT}}>
      <Text style={styles.text}>Item {item.key}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  text: {
    color: 'white',
  },
});

export default SnapshotVideo;
