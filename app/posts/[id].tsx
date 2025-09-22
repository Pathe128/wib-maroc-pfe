import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import VideoPlayer from '../../components/VideoPlayer';
import { COLORS } from '../../constants/Colors';

const { width } = Dimensions.get('window');

const PostDetail = () => {
  const { id } = useLocalSearchParams();

  // Données mock - à remplacer par votre API
  const post = {
    id: id as string,
    title: 'Titre de la vidéo démo',
    description: 'Ceci est une description détaillée de la vidéo. Elle contient plus d\'informations sur le contenu visionné.',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    image: null,
  };

  const isYouTubeUrl = (url: string) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Media Container - Occupe tout l'espace en haut */}
        <View style={styles.mediaContainer}>
          {post.video && isYouTubeUrl(post.video) ? (
            <VideoPlayer videoUrl={post.video} />
          ) : post.image ? (
            <Image 
              source={{ uri: post.image }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Aucun média disponible</Text>
            </View>
          )}
        </View>

        {/* Content Container - En bas avec espace pour la barre système */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{post.title}</Text>
          {post.description && (
            <Text style={styles.description}>{post.description}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Marge pour les éléments système
  },
  mediaContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: width * 0.5625, // 16:9 aspect ratio
  },
  placeholder: {
    width: '100%',
    height: width * 0.5625,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40, // Espace supplémentaire en bas
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
});

export default PostDetail;