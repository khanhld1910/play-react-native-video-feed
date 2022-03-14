/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, memo} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  useWindowDimensions,
} from 'react-native';
import SnapshotVideo from './components/SnapshotVideo';
import {videoItems} from './everything';

// we set the height of item is fixed


const App = () => {
  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const getItemLayout = useCallback(
    (data, index) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    [SCREEN_HEIGHT],
  );

  const [viewingKey, setViewingKey] = React.useState(0);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <SnapshotVideo
          item={item}
          key={item.key}
          active={viewingKey === item.key}
        />
      );
    },
    [viewingKey],
  );

  const onViewRef = React.useRef(({viewableItems}) => {
    setViewingKey(viewableItems?.[0]?.key);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 95});

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={videoItems}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        windowSize={2} // render the active item and the next
        // add
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={SCREEN_HEIGHT}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        removeClippedSubviews
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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

export default App;
