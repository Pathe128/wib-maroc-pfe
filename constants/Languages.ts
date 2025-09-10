export type Language = 'fr' | 'ar' | 'darija';

export interface Translations {
  welcome: string;
  subtitle: string;
  
  // Modules
  coachWIB: string;
  bourse: string;
  bourseSubtitle: string;
  argent: string;
  argentSubtitle: string;
  idee: string;
  ideeSubtitle: string;
  idee_prompt: string;
  idee_error: string;
  idee_describe: string;
  idee_placeholder: string;
  idee_send: string;
  idee_summary: string;
  idee_suggestions: string;
  parcours: string;
  parcoursSubtitle: string;
  radio: string;
  radioSubtitle: string;
  communaute: string;
  communauteSubtitle: string;
  enfants: string;
  enfantsSubtitle: string;
  demarches: string;
  demarchesSubtitle: string;
  seminaire: string;
  seminaireSubtitle: string;
  history_credits: string;
  followed_trainings: string;
  progress_badges: string;
  
  // Coach WIB
  coachTitle: string;
  coachSubtitle: string;
  onlineStatus: string;
  quickQuestions: string;
  typeMessage: string;
  send: string;
  
  // Authentification
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  enterEmail: string;
  enterPassword: string;
  createAccount: string;
  createAccountSubtitle: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  signInToContinue: string;
  continue: string;
  verify: string;
  verifyYourEmail: string;
  verificationCode: string;
  verificationCodeSent: string;
  didntReceiveCode: string;
  resendCode: string;
  allFieldsRequired: string;
  signInError: string;
  signUpError: string;
  verificationCodeRequired: string;
  verificationFailed: string;
  verificationError: string;
  
  // Questions rapides
  howStartProject: string;
  financingSolutions: string;
  increaseSales: string;
  managementProblem: string;
  wantLearnMore: string;
  niveau_facile: string;
  niveau_moyen: string;
  niveau_difficile: string;
  niveau_inconnu: string;
  commenter: string;
  partager: string;
  enfants_jeux_title: string;
  enfants_jeux_subtitle: string;
  enfants_recits_title: string;
  enfants_add_recit: string;
  enfants_tab_jeux: string;
  enfants_tab_recits: string;
  statut_en_cours: string;
  statut_valide: string;
  statut_refuse: string;
  statut_termine: string;
  statut_inconnu: string;
  demarches_new_section_title: string;
  demarches_media_section_title: string;
  demarches_media_button_stop: string;
  demarches_media_button_record: string;
  demarches_media_button_take_photo: string;
  demarches_media_preview_title: string;
  demarches_media_preview_no_recording: string;
  demarches_media_preview_no_photo: string;
  demarches_suivi_section_title: string;
  demarches_tab_nouveau: string;
  demarches_tab_suivi: string;
  tab_live: string;
  tab_replay: string;
  modal_format_video: string;
  modal_format_audio: string;
  modal_duration: string;
  modal_participants: string;
  modal_action_subscribe: string;
  modal_action_pause: string;
  modal_action_listen: string;
  modal_action_close: string;
  niveau: string;
  score: string;
  jouer: string;
  fermer: string;
  home: string;
  discovery: string;
  profile: string;
  support: string;
  wib: string;
  theme: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    welcome: 'WIB Maroc',
    subtitle: 'Entreprendre, s\'entraider, réussir',
    
    // Modules
    coachWIB: 'Mon Coach WIB',
    bourse: 'Bourse des Opportunités',
    bourseSubtitle: 'Découvrez les marchés, conseils et opportunités solidaires',
    argent: 'Mon Espace Argent',
    argentSubtitle: 'Gérez vos finances personnelles et professionnelles',
    idee: 'J\'ai une Idée !',
    ideeSubtitle: 'Décrivez, résumez et développez vos idées innovantes',
    idee_prompt: "Décris ton idée ici...",
    idee_error: "Une erreur est survenue. Veuillez réessayer.",
    idee_describe: "Décris ton idée",
    idee_placeholder: "Tapez votre idée...",
    idee_send: "Envoyer",
    idee_summary: "Résumé de l'IA",
    idee_suggestions: "Suggestions de l'IA",
    parcours: 'Mon Parcours WIB',
    parcoursSubtitle: 'Suivez vos formations, crédits et badges de progrès',
    radio: 'Radio WIB',
    radioSubtitle: 'Podcasts, témoignages et capsules éducatives',
    communaute: 'Ma Communauté',
    communauteSubtitle: 'Échangez, entraidez-vous et partagez vos expériences',
    enfants: 'Espace Enfants',
    enfantsSubtitle: 'Jeux, récits et apprentissage pour les plus jeunes',
    demarches: 'Mes Démarches Simplifiées',
    demarchesSubtitle: 'Gérez, suivez et simplifiez toutes vos démarches',
    seminaire: 'Séminaires',
    seminaireSubtitle: 'Formations et ateliers en présentiel et en ligne',
    history_credits: 'Historique des crédits',
    followed_trainings: 'Formations suivies',
    progress_badges: 'Badges de progrès',
    
