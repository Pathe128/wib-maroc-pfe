import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../constants/Colors';

interface VideoPlayerProps {
  videoUrl: string;
  isFullscreen?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isFullscreen = false }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getYouTubeId = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0];
    }
    return null;
  };

  const youtubeId = getYouTubeId(videoUrl);

  if (!youtubeId) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Feather name="alert-circle" size={48} color={COLORS.textMuted} />
        <Text style={styles.errorTitle}>Vidéo non disponible</Text>
        <Text style={styles.errorSubtitle}>L'URL YouTube est invalide</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Feather name="wifi-off" size={48} color={COLORS.textMuted} />
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorSubtitle}>Vérifiez votre connexion</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreen]}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement de la vidéo...</Text>
        </View>
      )}
      
      <YoutubePlayer
        height={isFullscreen ? 400 : 300}
        videoId={youtubeId}
        play={false}
        onReady={() => {
          setLoading(false);
          setHasError(false);
        }}
        onError={() => {
          setLoading(false);
          setHasError(true);
        }}
        webViewStyle={styles.youtubeWebView}
        webViewProps={{
          allowsFullscreenVideo: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullscreen: {
    borderRadius: 0,
    marginVertical: 0,
  },
  youtubeWebView: {
    borderRadius: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  errorContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    minHeight: 200,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default VideoPlayer;