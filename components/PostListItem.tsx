import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../constants/Colors';
import { Post } from '../types';
import ImageViewer from './ImageViewer';
import VideoPlayer from './VideoPlayer';

type PostListItemProps = {
  post: Post;
};

const PostListItem = ({ post }: PostListItemProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const handleImagePress = () => {
    if (post.image && !imageError) {
      setImageViewerVisible(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const isYouTubeUrl = (url: string) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  return (
    <>
      <Link href={{ pathname: '/posts/[id]', params: { id: post.id } }} asChild>
        <Pressable style={styles.card}>
          {/* SUPPRIMÉ: En-tête utilisateur */}

          {post.image && !imageError && (
            <TouchableOpacity onPress={handleImagePress}>
              <View style={styles.imageContainer}>
                {imageLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color={COLORS.primary} size="large" />
                  </View>
                )}
                <Image 
                  source={{ uri: post.image }} 
                  style={styles.image}
                  onLoadStart={() => setImageLoading(true)}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </View>
            </TouchableOpacity>
          )}

          {post.video && isYouTubeUrl(post.video) && (
            <View style={styles.videoContainer}>
              <VideoPlayer videoUrl={post.video} />
            </View>
          )}

          {post.image && imageError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Image non disponible</Text>
            </View>
          )}

          <View style={styles.content}>
            <Text style={styles.title}>{post.title}</Text>
            {post.description && (
              <Text style={styles.description}>{post.description}</Text>
            )}
          </View>
        </Pressable>
      </Link>

      <ImageViewer
        visible={imageViewerVisible}
        imageUrl={post.image || ''}
        onClose={() => setImageViewerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 16/9,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  videoContainer: {
    width: '100%',
    overflow: 'hidden',
    resizeMode: 'cover',
    aspectRatio: 16/9,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  content: {
    padding: 16,
  },
  title: {
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
});

export default PostListItem;