import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/Colors';
import { useCreatePost } from '../lib/hooks/usePosts';
import { uploadMedia } from '../services/api';

const CreateEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const { user } = useUser();
  const userId = user?.id;
  const { mutate: createPost, isPending } = useCreatePost();

  const pickMedia = async (type: 'image' | 'video') => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission requise', 'Vous devez autoriser l\'accès à la galerie.');
        return;
      }

      // VERSION SIMPLIFIÉE - Sans mediaTypes
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
      });

      if (pickerResult.canceled) return;

      const fileUri = pickerResult.assets[0].uri;
      
      // Vérifier le type de fichier sélectionné
      const selectedType = fileUri.toLowerCase().includes('.mp4') || 
                          fileUri.toLowerCase().includes('.mov') ? 'video' : 'image';
      
      if (selectedType !== type) {
        Alert.alert('Erreur', `Vous avez sélectionné un ${selectedType} au lieu d'un ${type}`);
        return;
      }

      try {
        setIsUploading(true);
        console.log('Début upload...');
        const publicUrl = await uploadMedia(fileUri);
        console.log('Upload réussi:', publicUrl);
        setMediaUrl(publicUrl);
        setMediaType(type);
      } catch (error: any) {
        console.error('Erreur upload:', error);
        Alert.alert('Erreur', error.message || "L'upload a échoué. Veuillez réessayer.");
      } finally {
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Erreur sélection média:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner le média.');
    }
  };

  const handleSelectMedia = (type: 'image' | 'video') => {
    Alert.alert(
      `Ajouter un${type === 'image' ? 'e image' : 'e vidéo'}`,
      'Choisissez une option',
      [
        {
          text: 'Entrer une URL',
          onPress: () => {
            setShowUrlInput(true);
            setMediaType(type);
          },
        },
        {
          text: 'Choisir depuis la galerie',
          onPress: () => pickMedia(type),
        },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const handleCreatePost = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Le titre est obligatoire.');
      return;
    }
    if (!userId) {
      Alert.alert('Erreur', 'Vous devez être connecté pour créer un événement.');
      return;
    }

    try {
      createPost({
        title: title.trim(),
        description: description.trim() || undefined,
        mediaUrl: mediaUrl || undefined,
        userId: userId,
        mediaType: mediaType || undefined,
      });
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    }
  };

  const clearMedia = () => {
    setMediaUrl('');
    setMediaType(null);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <Stack.Screen options={{ title: 'Créer un événement' }} />

          <Text style={styles.label}>Titre de l'événement *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Soirée de lancement"
            style={styles.input}
            placeholderTextColor={COLORS.textMuted}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez les détails de votre événement..."
            style={[styles.input, styles.multilineInput]}
            multiline
            numberOfLines={4}
            placeholderTextColor={COLORS.textMuted}
          />

          <Text style={styles.label}>Médias (optionnel)</Text>
          <View style={styles.mediaContainer}>
            <TouchableOpacity 
              style={[
                styles.mediaPicker,
                mediaType === 'image' && styles.mediaPickerSelected
              ]} 
              onPress={() => handleSelectMedia('image')}
              disabled={isUploading}
            >
              {mediaUrl && mediaType === 'image' ? (
                <View style={styles.previewContainer}>
                  <Image source={{ uri: mediaUrl }} style={styles.previewImage} />
                  <TouchableOpacity style={styles.clearButton} onPress={clearMedia}>
                    <Feather name="x" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : isUploading ? (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator color={COLORS.primary} />
                  <Text style={styles.uploadingText}>Upload...</Text>
                </View>
              ) : (
                <>
                  <Feather name="image" size={24} color={COLORS.primary} />
                  <Text style={styles.mediaPickerText}>Ajouter une image</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.mediaPicker,
                mediaType === 'video' && styles.mediaPickerSelected
              ]} 
              onPress={() => handleSelectMedia('video')}
              disabled={isUploading}
            >
              {mediaUrl && mediaType === 'video' ? (
                <View style={styles.previewContainer}>
                  <View style={styles.previewVideo}>
                    <Feather name="video" size={24} color={COLORS.primary} />
                    <Text style={styles.mediaPickerText}>Vidéo ajoutée</Text>
                  </View>
                  <TouchableOpacity style={styles.clearButton} onPress={clearMedia}>
                    <Feather name="x" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : isUploading ? (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator color={COLORS.primary} />
                  <Text style={styles.uploadingText}>Upload...</Text>
                </View>
              ) : (
                <>
                  <Feather name="video" size={24} color={COLORS.primary} />
                  <Text style={styles.mediaPickerText}>Ajouter une vidéo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {showUrlInput && (
            <View style={styles.urlInputContainer}>
              <TextInput
                placeholder={`Coller l'URL de l'${mediaType} ici`}
                style={styles.input}
                value={mediaUrl}
                onChangeText={setMediaUrl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={COLORS.textMuted}
              />
              <TouchableOpacity 
                style={styles.urlCloseButton}
                onPress={() => setShowUrlInput(false)}
              >
                <Feather name="x" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity 
            style={[
              styles.button, 
              (isPending || isUploading) && styles.buttonDisabled
            ]} 
            onPress={handleCreatePost} 
            disabled={isPending || isUploading}
          >
            {isPending || isUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Créer l'événement</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    color: COLORS.text,
  },
  multilineInput: { minHeight: 100, textAlignVertical: 'top' },
  mediaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  mediaPicker: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(147, 51, 234, 0.05)',
  },
  mediaPickerSelected: {
    borderStyle: 'solid',
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
  },
  mediaPickerText: {
    marginTop: 8,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  previewVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  clearButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.primary,
  },
  urlInputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlCloseButton: {
    marginLeft: 10,
    padding: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default CreateEventScreen;