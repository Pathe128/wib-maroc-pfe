import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { usePost } from '../../lib/hooks/usePosts';
import PostListItem from '../../components/PostListItem';

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: post, isLoading, isError, error } = usePost(id as string);

  if (isLoading) {
    return <ActivityIndicator style={styles.container} />;
  }

  if (isError || !post) {
    return <Text style={styles.errorText}>Erreur: Impossible de charger le post.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: post.title }} />
      {/* Nous pouvons réutiliser PostListItem ou créer une vue de détail plus élaborée */}
      <PostListItem post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
});

export default PostDetailScreen;
