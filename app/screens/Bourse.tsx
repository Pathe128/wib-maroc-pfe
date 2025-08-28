import { useLanguage } from '@/constants/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';

const { width } = Dimensions.get('window');

interface StockData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

interface InvestmentTip {
  id: string;
  title: string;
  description: string;
  category: string;
  risk: 'low' | 'medium' | 'high';
  icon: string;
}

interface SolidarityMarket {
  id: string;
  businessName: string;
  owner: string;
  category: string;
  location: string;
  distance: string;
  rating: number;
  description: string;
  products: string[];
  contact: string;
  isVerified: boolean;
  solidarityScore: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export default function Bourse() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('market');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [investmentTips, setInvestmentTips] = useState<InvestmentTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation d'entrée
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

    // Données boursières simulées
    const mockStockData: StockData[] = [
      {
        id: '1',
        name: 'Attijariwafa Bank',
        symbol: 'ATW',
        price: 45.20,
        change: 0.85,
        changePercent: 1.92,
        volume: '2.3M',
        marketCap: '45.2B MAD',
        sector: 'Banque'
      },
      {
        id: '2',
        name: 'Maroc Telecom',
        symbol: 'IAM',
        price: 89.50,
        change: -1.20,
        changePercent: -1.32,
        volume: '1.8M',
        marketCap: '89.5B MAD',
        sector: 'Télécommunications'
      },
      {
        id: '3',
        name: 'Label\'Vie',
        symbol: 'LBV',
        price: 125.80,
        change: 2.15,
        changePercent: 1.74,
        volume: '950K',
        marketCap: '12.6B MAD',
        sector: 'Distribution'
      },
      {
        id: '4',
        name: 'Alliances',
        symbol: 'ALW',
        price: 34.60,
        change: 0.40,
        changePercent: 1.17,
        volume: '1.2M',
        marketCap: '34.6B MAD',
        sector: 'Assurance'
      },
      {
        id: '5',
        name: 'CIH Bank',
        symbol: 'CIH',
        price: 28.90,
        change: -0.30,
        changePercent: -1.03,
        volume: '800K',
        marketCap: '28.9B MAD',
        sector: 'Banque'
      }
    ];

    // Conseils d'investissement
    const mockInvestmentTips: InvestmentTip[] = [
      {
        id: '1',
        title: language === 'fr' ? 'Diversification du portefeuille' : 'تنويع المحفظة',
        description: language === 'fr' 
          ? 'Répartissez vos investissements entre différents secteurs pour réduire les risques.'
          : 'وزع استثماراتك بين قطاعات مختلفة لتقليل المخاطر.',
        category: language === 'fr' ? 'Stratégie' : 'استراتيجية',
        risk: 'low',
        icon: '📊'
      },
      {
        id: '2',
        title: language === 'fr' ? 'Investissement long terme' : 'استثمار طويل المدى',
        description: language === 'fr'
          ? 'Privilégiez les investissements sur 5-10 ans pour maximiser les rendements.'
          : 'فضل الاستثمارات لمدة 5-10 سنوات لتعظيم العوائد.',
        category: language === 'fr' ? 'Horizon' : 'أفق',
        risk: 'medium',
        icon: '⏰'
      },
      {
        id: '3',
        title: language === 'fr' ? 'Actions bancaires marocaines' : 'الأسهم المصرفية المغربية',
        description: language === 'fr'
          ? 'Les banques marocaines offrent des dividendes stables et une croissance régulière.'
          : 'تقدم البنوك المغربية أرباحاً ثابتة ونمواً منتظماً.',
        category: language === 'fr' ? 'Secteur' : 'قطاع',
        risk: 'low',
        icon: '🏦'
      },
      {
        id: '4',
        title: language === 'fr' ? 'Fonds d\'investissement' : 'صناديق الاستثمار',
        description: language === 'fr'
          ? 'Les fonds permettent d\'investir avec un capital réduit et une gestion professionnelle.'
          : 'تسمح الصناديق بالاستثمار برأس مال محدود وإدارة مهنية.',
        category: language === 'fr' ? 'Produit' : 'منتج',
        risk: 'medium',
        icon: '💼'
      },
      {
        id: '5',
        title: language === 'fr' ? 'Suivi des indicateurs' : 'متابعة المؤشرات',
        description: language === 'fr'
          ? 'Surveillez les indicateurs économiques pour anticiper les mouvements de marché.'
          : 'راقب المؤشرات الاقتصادية للتنبؤ بحركات السوق.',
        category: language === 'fr' ? 'Analyse' : 'تحليل',
        risk: 'low',
        icon: '📈'
      }
    ];

