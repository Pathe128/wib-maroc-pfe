import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import PostListItem from '../components/PostListItem'; // Import du nouveau composant
import { COLORS } from '../constants/Colors';
import { useLanguage } from '../constants/LanguageContext';
import { usePosts } from '../lib/hooks/usePosts';

export default function HomeScreen() {
  const { t } = useLanguage();
  const { data: posts, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('home')} />

      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
