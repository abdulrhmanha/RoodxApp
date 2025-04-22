import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import StoryViewer from './StoryViewer';

const usersData = [
  {
    user: 'Ali',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    stories: [
      { type: 'image', url: 'https://picsum.photos/id/1015/600/900' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
  {
    user: 'Sara',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    stories: [
      { type: 'image', url: 'https://picsum.photos/id/1018/600/900' },
      { type: 'image', url: 'https://picsum.photos/id/1020/600/900' },
    ],
  },
  {
    user: 'Mohamad',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    stories: [
      { type: 'image', url: 'https://picsum.photos/id/1025/600/900' },
      { type: 'image', url: 'https://picsum.photos/id/1027/600/900' },
    ],
  },
];

export default function Index() {
  const [selectedUser, setSelectedUser] = useState(null);

  // إذا تم اختيار المستخدم، نعرض شاشة القصص
  if (selectedUser !== null) {
    return (
      <StoryViewer
        user={usersData[selectedUser]}
        onClose={() => setSelectedUser(null)} // إعادة تعيين الحالة لإغلاق شاشة القصص
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Instagram Stories</Text>
      <FlatList
        horizontal
        data={usersData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedUser(index)}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{item.user}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'purple',
  },
  username: {
    marginTop: 5,
    fontSize: 12,
  },
});