    // Coach WIB
    coachTitle: 'Coach WIB',
    coachSubtitle: 'Posez vos questions à notre assistant virtuel',
    onlineStatus: 'En ligne',
    quickQuestions: 'Questions rapides',
    typeMessage: 'Tapez votre message...',
    send: 'Envoyer',
    
    // Authentification
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    signOut: 'Déconnexion',
    email: 'Email',
    password: 'Mot de passe',
    enterEmail: 'Entrez votre email',
    enterPassword: 'Entrez votre mot de passe',
    createAccount: 'Créer un compte',
    createAccountSubtitle: 'Créez votre compte pour accéder à toutes les fonctionnalités',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    dontHaveAccount: 'Vous n\'avez pas de compte ? ',
    signInToContinue: 'Connectez-vous pour continuer',
    continue: 'Continuer',
    verify: 'Vérifier',
    verifyYourEmail: 'Vérifiez votre email',
    verificationCode: 'Code de vérification',
    verificationCodeSent: 'Un code de vérification a été envoyé à',
    didntReceiveCode: 'Vous n\'avez pas reçu de code ?',
    resendCode: 'Renvoyer le code',
    allFieldsRequired: 'Tous les champs sont requis',
    signInError: 'Identifiants incorrects. Veuillez réessayer.',
    signUpError: 'Une erreur est survenue lors de l\'inscription',
    verificationCodeRequired: 'Le code de vérification est requis',
    verificationFailed: 'La vérification a échoué',
    verificationError: 'Une erreur est survenue lors de la vérification',
    
