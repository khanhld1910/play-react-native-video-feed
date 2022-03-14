/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, memo, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Platform,
  Pressable,
} from 'react-native';
import JWPlayer, {JWPlayerState} from 'react-native-jw-media-player';

const SnapshotVideo = memo(({item}) => {
  React.useEffect(() => {
    console.log('rendering', item.key);
    return () => {
      console.log('unmounted', item.key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const playlistItem = {
    // mediaId: jw_media_id,
    // file: jw_media_url,
    // autostart: false,
    // repeat: true,
    // controls: false,
    // stretching: 'uniform',
    // image: jw_media_thumb,
    // mediaId: 'jVZ3v96g',
    // mediaId: '7n3aXfnT',
    mediaId: '7n3aXfnT',
    file: 'https://cdn.jwplayer.com/manifests/7n3aXfnT.m3u8',
    image: 'https://cdn.jwplayer.com/v2/media/7n3aXfnT/poster.jpg?width=720',
    autostart: false,
    repeat: true,
    controls: false,
    stretching: 'uniform',
  };

  const config = {
    license:
      Platform.OS === 'android'
        ? 'ZUOnJfGh3xbyZ5FNwQ0pg5wOXDEbvwLjFwhNNkvIwURkSWZs0qHABp7+du+81dr+'
        : 'PbDtdlZt+5E8+XzEshmYmX8jOJlQxXdvUoCgVx3WDUaFKwFrCFKzh616RNBjJaBr',
    playlist: [playlistItem],
  };

  const playerRef = useRef();
  // const isPlaying = async () => {
  //   const playerState = await this.JWPlayer.playerState();
  //   return playerState === JWPlayerState.JWPlayerStatePlaying;
  // };

  const handleOnPress = () => {

    //
  };
  
  const [pause, setPause] = useState(true);

  return (
    <View style={{...styles.item, height: SCREEN_HEIGHT}}>
      <Pressable onPressIn={handleOnPress} style={styles.wrapper}>
        <JWPlayer
          ref={playerRef}
          style={styles.player}
          config={config}
          // controls={false}
          onPlayerReady={() => {
            console.log('ready');
          }}
        />
      </Pressable>
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

export default SnapshotVideo;
