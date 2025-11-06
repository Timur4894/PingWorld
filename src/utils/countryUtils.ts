import { Country } from '../components/CountryPickerModal';

// Список стран из CountryPickerModal
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
];

/**
 * Получает флаг страны по коду
 * @param countryCode - код страны (например, 'us', 'gb')
 * @returns флаг страны или null, если страна не найдена
 */
export const getCountryFlag = (countryCode: string | null | undefined): string | null => {
  if (!countryCode) return null;
  
  const country = COUNTRIES.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
  return country ? country.flag : null;
};

/**
 * Получает название страны по коду
 * @param countryCode - код страны (например, 'us', 'gb')
 * @returns название страны или null, если страна не найдена
 */
export const getCountryName = (countryCode: string | null | undefined): string | null => {
  if (!countryCode) return null;
  
  const country = COUNTRIES.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
  return country ? country.name : null;
};

/**
 * Получает полную информацию о стране по коду
 * @param countryCode - код страны (например, 'us', 'gb')
 * @returns объект Country или null, если страна не найдена
 */
export const getCountry = (countryCode: string | null | undefined): Country | null => {
  if (!countryCode) return null;
  
  const country = COUNTRIES.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
  return country || null;
};

