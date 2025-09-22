import React from 'react';
import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../constants/Colors';

import { Post } from '../types';

type PostListItemProps = {
  post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <Link href={{ pathname: '/posts/[id]', params: { id: post.id } }} asChild>
      <Pressable style={styles.card}>
      <View style={styles.header}>
        {post.users.image && <Image source={{ uri: post.users.image }} style={styles.avatar} />}
        <Text style={styles.author}>{post.users.name}</Text>
      </View>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        {/* Nous ajouterons les likes plus tard */}
      </View>
    </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  author: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default PostListItem;
