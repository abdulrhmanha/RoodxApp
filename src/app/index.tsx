// import { SafeAreaView, StyleSheet } from 'react-native';
// import React from 'react';
// import InstaStory from 'react-native-insta-story';

// export default function index() {
//   const data = [
//     {
//       user_id: 1,
//       user_image: 'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
//       user_name: 'Ahmet Çağlar Durmuş',
//       stories: [
//         {
//           story_id: 1,
//           story_image: 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
//           swipeText: 'Custom swipe text for this story',
//           onPress: () => console.log('story 1 swiped'),
//         },
//         {
//           story_id: 2,
//           story_image: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
//         },
//       ],
//     },
//     {
//       user_id: 2,
//       user_image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
//       user_name: 'Test User',
//       stories: [
//         {
//           story_id: 1,
//           story_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
//           swipeText: 'Custom swipe text for this story',
//           onPress: () => console.log('story 1 swiped'),
//         },
//         {
//           story_id: 2,
//           story_image: 'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
//           swipeText: 'Custom swipe text for this story',
//           onPress: () => console.log('story 2 swiped'),
//         },
//       ],
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <InstaStory data={data} duration={10} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
// });
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
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

export default function index() {
  const [selectedUser, setSelectedUser] = useState(null);

  if (selectedUser !== null) {
    return (
      <StoryViewer
        user={usersData[selectedUser]}
        onClose={() => setSelectedUser(null)}
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
