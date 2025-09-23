import { useAuth, useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';
import { getInitials, getUserAvatarUrl } from '../../utils/avatarUtils';

type ProfileTab = 'info' | 'edit';

export default function ProfilScreen() {
  const { t } = useLanguage();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // États pour l'édition
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
    company: '',
    city: '',
    sector: '',
    about: ''
  });

  // Récupérer l'avatar de l'utilisateur
  const userAvatarUrl = user?.imageUrl || getUserAvatarUrl(user);
  const userInitials = getInitials(user?.fullName || user?.primaryEmailAddress?.emailAddress || '');

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour accéder à vos photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0].uri) {
        setIsLoading(true);
        
        // Ici vous devrez uploader l'image vers votre serveur
        // et mettre à jour l'image de profil Clerk
        // Pour l'instant, simulation d'un upload
        setTimeout(() => {
          setIsLoading(false);
          Alert.alert('Succès', 'Photo de profil mise à jour avec succès!');
          // En production, vous devrez appeler l'API Clerk pour mettre à jour l'image
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection de l\'image');
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      
      // Mettre à jour les informations de base avec Clerk
      if (user) {
        await user.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }

      // Ici vous devrez sauvegarder les autres informations (company, city, etc.)
      // dans votre base de données via une API

      setIsLoading(false);
      setIsEditing(false);
      setModalVisible(false);
      Alert.alert('Succès', 'Profil mis à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil');
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const renderInfoTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>📧 Email</Text>
          <Text style={styles.infoValue}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>📱 Téléphone</Text>
          <Text style={styles.infoValue}>
            {user?.phoneNumbers?.[0]?.phoneNumber || 'Non renseigné'}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>🏢 Entreprise</Text>
          <Text style={styles.infoValue}>{formData.company || 'Non renseignée'}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>📍 Ville</Text>
          <Text style={styles.infoValue}>{formData.city || 'Non renseignée'}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>🎯 Secteur</Text>
          <Text style={styles.infoValue}>{formData.sector || 'Non renseigné'}</Text>
        </View>
      </View>
      
      <View style={styles.bioSection}>
        <Text style={styles.bioTitle}>À propos</Text>
        <Text style={styles.bioText}>
          {formData.about || 'Aucune description fournie.'}
        </Text>
      </View>
      
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Formations suivies</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Badges obtenus</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Points WIB</Text>
        </View>
      </View>
    </View>
  );

  const renderEditTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.avatarEdit} onPress={handleImagePick}>
        {userAvatarUrl ? (
          <Image source={{ uri: userAvatarUrl }} style={styles.profileImageLarge} />
        ) : (
          <View style={[styles.profileImageLarge, styles.initialsAvatar]}>
            <Text style={styles.initialsTextLarge}>{userInitials}</Text>
          </View>
        )}
        <View style={styles.editOverlay}>
          <Text style={styles.editText}>📷</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.formSection}>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.textInput}
              value={formData.firstName}
              onChangeText={(text) => setFormData({...formData, firstName: text})}
              placeholder="Votre prénom"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.textInput}
              value={formData.lastName}
              onChangeText={(text) => setFormData({...formData, lastName: text})}
              placeholder="Votre nom"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Téléphone</Text>
          <TextInput
            style={styles.textInput}
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            placeholder="+212 6 12 34 56 78"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Entreprise</Text>
          <TextInput
            style={styles.textInput}
            value={formData.company}
            onChangeText={(text) => setFormData({...formData, company: text})}
            placeholder="Nom de votre entreprise"
          />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Ville</Text>
            <TextInput
              style={styles.textInput}
              value={formData.city}
              onChangeText={(text) => setFormData({...formData, city: text})}
              placeholder="Votre ville"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Secteur</Text>
            <TextInput
              style={styles.textInput}
              value={formData.sector}
              onChangeText={(text) => setFormData({...formData, sector: text})}
              placeholder="Votre secteur"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>À propos</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={formData.about}
            onChangeText={(text) => setFormData({...formData, about: text})}
            placeholder="Décrivez-vous en quelques mots..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveProfile}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Sauvegarder les modifications</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('profile')} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          {/* Avatar et informations principales */}
          <View style={styles.profileHeader}>
            {userAvatarUrl ? (
              <Image source={{ uri: userAvatarUrl }} style={styles.profileImageLarge} />
            ) : (
              <View style={[styles.profileImageLarge, styles.initialsAvatar]}>
                <Text style={styles.initialsTextLarge}>{userInitials}</Text>
              </View>
            )}
            
            <Text style={styles.userName}>
              {user?.fullName || user?.primaryEmailAddress?.emailAddress}
            </Text>
            <Text style={styles.userRole}>
              {formData.company ? `${formData.company} • ${formData.sector}` : 'Membre WIB Maroc'}
            </Text>
          </View>

          {/* Tabs Navigation */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'info' && styles.activeTab]}
              onPress={() => setActiveTab('info')}
            >
              <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
                Mes informations
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'edit' && styles.activeTab]}
              onPress={() => setActiveTab('edit')}
            >
              <Text style={[styles.tabText, activeTab === 'edit' && styles.activeTabText]}>
                Mettre à jour
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenu des tabs */}
          {activeTab === 'info' ? renderInfoTab() : renderEditTab()}

          {/* Bouton de déconnexion */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>🚪 Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal pour l'édition (optionnel) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderEditTab()}
          </View>
        </View>
      </Modal>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  initialsAvatar: {
    backgroundColor: COLORS.primary,
  },
  initialsTextLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarEdit: {
    position: 'relative',
    marginBottom: 20,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 18,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  userRole: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  tabContent: {
    width: '100%',
  },
  infoSection: {
    width: '100%',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  bioSection: {
    width: '100%',
    marginBottom: 24,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fed7d7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  signOutText: {
    color: '#e53e3e',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
});