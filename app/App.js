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

// we set the height of item is fixed

const items = [...Array(400)].map((_, index) => ({key: index}));

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

  const renderItem = useCallback(({item}) => {
    return <SnapshotVideo item={item} key={item.key} />;
  }, []);

  const [viewingItem, setViewingItem] = React.useState();

  const onViewRef = React.useRef(({viewableItems}) => {
    const {item, key} = viewableItems[0];
    setViewingItem(item);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={items}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        windowSize={2} // render the active item and the next
        initialNumToRender={2}
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
    // backgroundColor: 'white',
  },
  text: {
    color: 'white',
  },
});

export default App;
