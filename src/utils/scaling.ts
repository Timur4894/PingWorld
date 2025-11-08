import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

export { moderateScale };

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const scaleSize = (size: number) => moderateScale(size);
export const scaleHeight = (size: number) => moderateVerticalScale(size);

export const scalePadding = (size: number) => moderateScale(size);
export const scaleMargin = (size: number) => moderateScale(size);

export const scaleImageWidth = (size: number) => moderateScale(size);
export const scaleImageHeight = (size: number) => moderateVerticalScale(size);

export const getScreenWidth = () => SCREEN_WIDTH;
export const getScreenHeight = () => SCREEN_HEIGHT;
export const getWidthPercentage = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const getHeightPercentage = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

export const scaleBorderRadius = (size: number) => moderateScale(size);