    // Questions rapides
    howStartProject: 'Comment démarrer mon projet ?',
    financingSolutions: 'Quelles solutions de financement ?',
    increaseSales: 'Comment augmenter mes ventes ?',
    managementProblem: 'J\'ai un problème de gestion',
    wantLearnMore: 'Je veux en savoir plus',
    niveau_facile: 'Facile',
    niveau_moyen: 'Moyen',
    niveau_difficile: 'Difficile',
    niveau_inconnu: 'Inconnu',
    commenter: 'Commenter',
    partager: 'Partager',
    enfants_jeux_title: 'Mini-Jeux Métiers',
    enfants_jeux_subtitle: 'Apprends en t\'amusant !',
    enfants_recits_title: 'Récits des Enfants',
    enfants_add_recit: 'Ajouter mon récit',
    enfants_tab_jeux: 'Mini-Jeux',
    enfants_tab_recits: 'Récits',
    statut_en_cours: 'En cours',
    statut_valide: 'Validé',
    statut_refuse: 'Refusé',
    statut_termine: 'Terminé',
    statut_inconnu: 'Inconnu',
    demarches_new_section_title: 'Nouvelle Démarche',
    demarches_media_section_title: 'Dépôt Audio + Photo',
    demarches_media_button_stop: 'Arrêter',
    demarches_media_button_record: 'Enregistrer',
    demarches_media_button_take_photo: 'Prendre Photo',
    demarches_media_preview_title: 'Aperçu',
    demarches_media_preview_no_recording: 'Aucun enregistrement',
    demarches_media_preview_no_photo: 'Aucune photo',
    demarches_suivi_section_title: 'Suivi des Démarches',
    demarches_tab_nouveau: 'Nouveau',
    demarches_tab_suivi: 'Suivi',
    tab_live: 'En direct',
    tab_replay: 'Replay',
    modal_format_video: 'Vidéo',
    modal_format_audio: 'Audio',
    modal_duration: 'Durée',
    modal_participants: 'Participants',
    modal_action_subscribe: 'S\'inscrire',
    modal_action_pause: 'Mettre en pause',
    modal_action_listen: 'Écouter',
    modal_action_close: 'Fermer',
    niveau: 'Niveau',
    score: 'Score',
    jouer: 'Jouer',
    fermer: 'Fermer',
    home: 'Accueil',
    discovery: 'Découverte',
    profile: 'Profil',
    support: 'Support',
    wib: 'WIB',
    theme: 'Thème'
  },
  
  ar: {
    welcome: 'WIB المغرب',
    subtitle: 'مقاولة، تآزر، نجاح',
    
    // Modules
    coachWIB: 'مدربي WIB',
    bourse: 'بورصة الفرص',
    bourseSubtitle: 'اكتشف الأسواق والنصائح والفرص التضامنية',
    argent: 'مساحة أموالي',
    argentSubtitle: 'تدبير أموالك الشخصية والمهنية',
    idee: 'لدي فكرة !',
    ideeSubtitle: 'وصف، تلخيص وتطوير أفكارك المبتكرة',
    idee_prompt: "وصف الفكرة هنا...",
    idee_error: "حدث خطأ. حاول مرة أخرى.",
    idee_describe: "وصف الفكرة",
    idee_placeholder: "اكتب فكرتك...",
    idee_send: "إرسال",
    idee_summary: "ملخص الذكاء الاصطناعي",
    idee_suggestions: "اقتراحات الذكاء الاصطناعي",
    parcours: 'مساري WIB',
    parcoursSubtitle: 'تابع تكويناتك، قروضك وشارات التقدم',
    radio: 'راديو WIB',
    radioSubtitle: 'بودكاست، شهادات وكبسولات تعليمية',
    communaute: 'مجتمعي',
    communauteSubtitle: 'تبادل، تعاون وشارك تجاربك',
    enfants: 'فضاء الأطفال',
    enfantsSubtitle: 'ألعاب، قصص وتعلم للأطفال',
    demarches: 'مساراتي المبسطة',
    demarchesSubtitle: 'سجل، تابع وبسط جميع إجراءاتك',
    seminaire: 'الندوات',
    seminaireSubtitle: 'تكوينات وورشات عمل حضوريا وعن بعد',
    history_credits: 'سجل القروض',
    followed_trainings: 'التكوينات المتبعة',
    progress_badges: 'شارات التقدم',
    
    // Coach WIB
    coachTitle: 'مدرب WIB',
    coachSubtitle: 'اطرح أسئلتك على مساعدنا الافتراضي',
    onlineStatus: 'متصل',
    quickQuestions: 'أسئلة سريعة',
    typeMessage: 'اكتب رسالتك...',
    send: 'إرسال',
    
    // Authentification
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    enterEmail: 'أدخل بريدك الإلكتروني',
    enterPassword: 'أدخل كلمة المرور',
    createAccount: 'إنشاء حساب',
    createAccountSubtitle: 'أنشئ حسابك للوصول إلى جميع الميزات',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    dontHaveAccount: 'ليس لديك حساب؟ ',
    signInToContinue: 'سجل الدخول للمتابعة',
    continue: 'متابعة',
    verify: 'تحقق',
    verifyYourEmail: 'تحقق من بريدك الإلكتروني',
    verificationCode: 'رمز التحقق',
    verificationCodeSent: 'تم إرسال رمز تحقق إلى',
    didntReceiveCode: 'لم تستلم الرمز؟',
    resendCode: 'إعادة إرسال الرمز',
    allFieldsRequired: 'جميع الحقول مطلوبة',
    signInError: 'بيانات الاعتماد غير صحيحة. يرجى المحاولة مرة أخرى.',
    signUpError: 'حدث خطأ أثناء إنشاء الحساب',
    verificationCodeRequired: 'رمز التحقق مطلوب',
    verificationFailed: 'فشل التحقق',
    verificationError: 'حدث خطأ أثناء التحقق',
    
    // Questions rapides
    howStartProject: 'كيف أبدأ مشروعاً؟',
    financingSolutions: 'ما حلول التمويل؟',
    increaseSales: 'كيف أزيد المبيعات؟',
    managementProblem: 'لدي مشكلة في الإدارة',
    wantLearnMore: 'أريد التعلم أكثر',
    niveau_facile: 'سهل',
    niveau_moyen: 'متوسط',
    niveau_difficile: 'صعب',
    niveau_inconnu: 'غير معروف',
    commenter: 'تعليق',
    partager: 'مشاركة',
    enfants_jeux_title: 'ألعاب المهن',
    enfants_jeux_subtitle: 'تعلم واستمتع!',
    enfants_recits_title: 'قصص الأطفال',
    enfants_add_recit: 'أضف قصتك',
    enfants_tab_jeux: 'الألعاب',
    enfants_tab_recits: 'القصص',
    statut_en_cours: 'قيد الإنجاز',
    statut_valide: 'تم التحقق',
    statut_refuse: 'مرفوض',
    statut_termine: 'منتهي',
    statut_inconnu: 'غير معروف',
    demarches_new_section_title: 'إجراء جديد',
    demarches_media_section_title: 'تسجيل صوتي + صورة',
    demarches_media_button_stop: 'إيقاف',
    demarches_media_button_record: 'تسجيل',
    demarches_media_button_take_photo: 'التقاط صورة',
    demarches_media_preview_title: 'معاينة',
    demarches_media_preview_no_recording: 'لا يوجد تسجيل',
    demarches_media_preview_no_photo: 'لا توجد صورة',
    demarches_suivi_section_title: 'متابعة الملفات',
    demarches_tab_nouveau: 'جديد',
    demarches_tab_suivi: 'متابعة',
    tab_live: 'مباشر',
    tab_replay: 'إعادة',
    modal_format_video: 'فيديو',
    modal_format_audio: 'صوتي',
    modal_duration: 'المدة',
    modal_participants: 'المشاركون',
    modal_action_subscribe: 'سجل',
    modal_action_pause: 'إيقاف مؤقت',
    modal_action_listen: 'استمع',
    modal_action_close: 'إغلاق',
    niveau: 'المستوى',
    score: 'النقاط',
    jouer: 'لعب',
    fermer: 'إغلاق',
    home: 'الرئيسية',
    discovery: 'اكتشاف',
    profile: 'الملف الشخصي',
    support: 'الدعم',
    wib: 'واي آي بي',
    theme: 'السمة'
  },
  
  darija: {
    welcome: 'WIB Maghrib',
    subtitle: 'Mouqawala, Taaoun, Najah',
    
    // Modules
    coachWIB: 'Moaddi WIB',
    bourse: 'Boursa dyal l-forsat',
    bourseSubtitle: 'T3araf 3la l-aswaq, nsa2i7 o forsat t3aouniya',
    argent: 'Lflous dyali',
    argentSubtitle: 'Dber floussak shakhsyan o mihniyan',
    idee: '3endi fikra!',
    ideeSubtitle: 'Sif, khlls o wesser 3la fkrat jdidad',
    idee_prompt: 'Sif fikrtk hna...',
    idee_error: 'Kan 3endna moshkil. 3awed jawbek',
    idee_describe: 'Sif fikrtk',
    idee_placeholder: 'Kteb fikrtk...',
    idee_send: 'Sifft',
    idee_summary: 'Khulasa dyal l-dhakira',
    idee_suggestions: 'Iqtira7at l-dhakira',
    parcours: 'Massa7i WIB dyali',
    parcoursSubtitle: 'Qaddem t-takwinat, l-qoroud o sh-sharat dyal t-taqaddom',
    radio: 'Radio WIB',
    radioSubtitle: 'Podcast, shahadat o qonat ta3limiya',
    communaute: 'Jama3ti',
    communauteSubtitle: 'Tabadal, t3awen o sharek tajribatk',
    enfants: 'Espace dyal d-dar',
    enfantsSubtitle: 'L3ab, hikayat o ta3allom l-sghar',
    demarches: 'Masa2iri l-mobasata',
    demarchesSubtitle: 'Sahl, qaddem o naddim jami3 masa2irk',
    seminaire: 'Nadawat',
    seminaireSubtitle: 'Takwinat o warshat 7odouriyan o 3an bu3d',
    history_credits: 'Archiya dyal l-qoroud',
    followed_trainings: 'T-takwinat lli qaddam fihom',
    progress_badges: 'Sharat t-taqaddom',
    
    // Coach WIB
    coachTitle: 'Moaddi WIB',
    coachSubtitle: 'Tl3b as2ilatk 3la l-mosa3id l-afra9i dyalk',
    onlineStatus: 'Online',
    quickQuestions: 'As2ila sari3a',
    typeMessage: 'Kteb risalak...',
    send: 'Sifft',
    
    // Authentification
    signIn: 'Dkhel l7esab dyalk',
    signUp: 'Sajel l7esab dyalk',
    signOut: 'Kherrej',
    email: 'Email',
    password: 'Mot de passe',
    enterEmail: 'Kteb email dyalk',
    enterPassword: 'Kteb mot de passe dyalk',
    createAccount: 'Sajel l7esab dyalk',
    createAccountSubtitle: 'Sajel l7esab dyalk bach t9der tst3mr koulchi',
    alreadyHaveAccount: '3andek 7esab qbel?',
    dontHaveAccount: 'Makaynch 3ndek 7esab? ',
    signInToContinue: 'Dkhel bach tkemmel',
    continue: 'Kamal',
    verify: 'T7eqqeq',
    verifyYourEmail: 'T7eqqeq email dyalk',
    verificationCode: 'Code dyal t-t7qiq',
    verificationCodeSent: 'Ttbe3 lik code dyal t-t7qiq l',
    didntReceiveCode: 'Mazalek wselk l-code?',
    resendCode: 'A3awed a3ti l-code',
    allFieldsRequired: 'Koulchi m7taj',
    signInError: 'L-email wla mot de passe ghalat. 3awed jareb.',
    signUpError: 'Kan 3endna moshkil f l-inscription',
    verificationCodeRequired: 'Code dyal t-t7qiq m7taj',
    verificationFailed: 'Ma t7aqqash',
    verificationError: 'Kan 3endna moshkil f t-t7qiq',
    
    // Questions rapides
    howStartProject: 'Kifach nbdach moshkli?',
    financingSolutions: 'Ashno howa l-7all dyal t-tamwil?',
    increaseSales: 'Kifach nzid men l-mbia3?',
    managementProblem: '3endi moshkil f-tadbir',
    wantLearnMore: 'Bghit n3rf bzzaf',
    niveau_facile: 'Sahil',
    niveau_moyen: 'Moteawet',
    niveau_difficile: 'S3ib',
    niveau_inconnu: 'Mashi ma3rouf',
    commenter: '3ti raik',
    partager: 'Sharek',
    enfants_jeux_title: 'L3ab l-mihan sghar',
    enfants_jeux_subtitle: 'T3allam w nta katl3b!',
    enfants_recits_title: 'Hikayat dyal d-dar',
    enfants_add_recit: 'Zid hikayti',
    enfants_tab_jeux: 'L3ab',
    enfants_tab_recits: 'Hikayat',
    statut_en_cours: 'F-l-hal',
    statut_valide: 'Tasdiq',
    statut_refuse: 'Radd',
    statut_termine: 'Temma',
    statut_inconnu: 'Mashi ma3rouf',
    demarches_new_section_title: 'Massar jdid',
    demarches_media_section_title: 'Tl3 s-sawt o s-sura',
    demarches_media_button_stop: 'Wqef',
    demarches_media_button_record: 'Sajel',
    demarches_media_button_take_photo: 'Khud s-sura',
    demarches_media_preview_title: 'Aar',
    demarches_media_preview_no_recording: 'Mafih walo msajal',
    demarches_media_preview_no_photo: 'Mafih walo s-sura',
    demarches_suivi_section_title: 'T-taqqadom dyal l-masari3',
    demarches_tab_nouveau: 'Jdid',
    demarches_tab_suivi: 'T-taqqadom',
    tab_live: 'Khawi',
    tab_replay: 'A3awed',
    modal_format_video: 'Video',
    modal_format_audio: 'Sawt',
    modal_duration: 'L-muda',
    modal_participants: 'L-moshtarakin',
    modal_action_subscribe: 'Sajel',
    modal_action_pause: 'Wqef shwiya',
    modal_action_listen: 'Sma3',
    modal_action_close: 'Sedd',
    niveau: 'L-mustawa',
    score: 'N-nuqat',
    jouer: 'L3eb',
    fermer: 'Sedd',
    home: 'Safiha ra2isya',
    discovery: 'L-iktishaf',
    profile: 'L-profil',
    support: 'L-musaa3ada',
    wib: 'WIB',
    theme: 'L-mada'
  }
};