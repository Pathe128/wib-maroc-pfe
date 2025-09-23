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
    description: 'Ceci est une description détaillée de la vidéo. Elle contient plus d\'informations sur le contenu visionné. Cette vidéo présente un tutoriel complet sur le développement React Native avec Expo.',
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
        {/* Header avec titre au-dessus de la vidéo */}
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>
        </View>

        {/* Media Container - Taille proportionnelle */}
        <View style={styles.mediaContainer}>
          {post.video && isYouTubeUrl(post.video) ? (
            <VideoPlayer 
              videoUrl={post.video} 
              aspectRatio={16/9} // Contrôle précis de l'aspect ratio
            />
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

        {/* Content Container - Meilleure intégration */}
        <View style={styles.contentContainer}>
          {post.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Description</Text>
              <Text style={styles.description}>{post.description}</Text>
            </View>
          )}
          
          {/* Informations supplémentaires */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Durée</Text>
              <Text style={styles.metaValue}>4:32</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Vues</Text>
              <Text style={styles.metaValue}>15.2K</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>15 déc. 2024</Text>
            </View>
          </View>
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mediaContainer: {
    width: '100%',
    backgroundColor: '#000',
    paddingHorizontal: 0, // Supprimer tout padding pour une pleine largeur
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default PostDetail;