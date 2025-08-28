import { AI_CONFIG, OPENROUTER_API_KEY } from '../constants/Config';
import { Language } from '../constants/Languages';

export interface ConversationContext {
  language: Language;
  userProfile?: {
    experience: 'beginner' | 'intermediate' | 'advanced';
    sector?: string;
    goals?: string[];
  };
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
}

export interface AIResponse {
  text: string;
  suggestions?: string[];
  confidence: number;
  context?: any;
}

class AIService {
  private apiKey: string = OPENROUTER_API_KEY;
  private baseURL: string = 'https://openrouter.ai/api/v1/chat/completions';

  // Configuration pour différentes langues
  private systemPrompts = {
    fr: `Tu es Coach WIB, un mentor expert en entrepreneuriat féminin au Maroc. Tu aides les femmes entrepreneures avec des conseils pratiques, motivation et accompagnement personnalisé.

Ton rôle :
- Donner des conseils concrets et applicables
- Motiver et encourager
- Adapter tes réponses au niveau d'expérience
- Être bienveillant et professionnel
- Donner des exemples du contexte marocain

Format de réponse :
- Réponse principale claire et structurée
- Suggestions d'actions concrètes
- Emojis appropriés pour rendre plus engageant
- Maximum 3-4 paragraphes

Contexte : Entrepreneuriat féminin, écosystème marocain, défis spécifiques aux femmes.`,
    
    ar: `أنت مدرب WIB، خبير في ريادة الأعمال النسائية في المغرب. تساعد رائدات الأعمال بنصائح عملية وتحفيز ومرافقة شخصية.

دورك:
- تقديم نصائح عملية وقابلة للتطبيق
- التحفيز والتشجيع
- تكييف إجاباتك مع مستوى الخبرة
- أن تكوني داعمة ومهنية
- تقديم أمثلة من السياق المغربي

تنسيق الإجابة:
- إجابة رئيسية واضحة ومنظمة
- اقتراحات إجراءات عملية
- رموز تعبيرية مناسبة لجعلها أكثر جاذبية
- حد أقصى 3-4 فقرات

السياق: ريادة الأعمال النسائية، النظام البيئي المغربي، تحديات خاصة بالنساء.`,
    
    darija: `نتا Coach WIB، خبير في ريادة الأعمال النسائية في المغرب. كتساعد رائدات الأعمال بنصائح عملية وتحفيز ومرافقة شخصية.

دورك:
- تعطي نصائح عملية وقابلة للتطبيق
- التحفيز والتشجيع
- تكييف إجاباتك مع مستوى الخبرة
- تكون داعمة ومهنية
- تعطي أمثلة من السياق المغربي

تنسيق الإجابة:
- إجابة رئيسية واضحة ومنظمة
- اقتراحات إجراءات عملية
- رموز تعبيرية مناسبة لجعلها أكثر جاذبية
- حد أقصى 3-4 فقرات

السياق: ريادة الأعمال النسائية، النظام البيئي المغربي، تحديات خاصة بالنساء.`
  };

  constructor() {
    this.apiKey = OPENROUTER_API_KEY;
    console.log('TEST OPENROUTER_API_KEY:', OPENROUTER_API_KEY);
    console.log('AIService initialized with API key:', this.apiKey ? 'Present' : 'Missing');
    
    // OpenRouter API activée
    console.log('🚀 OpenRouter API activée avec votre clé gratuite !');
  }

