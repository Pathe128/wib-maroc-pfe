import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';
import { AIResponse, aiService, ConversationContext } from '../../services/AIService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  animatedValue?: Animated.Value;
}

const { width } = Dimensions.get('window');

export default function CoachWIB() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'fr' 
        ? 'Bonjour ! Je suis Coach WIB, votre partenaire dans votre parcours professionnel. Comment puis-je vous aider aujourd\'hui ? 🌟'
        : language === 'ar'
        ? 'مرحبا! أنا مدرب WIB، شريكك في رحلة التطوير المهني. كيف يمكنني مساعدتك اليوم؟ 🌟'
        : 'مرحبا! أنا Coach WIB، رفيقك في رحلة التطوير المهني. كيفاش نقدر نخدمك اليوم؟ 🌟',
      isUser: false,
      timestamp: new Date(),
      animatedValue: new Animated.Value(0)
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Historique de conversation pour l'IA
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);

  // Animation d'entrée
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Animation de pulsation pour le statut
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTyping]);

  const quickReplies = [
    { 
      text: t('howStartProject'), 
      icon: "🚀"
    },
    { 
      text: t('financingSolutions'), 
      icon: "💰"
    },
    { 
      text: t('increaseSales'), 
      icon: "📈"
    },
    { 
      text: t('managementProblem'), 
      icon: "⚙️"
    },
    { 
      text: t('wantLearnMore'), 
      icon: "📚"
    }
  ];

  // Faire défiler vers le bas automatiquement
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return;

    // Ajouter le message utilisateur avec animation
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
      animatedValue: new Animated.Value(0)
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Animer l'apparition du message utilisateur
    Animated.timing(userMessage.animatedValue!, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Ajouter un message de chargement
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
      animatedValue: new Animated.Value(0)
    };

    setMessages(prev => [...prev, loadingMessage]);

    // Animer l'apparition du message de chargement
    Animated.timing(loadingMessage.animatedValue!, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    try {
      // Préparer le contexte pour l'IA
      const context: ConversationContext = {
        language,
        conversationHistory: [
          ...conversationHistory,
          { role: 'user', content: text, timestamp: new Date() }
        ]
      };

      // Générer la réponse IA
      const aiResponse: AIResponse = await aiService.generateResponse(text, context);

      // Mettre à jour l'historique de conversation
      const newHistory = [
        ...conversationHistory,
        { role: 'user' as const, content: text, timestamp: new Date() },
        { role: 'assistant' as const, content: aiResponse.text, timestamp: new Date() }
      ];
      setConversationHistory(newHistory.slice(-10)); // Garder les 10 derniers messages

      // Remplacer le message de chargement par la réponse IA
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          id: msg.id,
          text: aiResponse.text,
          isUser: false,
          timestamp: new Date(),
          animatedValue: new Animated.Value(1) // Déjà visible
        } : msg
      ));

    } catch (error) {
      console.error('Erreur IA:', error);
      
      // Réponse de fallback en cas d'erreur
      const fallbackResponse = language === 'fr' 
        ? 'Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ? 🤝'
        : language === 'ar'
        ? 'عذراً، أواجه مشكلة تقنية. هل يمكنك إعادة صياغة سؤالك؟ 🤝'
        : 'سمح لي، عندي مشكلة تقنية. يمكنك تعيد صياغة سؤالك؟ 🤝';

      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          id: msg.id,
          text: fallbackResponse,
          isUser: false,
          timestamp: new Date(),
          animatedValue: new Animated.Value(1) // Déjà visible
        } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: any) => {
    // Animation de pression pour les boutons rapides
    Animated.sequence([
      Animated.timing(new Animated.Value(1), {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(new Animated.Value(0.8), {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    sendMessage(reply.text);
  };

  const isRTL = language === 'ar' || language === 'darija';

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.header}
          >
            {/* Flèche de retour déplacée ici */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 2 }}>
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 8 }}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t('coachTitle')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('coachSubtitle')}</Text>
          </LinearGradient>

          {/* Messages */}
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View 
                key={message.id} 
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessageContainer : styles.coachMessageContainer
                ]}
              >
                {!message.isUser && (
                  <Animated.View style={[styles.coachAvatar, { transform: [{ scale: pulseAnim }] }]}>
                    <Text style={styles.coachAvatarText}>🤖</Text>
                  </Animated.View>
                )}
                <Animated.View 
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessage : styles.coachMessage,
                    {
                      transform: [{ 
                        scale: message.animatedValue ? 
                          message.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1]
                          }) : 1
                      }]
                    }
                  ]}
                >
                  {message.isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color={COLORS.primary} />
                      <Text style={styles.loadingText}>
                        {language === 'fr' ? 'Coach WIB réfléchit...' : language === 'ar' ? 'مدرب WIB يفكر...' : 'Coach WIB كيفكر...'}
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Text style={[
                        styles.messageText,
                        message.isUser ? styles.userMessageText : styles.coachMessageText,
                        { textAlign: isRTL ? 'right' : 'left' }
                      ]}>
                        {message.text}
                      </Text>
                      <Text style={[styles.timestamp, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'ar-MA', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </>
                  )}
                </Animated.View>
              </View>
            ))}
          </ScrollView>

          {/* Quick Replies */}
          <Animated.View style={[styles.quickRepliesContainer, { opacity: fadeAnim }]}>
            <Text style={[styles.quickRepliesTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('quickQuestions')}
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickRepliesContent}
            >
              {quickReplies.map((reply, index) => (
                <Animated.View
                  key={index}
                  style={{
                    transform: [{ 
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 * (index + 1), 0]
                      })
                    }]
                  }}
                >
                  <TouchableOpacity
                    style={[styles.quickReplyButton, isTyping && styles.quickReplyButtonDisabled]}
                    onPress={() => !isTyping && handleQuickReply(reply)}
                    disabled={isTyping}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quickReplyIcon}>{reply.icon}</Text>
                    <Text style={[styles.quickReplyText, { textAlign: 'center' }]}>{reply.text}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Input */}
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.textInput, { textAlign: isRTL ? 'right' : 'left' }]}
                value={inputText}
                onChangeText={setInputText}
                placeholder={t('typeMessage')}
                placeholderTextColor="rgba(0,0,0,0.5)"
                multiline
                editable={!isTyping}
              />
              <TouchableOpacity
                style={[styles.sendButton, isTyping && styles.sendButtonDisabled]}
                onPress={() => !isTyping && sendMessage(inputText)}
                disabled={isTyping || inputText.trim() === ''}
                activeOpacity={0.7}
              >
                <Text style={styles.sendButtonText}>📤</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // marginTop: 32, // supprimé pour garder le header dans le fond coloré
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    padding: 4,
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  coachMessageContainer: {
    justifyContent: 'flex-start',
  },
  coachAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  coachAvatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 16,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  coachMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#fff',
  },
  coachMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  quickRepliesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quickRepliesContent: {
    paddingRight: 8,
  },
  quickReplyButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickReplyButtonDisabled: {
    opacity: 0.5,
  },
  quickReplyIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickReplyText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    fontSize: 18,
  },
}); 