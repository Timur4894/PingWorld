import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { HapticTouchableOpacity } from './HapticTouchableOpacity';
import { Colors } from '../constants/colors';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, getHeightPercentage, scaleSize } from '../utils/scaling';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Poland', flag: '🇵🇱' },
  { code: 'ru', name: 'Russia', flag: '🇷🇺' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'ke', name: 'Kenya', flag: '🇰🇪' },
  { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
  { code: 'il', name: 'Israel', flag: '🇮🇱' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'ch', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'at', name: 'Austria', flag: '🇦🇹' },
  { code: 'be', name: 'Belgium', flag: '🇧🇪' },
  { code: 'se', name: 'Sweden', flag: '🇸🇪' },
  { code: 'no', name: 'Norway', flag: '🇳🇴' },
  { code: 'dk', name: 'Denmark', flag: '🇩🇰' },
  { code: 'fi', name: 'Finland', flag: '🇫🇮' },
  { code: 'ie', name: 'Ireland', flag: '🇮🇪' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'gr', name: 'Greece', flag: '🇬🇷' },
  { code: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'hu', name: 'Hungary', flag: '🇭🇺' },
  { code: 'ro', name: 'Romania', flag: '🇷🇴' },
  { code: 'ua', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'by', name: 'Belarus', flag: '🇧🇾' },
  { code: 'kz', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'cl', name: 'Chile', flag: '🇨🇱' },
  { code: 'co', name: 'Colombia', flag: '🇨🇴' },
  { code: 'pe', name: 'Peru', flag: '🇵🇪' },
  { code: 've', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'lk', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'np', name: 'Nepal', flag: '🇳🇵' },
  { code: 'mm', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'kh', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'la', name: 'Laos', flag: '🇱🇦' },
  { code: 'tw', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'mo', name: 'Macau', flag: '🇲🇴' },
  { code: 'dz', name: 'Algeria', flag: '🇩🇿' },
  { code: 'ma', name: 'Morocco', flag: '🇲🇦' },
  { code: 'tn', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'gh', name: 'Ghana', flag: '🇬🇭' },
  { code: 'et', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'tz', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'ug', name: 'Uganda', flag: '🇺🇬' },
  { code: 'zw', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'ao', name: 'Angola', flag: '🇦🇴' },
  { code: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'ir', name: 'Iran', flag: '🇮🇷' },
  { code: 'iq', name: 'Iraq', flag: '🇮🇶' },
  { code: 'jo', name: 'Jordan', flag: '🇯🇴' },
  { code: 'lb', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'sy', name: 'Syria', flag: '🇸🇾' },
  { code: 'ye', name: 'Yemen', flag: '🇾🇪' },
  { code: 'om', name: 'Oman', flag: '🇴🇲' },
  { code: 'kw', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'qa', name: 'Qatar', flag: '🇶🇦' },
  { code: 'bh', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'is', name: 'Iceland', flag: '🇮🇸' },
  { code: 'lu', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'mt', name: 'Malta', flag: '🇲🇹' },
  { code: 'cy', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'ee', name: 'Estonia', flag: '🇪🇪' },
  { code: 'lv', name: 'Latvia', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'sk', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'si', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'hr', name: 'Croatia', flag: '🇭🇷' },
  { code: 'rs', name: 'Serbia', flag: '🇷🇸' },
  { code: 'bg', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'al', name: 'Albania', flag: '🇦🇱' },
  { code: 'mk', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'me', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'xk', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'md', name: 'Moldova', flag: '🇲🇩' },
  { code: 'ge', name: 'Georgia', flag: '🇬🇪' },
  { code: 'am', name: 'Armenia', flag: '🇦🇲' },
  { code: 'az', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'tm', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'tj', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'kg', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'mn', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'af', name: 'Afghanistan', flag: '🇦🇫' },
].sort((a, b) => a.name.localeCompare(b.name));

interface CountryPickerModalProps {
  visible: boolean;
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  selectedCountry,
  onSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = COUNTRIES.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(COUNTRIES);
    }
  }, [searchQuery]);

  const handleSelect = (country: Country) => {
    onSelect(country);
    onClose();
    setSearchQuery('');
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <HapticTouchableOpacity
      style={[
        styles.countryItem,
        selectedCountry?.code === item.code && styles.selectedCountryItem,
      ]}
      onPress={() => handleSelect(item)}
      activeOpacity={0.7}
      hapticType="light"
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      {selectedCountry?.code === item.code && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </HapticTouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <HapticTouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1}
        onPress={onClose}
        hapticType="light"
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Country</Text>
            <HapticTouchableOpacity onPress={onClose} style={styles.closeButton} hapticType="light">
              <Text style={styles.closeButtonText}>✕</Text>
            </HapticTouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search country..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        </View>
      </HapticTouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: scaleBorderRadius(25),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    width: getWidthPercentage(90),
    height: getHeightPercentage(70),
    maxHeight: getHeightPercentage(80),
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scalePadding(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  closeButton: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleBorderRadius(16),
    backgroundColor: Colors.backgroundSettings,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: moderateScale(20),
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: scalePadding(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  searchInput: {
    backgroundColor: Colors.backgroundSettings,
    borderRadius: scaleBorderRadius(20),
    paddingVertical: scalePadding(12),
    paddingHorizontal: scalePadding(16),
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: scalePadding(20),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  selectedCountryItem: {
    backgroundColor: Colors.backgroundSettings,
  },
  flag: {
    fontSize: moderateScale(32),
    marginRight: scaleMargin(16),
  },
  countryName: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  checkmark: {
    fontSize: moderateScale(20),
    color: Colors.accent,
    fontWeight: 'bold',
  },
});

export default CountryPickerModal;
export type { Country };

