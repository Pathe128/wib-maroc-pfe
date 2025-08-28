export type Language = 'fr' | 'ar' | 'darija';

export interface Translations {
  // Page d'accueil
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
  
  // Navigation
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
    history_credits: 'Historique des crédits',
    followed_trainings: 'Formations suivies',
    progress_badges: 'Badges de progrès',
    radio: 'Radio WIB',
    radioSubtitle: 'Podcasts, témoignages et capsules éducatives',
    communaute: 'Ma Communauté',
    communauteSubtitle: 'Échangez, entraidez-vous et partagez vos expériences',
    enfants: 'Espace Enfants',
    enfantsSubtitle: 'Jeux, récits et apprentissage pour les plus jeunes',
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
    demarches: 'Mes Démarches Simplifiées',
    demarchesSubtitle: 'Gérez, suivez et simplifiez toutes vos démarches',
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
    demarches_suivi_section_title: 'Suivi de vos Dossiers',
    demarches_tab_nouveau: 'Nouvelle',
    demarches_tab_suivi: 'Suivi',
    seminaire: 'Séminaire WIB Live',
    seminaireSubtitle: 'Formations, replays et partages d’expérience en direct',
    tab_live: 'En Direct',
    tab_replay: 'Replays',
    modal_format_video: 'Vidéo',
    modal_format_audio: 'Audio',
    modal_duration: 'Durée',
    modal_participants: 'Participants',
    modal_action_subscribe: 'S\'inscrire',
    modal_action_pause: 'Pause',
    modal_action_listen: 'Écouter',
    modal_action_close: 'Fermer',
    
    coachTitle: 'Coach WIB',
    coachSubtitle: 'Votre mentor personnel',
    onlineStatus: 'En ligne',
    quickQuestions: 'Questions rapides',
    typeMessage: 'Tapez votre message ici...',
    send: 'Envoyer',
    
    howStartProject: 'Comment commencer un projet ?',
    financingSolutions: 'Quelles solutions de financement ?',
    increaseSales: 'Comment augmenter les ventes ?',
    managementProblem: 'J\'ai un problème de gestion',
    wantLearnMore: 'Je veux apprendre plus',
    niveau: 'Niveau',
    score: 'Score',
    jouer: 'Jouer',
    fermer: 'Fermer',
    
