import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Colors } from '../constants/colors';
import GradientButton from './GradientButton';
import { triggerHaptic } from '../utils/hapticFeedback';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, scaleSize } from '../utils/scaling';

export type ModalType = 'error' | 'success' | 'info' | 'warning';

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  type = 'info',
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getTypeColor = () => {
    switch (type) {
      case 'error':
        return Colors.textError;
      case 'success':
        return Colors.accent;
      case 'warning':
        return '#FFA500';
      default:
        return Colors.textAccent;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={[styles.title, { color: getTypeColor() }]}>
              {title}
            </Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            {showCancel && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  triggerHaptic('light');
                  onClose();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <View style={[styles.confirmButtonContainer, showCancel && styles.confirmButtonWithCancel]}>
              <GradientButton
                title={confirmText}
                styleBtn={{width: getWidthPercentage(30), alignSelf: 'center'}}
                onPress={handleConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scalePadding(20),
  },
  modalContainer: {
    width: getWidthPercentage(85),
    backgroundColor: Colors.cardBackground,
    borderRadius: scaleBorderRadius(25),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  content: {
    padding: scalePadding(24),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    marginBottom: scaleMargin(12),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: scaleSize(22),
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: scalePadding(16),
    gap: scaleMargin(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    borderRadius: scaleBorderRadius(25),
    backgroundColor: Colors.backgroundSettings,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  confirmButtonContainer: {
    flex: 1,
    borderRadius: scaleBorderRadius(25),
    overflow: 'hidden',
  },
  confirmButtonTouchable: {
    flex: 1,
  },
  confirmButtonGradient: {
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonWithCancel: {
    flex: 1,
  },
  confirmButtonText: {
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

export default CustomModal;