    setStockData(mockStockData);
    setInvestmentTips(mockInvestmentTips);
    setIsLoading(false);
  }, [language]);

  const renderStockItem = ({ item }: { item: StockData }) => (
    <Animated.View style={[styles.stockCard, { opacity: fadeAnim }]}>
      <View style={styles.stockHeader}>
        <View style={styles.stockInfo}>
          <Text style={styles.stockName}>{item.name}</Text>
          <Text style={styles.stockSymbol}>{item.symbol}</Text>
          <Text style={styles.stockSector}>{item.sector}</Text>
        </View>
        <View style={styles.stockPrice}>
          <Text style={styles.priceText}>{item.price.toFixed(2)} MAD</Text>
          <View style={[
            styles.changeContainer,
            { backgroundColor: item.change >= 0 ? '#e8f5e8' : '#ffe8e8' }
          ]}>
            <Text style={[
              styles.changeText,
              { color: item.change >= 0 ? '#2e7d32' : '#d32f2f' }
            ]}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.stockDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Volume</Text>
          <Text style={styles.detailValue}>{item.volume}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Capitalisation</Text>
          <Text style={styles.detailValue}>{item.marketCap}</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderInvestmentTip = ({ item }: { item: InvestmentTip }) => (
    <Animated.View style={[styles.tipCard, { opacity: fadeAnim }]}>
      <View style={styles.tipHeader}>
        <Text style={styles.tipIcon}>{item.icon}</Text>
        <View style={styles.tipInfo}>
          <Text style={styles.tipTitle}>{item.title}</Text>
          <Text style={styles.tipCategory}>{item.category}</Text>
        </View>
        <View style={[
          styles.riskBadge,
          { backgroundColor: item.risk === 'low' ? '#e8f5e8' : item.risk === 'medium' ? '#fff3e0' : '#ffe8e8' }
        ]}>
          <Text style={[
            styles.riskText,
            { color: item.risk === 'low' ? '#2e7d32' : item.risk === 'medium' ? '#f57c00' : '#d32f2f' }
          ]}>
            {item.risk === 'low' ? 'Faible' : item.risk === 'medium' ? 'Moyen' : 'Élevé'}
          </Text>
        </View>
      </View>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </Animated.View>
  );

  const renderSolidarityMarket = ({ item }: { item: SolidarityMarket }) => (
    <Animated.View style={[styles.solidarityCard, { opacity: fadeAnim }]}>
      <View style={styles.solidarityHeader}>
        <View style={styles.solidarityInfo}>
          <View style={styles.businessNameRow}>
            <Text style={styles.businessName}>{item.businessName}</Text>
            {item.isVerified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <Text style={styles.ownerName}>{item.owner}</Text>
          <Text style={styles.businessCategory}>{item.category}</Text>
        </View>
        <View style={styles.solidarityScore}>
          <Text style={styles.scoreText}>{item.solidarityScore}</Text>
          <Text style={styles.scoreLabel}>
            {language === 'fr' ? 'Score Solidarité' : 'درجة التضامن'}
          </Text>
        </View>
      </View>
      
      <View style={styles.locationRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <Text style={styles.distanceText}>{item.distance}</Text>
      </View>
      
      <Text style={styles.businessDescription}>{item.description}</Text>
      
      <View style={styles.productsContainer}>
        <Text style={styles.productsLabel}>
          {language === 'fr' ? 'Produits/Services:' : 'المنتجات/الخدمات:'}
        </Text>
        <View style={styles.productsList}>
          {item.products.map((product, index) => (
            <View key={index} style={styles.productTag}>
              <Text style={styles.productText}>{product}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.contactRow}>
        <Text style={styles.contactIcon}>📞</Text>
        <Text style={styles.contactText}>{item.contact}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </Animated.View>
  );

  const tabs = [
    { key: 'market', title: language === 'fr' ? 'Marché' : 'السوق', icon: '📊' },
    { key: 'tips', title: language === 'fr' ? 'Conseils' : 'نصائح', icon: '💡' },
    { key: 'news', title: language === 'fr' ? 'Actualités' : 'أخبار', icon: '📰' }
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Flèche de retour */}
        {/* Header animé */}
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={[styles.header, { paddingTop: 64, paddingVertical: 32 }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 2 }}>
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 8 }}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t('bourse')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('bourseSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <View style={styles.tabContent}>
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabTitle, selectedTab === tab.key && styles.activeTabTitle]}>
                  {tab.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'market' && (
            <View>
              <Text style={styles.sectionTitle}>
                {language === 'fr' ? 'Principales Actions Marocaines' : 'الأسهم المغربية الرئيسية'}
              </Text>
              <FlatList
                data={stockData}
                renderItem={renderStockItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {selectedTab === 'tips' && (
            <View>
              <Text style={styles.sectionTitle}>
                {language === 'fr' ? 'Conseils d\'Investissement' : 'نصائح الاستثمار'}
              </Text>
              <FlatList
                data={investmentTips}
                renderItem={renderInvestmentTip}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {selectedTab === 'news' && (
            <View>
              <Text style={styles.sectionTitle}>
                {language === 'fr' ? 'Actualités Boursières' : 'أخبار البورصة'}
              </Text>
              <View style={styles.newsCard}>
                <Text style={styles.newsTitle}>
                  {language === 'fr' ? 'Marché marocain en hausse' : 'السوق المغربي في ارتفاع'}
                </Text>
                <Text style={styles.newsDate}>15 Janvier 2024</Text>
                <Text style={styles.newsContent}>
                  {language === 'fr' 
                    ? 'L\'indice MASI a progressé de 2.3% cette semaine, porté par les valeurs bancaires et les télécommunications.'
                    : 'ارتفع مؤشر MASI بنسبة 2.3% هذا الأسبوع، مدعوماً بالقطاع المصرفي والاتصالات.'
                  }
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: COLORS.primary + '20',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeTabTitle: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 16,
  },
  stockCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  stockSymbol: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  stockSector: {
    fontSize: 12,
    color: '#999',
  },
  stockPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  changeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipInfo: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  tipCategory: {
    fontSize: 12,
    color: '#666',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  solidaritySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  solidarityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  solidarityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  solidarityInfo: {
    flex: 1,
  },
  businessNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  verifiedBadge: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  ownerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  businessCategory: {
    fontSize: 12,
    color: '#999',
  },
  solidarityScore: {
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  businessDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  productsContainer: {
    marginBottom: 12,
  },
  productsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  productsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productTag: {
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  productText: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#f57c00',
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  sortButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  activeSortButton: {
    backgroundColor: COLORS.secondary,
  },
  sortText: {
    fontSize: 12,
    color: '#666',
  },
  activeSortText: {
    color: '#fff',
    fontWeight: '600',
  },
  locationButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 