  async generateResponse(
    userMessage: string, 
    context: ConversationContext
  ): Promise<AIResponse> {
    console.log('Generating AI response for:', userMessage);
    console.log('Language:', context.language);
    
    try {
      if (!this.apiKey) {
        console.log('No API key found, using fallback');
        return this.getFallbackResponse(userMessage, context.language);
      }

      const systemPrompt = this.systemPrompts[context.language];
      
      // Construire l'historique de conversation
      const messages = [
        { role: 'system', content: systemPrompt },
        ...context.conversationHistory.slice(-6).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      console.log('Sending request to OpenAI...');
      console.log('Messages count:', messages.length);

      const requestBody = {
        model: AI_CONFIG.MODEL,
        messages: messages,
        max_tokens: AI_CONFIG.MAX_TOKENS,
        temperature: AI_CONFIG.TEMPERATURE,
        top_p: AI_CONFIG.TOP_P,
        frequency_penalty: AI_CONFIG.FREQUENCY_PENALTY,
        presence_penalty: AI_CONFIG.PRESENCE_PENALTY
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://wibmaroc.ma',
          'X-Title': 'WIB Maroc Coach'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('OpenAI response data:', data);

      const aiResponse = data.choices?.[0]?.message?.content || '';
      console.log('AI Response text:', aiResponse);

      if (!aiResponse) {
        throw new Error('No response content from OpenAI');
      }

      return {
        text: aiResponse,
        confidence: 0.9,
        suggestions: this.generateSuggestions(userMessage, context.language)
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      console.error('Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      
      // Fallback vers les réponses prédéfinies
      return this.getFallbackResponse(userMessage, context.language);
    }
  }

  private getFallbackResponse(userMessage: string, language: Language): AIResponse {
    console.log('Using fallback response for language:', language);
    
    // Réponses prédéfinies intelligentes selon le contexte
    const fallbackResponses: Record<Language, Record<string, string>> = {
      fr: {
        'projet': 'Excellente question ! Pour démarrer votre projet, voici les étapes essentielles :\n\n🚀 **Définissez votre idée** : Clarifiez votre concept et votre valeur ajoutée\n📊 **Étude de marché** : Analysez la concurrence et identifiez votre cible\n💵 **Plan financier** : Calculez vos coûts et prévoyez vos revenus\n🏦 **Financement** : Explorez les microcrédits et les subventions WIB\n\nVoulez-vous que je vous aide à détailler une de ces étapes ?',
        'financement': 'Pour le financement de votre projet, vous avez plusieurs options au Maroc :\n\n🏦 **Microcrédits** : Al Amana, Fondation Zakoura\n💳 **Prêts bancaires** : Crédit Agricole, Attijariwafa Bank\n🤝 **Partenariats** : Recherchez des investisseurs locaux\n📱 **Crowdfunding** : Plateformes marocaines\n\nQuel type de projet souhaitez-vous financer ?',
        'ventes': 'Pour augmenter vos ventes, voici des stratégies efficaces :\n\n📱 **Réseaux sociaux** : Instagram, Facebook, TikTok\n👥 **Relations clients** : Créez une communauté fidèle\n🎯 **Qualité** : Différenciez-vous par l\'excellence\n💡 **Innovation** : Proposez des solutions uniques\n\nOù vendez-vous actuellement vos produits/services ?',
        'gestion': 'La gestion est cruciale pour la réussite ! Voici les points clés :\n\n📊 **Suivi financier** : Tenez un cahier de comptes rigoureux\n⏰ **Organisation** : Planifiez vos activités quotidiennes\n👥 **Équipe** : Développez vos compétences de leadership\n📈 **Stratégie** : Fixez des objectifs SMART\n\nQuel aspect de la gestion vous pose le plus de difficultés ?',
        'formation': 'Formation continue = succès garanti ! Voici vos options :\n\n📚 **Formations gratuites** : WIB Academy, programmes gouvernementaux\n🎤 **Webinaires** : Événements WIB réguliers\n👩‍🏫 **Mentorat** : Programme de parrainage WIB\n📱 **Ressources** : Applications et outils digitaux\n\nDans quel domaine souhaitez-vous vous perfectionner ?',
        'general': 'Bonjour ! Je suis là pour vous accompagner dans votre parcours entrepreneurial. Comment puis-je vous aider aujourd\'hui ? 🌟'
      },
      ar: {
        'مشروع': 'سؤال ممتاز! لبدء مشروعك، إليك الخطوات الأساسية:\n\n🚀 **حددي فكرتك**: وضحي مفهومك والقيمة المضافة\n📊 **دراسة السوق**: حللي المنافسة وحددي جمهورك\n💵 **الخطة المالية**: احسبي التكاليف وتوقعي الإيرادات\n🏦 **التمويل**: استكشفي القروض الصغيرة ومنح WIB\n\nهل تريدين مساعدة في تفصيل إحدى هذه الخطوات؟',
        'تمويل': 'لتمويل مشروعك، لديك عدة خيارات في المغرب:\n\n🏦 **القروض الصغيرة**: الأمانة، مؤسسة زاكورة\n💳 **القروض البنكية**: كريديت أجريكول، التجاري وفا بنك\n🤝 **الشراكات**: ابحثي عن مستثمرين محليين\n📱 **التمويل الجماعي**: منصات مغربية\n\nما نوع المشروع الذي تريدين تمويله؟',
        'مبيعات': 'لزيادة مبيعاتك، إليك استراتيجيات فعالة:\n\n📱 **وسائل التواصل**: إنستغرام، فيسبوك، تيك توك\n👥 **علاقات العملاء**: أنشئي مجتمعاً مخلصاً\n🎯 **الجودة**: تميزي بالتميز\n💡 **الابتكار**: قدموا حلولاً فريدة\n\nأين تبيعين منتجاتك/خدماتك حالياً؟',
        'إدارة': 'الإدارة حاسمة للنجاح! إليك النقاط الرئيسية:\n\n📊 **المتابعة المالية**: احتفظي بدفتر حسابات دقيق\n⏰ **التنظيم**: خططي لأنشطتك اليومية\n👥 **الفريق**: طوري مهارات القيادة\n📈 **الاستراتيجية**: حددي أهداف SMART\n\nما جانب الإدارة الذي يواجهك أكبر صعوبة؟',
        'تعليم': 'التعلم المستمر = نجاح مضمون! إليك خياراتك:\n\n📚 **دورات مجانية**: أكاديمية WIB، برامج حكومية\n🎤 **ندوات**: أحداث WIB المنتظمة\n👩‍🏫 **الإرشاد**: برنامج التوجيه WIB\n📱 **الموارد**: تطبيقات وأدوات رقمية\n\nفي أي مجال تريدين التطوير؟',
        'general': 'مرحبا! أنا هنا لمساعدتك في رحلتك الريادية. كيف يمكنني مساعدتك اليوم؟ 🌟'
      },
      darija: {
        'مشروع': 'سؤال ممتاز! باش تبدي مشروعك، هادي الخطوات الأساسية:\n\n🚀 **حددي فكرتك**: وضحي مفهومك والقيمة المضافة\n📊 **دراسة السوق**: حللي المنافسة وحددي جمهورك\n💵 **الخطة المالية**: احسبي التكاليف وتوقعي الإيرادات\n🏦 **التمويل**: استكشفي القروض الصغيرة ومنح WIB\n\nبغيتي مساعدة في تفصيل وحدة من هاد الخطوات؟',
        'تمويل': 'لتمويل مشروعك، عندك عدة خيارات في المغرب:\n\n🏦 **القروض الصغيرة**: الأمانة، مؤسسة زاكورة\n💳 **القروض البنكية**: كريديت أجريكول، التجاري وفا بنك\n🤝 **الشراكات**: ابحثي عن مستثمرين محليين\n📱 **التمويل الجماعي**: منصات مغربية\n\nشنو نوع المشروع لي بغيتي تمويله؟',
        'مبيعات': 'لزيادة مبيعاتك، هادي استراتيجيات فعالة:\n\n📱 **وسائل التواصل**: إنستغرام، فيسبوك، تيك توك\n👥 **علاقات العملاء**: أنشئي مجتمعاً مخلصاً\n🎯 **الجودة**: تميزي بالتميز\n💡 **الابتكار**: قدموا حلولاً فريدة\n\nفين كتبيعي منتجاتك/خدماتك حالياً؟',
        'إدارة': 'الإدارة حاسمة للنجاح! هادي النقاط الرئيسية:\n\n📊 **المتابعة المالية**: احتفظي بدفتر حسابات دقيق\n⏰ **التنظيم**: خططي لأنشطتك اليومية\n👥 **الفريق**: طوري مهارات القيادة\n📈 **الاستراتيجية**: حددي أهداف SMART\n\nشنو جانب الإدارة لي كيواجهك أكبر صعوبة؟',
        'تعليم': 'التعلم المستمر = نجاح مضمون! هادي خياراتك:\n\n📚 **دورات مجانية**: أكاديمية WIB، برامج حكومية\n🎤 **ندوات**: أحداث WIB المنتظمة\n👩‍🏫 **الإرشاد**: برنامج التوجيه WIB\n📱 **الموارد**: تطبيقات وأدوات رقمية\n\nفي شنو مجال بغيتي التطوير؟',
        'general': 'مرحبا! أنا هنا باش نخدمك في رحلتك الريادية. كيفاش نقدر نخدمك اليوم؟ 🌟'
      }
    };

    // Détecter le type de question
    const messageLower = userMessage.toLowerCase();
    let responseType = 'general';

    if (messageLower.includes('projet') || messageLower.includes('مشروع')) {
      responseType = 'projet';
    } else if (messageLower.includes('financement') || messageLower.includes('تمويل')) {
      responseType = 'financement';
    } else if (messageLower.includes('ventes') || messageLower.includes('مبيعات')) {
      responseType = 'ventes';
    } else if (messageLower.includes('gestion') || messageLower.includes('إدارة')) {
      responseType = 'gestion';
    } else if (messageLower.includes('formation') || messageLower.includes('تعليم')) {
      responseType = 'formation';
    }

    const responses = fallbackResponses[language];
    const response = responses[responseType] || responses['general'];

    console.log('Fallback response type:', responseType);
    console.log('Fallback response length:', response.length);

    return {
      text: response,
      confidence: 0.7,
      suggestions: this.generateSuggestions(userMessage, language)
    };
  }

  private generateSuggestions(userMessage: string, language: Language): string[] {
    // Suggestions contextuelles selon le type de question
    const messageLower = userMessage.toLowerCase();
    
    // Détecter le contexte pour des suggestions plus pertinentes
    let context = 'general';
    
    if (messageLower.includes('projet') || messageLower.includes('مشروع') || messageLower.includes('business')) {
      context = 'projet';
    } else if (messageLower.includes('financement') || messageLower.includes('تمويل') || messageLower.includes('argent') || messageLower.includes('قرض')) {
      context = 'financement';
    } else if (messageLower.includes('ventes') || messageLower.includes('مبيعات') || messageLower.includes('client') || messageLower.includes('عملاء')) {
      context = 'ventes';
    } else if (messageLower.includes('gestion') || messageLower.includes('إدارة') || messageLower.includes('comptabilité') || messageLower.includes('محاسبة')) {
      context = 'gestion';
    } else if (messageLower.includes('formation') || messageLower.includes('تعليم') || messageLower.includes('apprendre') || messageLower.includes('تعلم')) {
      context = 'formation';
    } else if (messageLower.includes('marketing') || messageLower.includes('promotion') || messageLower.includes('إعلان')) {
      context = 'marketing';
    } else if (messageLower.includes('légal') || messageLower.includes('droit') || messageLower.includes('قانوني')) {
      context = 'legal';
    }

    const suggestionsByContext = {
      fr: {
        general: [
          '🚀 Comment créer un business plan ?',
          '💰 Quels sont les financements disponibles ?',
          '📊 Comment gérer ma comptabilité ?',
          '👥 Comment développer ma clientèle ?'
        ],
        projet: [
          '📋 Comment faire une étude de marché ?',
          '🎯 Comment définir ma proposition de valeur ?',
          '📈 Comment calculer mes coûts de démarrage ?',
          '🏢 Comment choisir ma forme juridique ?'
        ],
        financement: [
          '🏦 Quels microcrédits pour les femmes ?',
          '💳 Comment obtenir un prêt bancaire ?',
          '🤝 Comment trouver des investisseurs ?',
          '📱 Quelles plateformes de crowdfunding ?'
        ],
        ventes: [
          '📱 Comment vendre sur les réseaux sociaux ?',
          '🛒 Comment créer une boutique en ligne ?',
          '🎯 Comment fidéliser mes clients ?',
          '📈 Comment augmenter mes ventes ?'
        ],
        gestion: [
          '📊 Quels outils de comptabilité utiliser ?',
          '⏰ Comment organiser mon temps efficacement ?',
          '👥 Comment gérer mon équipe ?',
          '📋 Comment créer des processus ?'
        ],
        formation: [
          '📚 Quelles formations gratuites WIB ?',
          '🎤 Comment participer aux webinaires ?',
          '👩‍🏫 Comment trouver un mentor ?',
          '📱 Quelles applications pour apprendre ?'
        ],
        marketing: [
          '📱 Comment faire du marketing digital ?',
          '🎨 Comment créer une identité de marque ?',
          '📢 Comment faire de la publicité locale ?',
          '🤝 Comment faire du networking ?'
        ],
        legal: [
          '📄 Quelles démarches administratives ?',
          '🏢 Comment créer mon entreprise ?',
          '📋 Quels documents légaux nécessaires ?',
          '⚖️ Comment protéger ma propriété intellectuelle ?'
        ]
      },
      ar: {
        general: [
          '🚀 كيف أنشئ خطة عمل؟',
          '💰 ما التمويلات المتاحة؟',
          '📊 كيف أدير محاسبتي؟',
          '👥 كيف أطور عملائي؟'
        ],
        projet: [
          '📋 كيف أعمل دراسة سوق؟',
          '🎯 كيف أحدد قيمتي المضافة؟',
          '📈 كيف أحسب تكاليف البداية؟',
          '🏢 كيف أختار الشكل القانوني؟'
        ],
        financement: [
          '🏦 ما القروض الصغيرة للنساء؟',
          '💳 كيف أحصل على قرض بنكي؟',
          '🤝 كيف أجد مستثمرين؟',
          '📱 ما منصات التمويل الجماعي؟'
        ],
        ventes: [
          '📱 كيف أبيع على وسائل التواصل؟',
          '🛒 كيف أنشئ متجر إلكتروني؟',
          '🎯 كيف أحافظ على عملائي؟',
          '📈 كيف أزيد مبيعاتي؟'
        ],
        gestion: [
          '📊 ما أدوات المحاسبة؟',
          '⏰ كيف أنظم وقتي؟',
          '👥 كيف أدير فريقي؟',
          '📋 كيف أنشئ إجراءات؟'
        ],
        formation: [
          '📚 ما الدورات المجانية WIB؟',
          '🎤 كيف أشارك في الندوات؟',
          '👩‍🏫 كيف أجد مرشداً؟',
          '📱 ما التطبيقات للتعلم؟'
        ],
        marketing: [
          '📱 كيف أعمل تسويق رقمي؟',
          '🎨 كيف أنشئ هوية علامة؟',
          '📢 كيف أعمل إعلانات محلية؟',
          '🤝 كيف أعمل شبكة علاقات؟'
        ],
        legal: [
          '📄 ما الإجراءات الإدارية؟',
          '🏢 كيف أنشئ شركتي؟',
          '📋 ما المستندات القانونية؟',
          '⚖️ كيف أحمي ملكيتي الفكرية؟'
        ]
      },
      darija: [
        '🚀 كيفاش نخلق خطة عمل؟',
        '💰 شنو التمويلات المتاحة؟',
        '📊 كيفاش ندير محاسبتي؟',
        '👥 كيفاش نطور عملائي؟'
      ]
    };

    const suggestions = suggestionsByContext[language];
    if (suggestions && typeof suggestions === 'object' && 'general' in suggestions) {
      const typedSuggestions = suggestions as Record<string, string[]>;
      if (typedSuggestions[context]) {
        return typedSuggestions[context];
      }
      return typedSuggestions.general;
    }
    
    // Fallback pour darija et autres langues
    return suggestionsByContext.fr.general;
  }

  // Analyser le sentiment du message utilisateur
  analyzeSentiment(message: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['merci', 'super', 'génial', 'excellent', 'parfait', 'aide', 'conseil'];
    const negativeWords = ['problème', 'difficile', 'compliqué', 'stress', 'inquiet', 'perdu'];
    
    const messageLower = message.toLowerCase();
    const positiveCount = positiveWords.filter(word => messageLower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => messageLower.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}

export const aiService = new AIService(); 