    // Navigation
    home: 'Accueil',
    discovery: 'Découverte',
    profile: 'Profil',
    support: 'Support',
    wib: 'WIB',
    theme: 'Thème'
  },
  ar: {
    welcome: 'WIB المغرب',
    subtitle: 'الاستثمار، المساعدة المتبادلة، النجاح',
    
    coachWIB: 'مدربي WIB',
    bourse: 'بورصة الفرص',
    bourseSubtitle: 'اكتشف الأسواق والنصائح والفرص التضامنية',
    argent: 'مساحة أموالي',
    argentSubtitle: 'تدبير أموالك الشخصية والمهنية',
    idee: 'لدي فكرة !',
    ideeSubtitle: 'صف، لخص وطور أفكارك المبتكرة',
    idee_prompt: "صف فكرتك هنا...",
    idee_error: "حدث خطأ. حاول مرة أخرى.",
    idee_describe: "صف فكرتك",
    idee_placeholder: "اكتب فكرتك...",
    idee_send: "إرسال",
    idee_summary: "ملخص الذكاء الاصطناعي",
    idee_suggestions: "اقتراحات الذكاء الاصطناعي",
    parcours: 'مساري WIB',
    parcoursSubtitle: 'تابع تكويناتك، قروضك وشارات التقدم',
    history_credits: 'تاريخ القروض',
    followed_trainings: 'التكوينات المتبعة',
    progress_badges: 'شارات التقدم',
    radio: 'راديو WIB',
    radioSubtitle: 'بودكاست، شهادات وكبسولات تعليمية',
    communaute: 'مجتمعي',
    communauteSubtitle: 'تبادل، تعاون وشارك تجاربك',
    enfants: 'فضاء الأطفال',
    enfantsSubtitle: 'ألعاب، قصص وتعلم للصغار',
    niveau_facile: 'سهل',
    niveau_moyen: 'متوسط',
    niveau_difficile: 'صعب',
    niveau_inconnu: 'غير معروف',
    commenter: 'علق',
    partager: 'شارك',
    enfants_jeux_title: 'ألعاب المهن',
    enfants_jeux_subtitle: 'تعلم واستمتع!',
    enfants_recits_title: 'قصص الأطفال',
    enfants_add_recit: 'أضف قصتك',
    enfants_tab_jeux: 'الألعاب',
    enfants_tab_recits: 'القصص',
    demarches: 'إجراءاتي المبسطة',
    demarchesSubtitle: 'سهل، تابع ونظم جميع إجراءاتك',
    statut_en_cours: 'قيد التنفيذ',
    statut_valide: 'تمت الموافقة',
    statut_refuse: 'مرفوض',
    statut_termine: 'منتهي',
    statut_inconnu: 'غير معروف',
    demarches_new_section_title: 'إجراء جديد',
    demarches_media_section_title: 'تسجيل صوتي + صورة',
    demarches_media_button_stop: 'إيقاف',
    demarches_media_button_record: 'تسجيل',
    demarches_media_button_take_photo: 'التقاط صورة',
    demarches_media_preview_title: 'المعاينة',
    demarches_media_preview_no_recording: 'لا يوجد تسجيل',
    demarches_media_preview_no_photo: 'لا توجد صورة',
    demarches_suivi_section_title: 'متابعة ملفاتك',
    demarches_tab_nouveau: 'جديد',
    demarches_tab_suivi: 'متابعة',
    seminaire: 'ندوة WIB المباشرة',
    seminaireSubtitle: 'تكوينات، إعادة وبث مباشر لتقاسم الخبرات',
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
    
    coachTitle: 'مدرب WIB',
    coachSubtitle: 'مرشدك الشخصي',
    onlineStatus: 'متصل الآن',
    quickQuestions: 'أسئلة سريعة',
    typeMessage: 'اكتب رسالتك هنا...',
    send: 'إرسال',
    
    howStartProject: 'كيف أبدأ مشروعاً؟',
    financingSolutions: 'ما حلول التمويل؟',
    increaseSales: 'كيف أزيد المبيعات؟',
    managementProblem: 'لدي مشكلة في الإدارة',
    wantLearnMore: 'أريد التعلم أكثر',
    niveau: 'المستوى',
    score: 'النقاط',
    jouer: 'اللعب',
    fermer: 'إغلاق',
    
    // Navigation
    home: 'الرئيسية',
    discovery: 'الاستكشاف',
    profile: 'الملف الشخصي',
    support: 'الدعم',
    wib: 'WIB',
    theme: 'المظهر'
  },
  darija: {
    welcome: 'WIB المغرب',
    subtitle: 'نستثمر، نتعاون، ننجح',
    
    coachWIB: 'مدربي WIB',
    bourse: 'بورصة الفرص',
    bourseSubtitle: 'اكتشف الأسواق والنصائح والفرص التضامنية',
    argent: 'مساحة أموالي',
    argentSubtitle: 'دبّر أموالك الشخصية والمهنية',
    idee: 'عندي فكرة !',
    ideeSubtitle: 'وصف، تلخيص وتطوير أفكارك المبتكرة',
    idee_prompt: "وصف الفكرة هنا...",
    idee_error: "وقع خطأ. حاول من جديد.",
    idee_describe: "وصف الفكرة",
    idee_placeholder: "كتب فكرتك...",
    idee_send: "صيفط",
    idee_summary: "ملخص الذكاء الاصطناعي",
    idee_suggestions: "اقتراحات الذكاء الاصطناعي",
    parcours: 'مساري WIB',
    parcoursSubtitle: 'تابع تكويناتك، قروضك وشارات التقدم',
    history_credits: 'تاريخ القروض',
    followed_trainings: 'التكوينات المتبعة',
    progress_badges: 'شارات التقدم',
    radio: 'راديو WIB',
    radioSubtitle: 'بودكاست، شهادات وكبسولات تعليمية',
    communaute: 'مجتمعي',
    communauteSubtitle: 'تبادل، تعاون وشارك تجاربك',
    enfants: 'فضاء الأطفال',
    enfantsSubtitle: 'ألعاب، قصص وتعلم للصغار',
    niveau_facile: 'سهل',
    niveau_moyen: 'متوسط',
    niveau_difficile: 'صعب',
    niveau_inconnu: 'غير معروف',
    commenter: 'علق',
    partager: 'شارك',
    enfants_jeux_title: 'ألعاب المهن',
    enfants_jeux_subtitle: 'تعلم واستمتع!',
    enfants_recits_title: 'قصص الأطفال',
    enfants_add_recit: 'أضف قصتك',
    enfants_tab_jeux: 'الألعاب',
    enfants_tab_recits: 'القصص',
    demarches: 'إجراءاتي المبسطة',
    demarchesSubtitle: 'سهل، تابع ونظم جميع إجراءاتك',
    statut_en_cours: 'قيد التنفيذ',
    statut_valide: 'تمت الموافقة',
    statut_refuse: 'مرفوض',
    statut_termine: 'منتهي',
    statut_inconnu: 'غير معروف',
    demarches_new_section_title: 'إجراء جديد',
    demarches_media_section_title: 'تسجيل صوتي + صورة',
    demarches_media_button_stop: 'إيقاف',
    demarches_media_button_record: 'تسجيل',
    demarches_media_button_take_photo: 'التقاط صورة',
    demarches_media_preview_title: 'المعاينة',
    demarches_media_preview_no_recording: 'لا يوجد تسجيل',
    demarches_media_preview_no_photo: 'لا توجد صورة',
    demarches_suivi_section_title: 'متابعة ملفاتك',
    demarches_tab_nouveau: 'جديد',
    demarches_tab_suivi: 'متابعة',
    seminaire: 'ندوة WIB المباشرة',
    seminaireSubtitle: 'تكوينات، إعادة وبث مباشر لتقاسم الخبرات',
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
    
    coachTitle: 'مدرب WIB',
    coachSubtitle: 'مرشدك الشخصي',
    onlineStatus: 'متصل الآن',
    quickQuestions: 'أسئلة سريعة',
    typeMessage: 'اكتب رسالتك هنا...',
    send: 'إرسال',
    
    howStartProject: 'كيفاش نبدا مشروع؟',
    financingSolutions: 'شنو الحلول ديال التمويل؟',
    increaseSales: 'كيفاش نزيد المبيعات؟',
    managementProblem: 'عندي مشكلة في الإدارة',
    wantLearnMore: 'بغيت نتعلم أكثر',
    niveau: 'المستوى',
    score: 'النقاط',
    jouer: 'اللعب',
    fermer: 'إغلاق',
    
    // Navigation
    home: 'الدار',
    discovery: 'الاكتشاف',
    profile: 'البروفيل',
    support: 'المساعدة',
    wib: 'WIB',
    theme: 'الثيم'
  }
}; 