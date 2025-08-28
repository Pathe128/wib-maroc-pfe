import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { COLORS } from '../constants/Colors';
import { useLanguage } from '../constants/LanguageContext';

const { width } = Dimensions.get('window');

// Dynamic posts data with images and videos
const staticPosts = [
  {
    id: 1,
    type: 'event',
    title: 'Séminaire WIB: Entrepreneuriat Féminin',
    description: 'Rejoignez-nous pour une journée dédiée à l\'entrepreneuriat féminin au Maroc. Découvrez les stratégies gagnantes et rencontrez des expertes du domaine.',
    date: '2024-09-15',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop',
    category: 'Événement',
    hasVideo: false
  },
  {
    id: 2,
    type: 'video',
    title: 'Conférence: Financement des Startups',
    description: 'Découvrez les meilleures stratégies de financement pour votre startup avec nos experts financiers.',
    date: '2024-09-10',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    category: 'Vidéo',
    hasVideo: true,
    videoId: 'dQw4w9WgXcQ' // Example YouTube video ID
  },
  {
    id: 3,
    type: 'seminar',
    title: 'Formation: Marketing Digital',
    description: 'Apprenez les bases du marketing digital pour développer votre business et atteindre vos clients cibles.',
    date: '2024-09-08',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    category: 'Formation',
    hasVideo: true,
    videoId: 'ScMzIvxBSi4'
  },
  {
    id: 4,
    type: 'event',
    title: 'Networking WIB Casablanca',
    description: 'Rencontrez d\'autres entrepreneures lors de notre événement networking exclusif dans la capitale économique.',
    date: '2024-09-05',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop',
    category: 'Événement',
    hasVideo: false
  },
  {
    id: 5,
    type: 'video',
    title: 'Témoignage: Success Story de Fatima',
    description: 'L\'histoire inspirante de Fatima, fondatrice d\'une entreprise tech qui a révolutionné son secteur.',
    date: '2024-09-01',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=250&fit=crop',
    category: 'Témoignage',
    hasVideo: true,
    videoId: 'jNQXAC9IVRw'
  },
  {
    id: 6,
    type: 'event',
    title: 'Atelier: Gestion Financière',
    description: 'Maîtrisez les fondamentaux de la gestion financière pour votre entreprise avec nos experts comptables.',
    date: '2024-08-28',
    image: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=250&fit=crop',
    category: 'Atelier',
    hasVideo: false
  }
];

export default function HomeScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('home')} />

      {/* Posts List */}
      <ScrollView 
        style={styles.postsContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {staticPosts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postCard}>
            <View style={styles.postImageContainer}>
              <Image 
                source={{ uri: post.image }} 
                style={styles.postImage}
                resizeMode="cover"
              />
              {post.hasVideo && (
                <View style={styles.videoOverlay}>
                  <Text style={styles.playIcon}>▶️</Text>
                </View>
              )}
            </View>
            <View style={styles.postContent}>
              <View style={styles.postHeader}>
                <Text style={styles.postCategory}>{post.category}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDescription}>{post.description}</Text>
              {post.hasVideo && (
                <View style={styles.videoInfo}>
                  <Text style={styles.videoLabel}>🎥 Vidéo disponible</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  postsContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  postsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  postImageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#fff',
  },
  postContent: {
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postCategory: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  videoInfo: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  videoLabel: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
