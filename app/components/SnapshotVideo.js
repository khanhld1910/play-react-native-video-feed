/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useCallback,
  memo,
  useRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, View, useWindowDimensions, Platform} from 'react-native';
import JWPlayer from 'react-native-jw-media-player';

const SnapshotVideo = React.forwardRef((props, ref) => {
  const {item, active} = props;

  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const playlistItem = {
    mediaId: item.mediaId,
    file: 'https://cdn.jwplayer.com/manifests/' + item.mediaId + '.m3u8',
    image:
      'https://cdn.jwplayer.com/v2/media/' +
      item.mediaId +
      '/poster.jpg?width=720',
    autostart: true,
    repeat: true,
    controls: true,
    stretching: 'uniform',
  };

  const config = {
    license:
      Platform.OS === 'android'
        ? 'ZUOnJfGh3xbyZ5FNwQ0pg5wOXDEbvwLjFwhNNkvIwURkSWZs0qHABp7+du+81dr+'
        : 'T1W7P7jLprzJ7I1Kky4ckNKTq/yrRlue8m2pLjrsFDkKd/JJ',
    playlist: [playlistItem],
    backgroundAudioEnabled: false,
    repeat: true,
  };

  const [isReady, setIsReady] = useState(false);
  const onPlayerReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const playerRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      playerRef?.current?.play();
    },
    pause() {
      playerRef?.current?.pause();
    },
  }));

  React.useEffect(() => {
    if (active) {
      console.log('Viewing...', props.item.key + 1);
    }
    if (isReady && active) {
      playerRef?.current?.play();
    }
    if (isReady && !active) {
      playerRef?.current?.pause();
      playerRef?.current?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  React.useEffect(() => {
    console.log('Rendering...', props.item.key + 1);
    return () => {
      console.log('Unmounting...', props.item.key + 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{...styles.item, height: SCREEN_HEIGHT}}>
      <JWPlayer
        ref={playerRef}
        style={styles.player}
        config={config}
        onPlayerReady={onPlayerReady}
        //
      />
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
  wrapper: {
    flex: 1,
  },
  player: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

export default memo(SnapshotVideo);
