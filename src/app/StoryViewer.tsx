import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, Dimensions, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

export default function StoryViewer({ user, onClose }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const current = user.stories[storyIndex];

  const startProgress = (duration = 5000) => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        handleNext();
      }
    });
  };

  useEffect(() => {
    if (current.type === 'image') {
      startProgress();
    }
  }, [storyIndex]);

  const handleNext = () => {
    if (storyIndex < user.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else {
      onClose();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        const x = e.nativeEvent.locationX;
        x > width / 2 ? handleNext() : handleBack();
      }}
    >
      <View style={styles.container}>
        {current.type === 'image' ? (
          <Image source={{ uri: current.url }} style={styles.storyMedia} />
        ) : (
          <Video source={{ uri: current.url }} style={styles.storyMedia} resizeMode="cover" onEnd={handleNext} onLoad={(meta) => startProgress(meta.duration * 1000)} paused={false} repeat={false} />
        )}

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.user}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {user.stories.map((_, idx) => (
            <View key={idx} style={styles.progressBarBackground}>
              {idx === storyIndex ? <Animated.View style={[styles.progressBarFill, { flex: progress }]} /> : <View style={[styles.progressBarFill, { flex: idx < storyIndex ? 1 : 0 }]} />}
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyMedia: {
    width: width,
    height: height,
    position: 'absolute',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
  },
  closeText: {
    color: '#fff',
    fontSize: 26,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    height: 3,
    gap: 5,
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: '#555',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
