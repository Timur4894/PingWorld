import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import GradientButton from './GradientButton';
import { HapticTouchableOpacity } from './HapticTouchableOpacity';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, scaleSize } from '../utils/scaling';
import { triggerHaptic } from '../utils/hapticFeedback';

interface EULAModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const EULAModal: React.FC<EULAModalProps> = ({
  visible,
  onClose,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom && !hasScrolled) {
      setHasScrolled(true);
      triggerHaptic('light');
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
          <View style={styles.header}>
            <Text style={styles.title}>Terms of Service & User Agreement</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={true}
          >
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.text}>
              By using PingWorld, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this application.
            </Text>

            <Text style={styles.sectionTitle}>2. Zero Tolerance Policy</Text>
            <Text style={styles.text}>
              PingWorld has a ZERO TOLERANCE policy for objectionable content and abusive users. This includes, but is not limited to:
            </Text>
            <Text style={styles.bulletPoint}>
              • Harassment, bullying, or threatening behavior{'\n'}
              • Hate speech, discrimination, or offensive language{'\n'}
              • Inappropriate, explicit, or adult content{'\n'}
              • Spam, scams, or fraudulent activities{'\n'}
              • Impersonation or false representation{'\n'}
              • Any content that violates applicable laws
            </Text>

            <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
            <Text style={styles.text}>
              You are responsible for all content you share and interactions you have within the application. You agree to:
            </Text>
            <Text style={styles.bulletPoint}>
              • Use the service in a lawful and respectful manner{'\n'}
              • Respect the rights and dignity of other users{'\n'}
              • Report any objectionable content or abusive behavior immediately{'\n'}
              • Not share personal information that could compromise your safety
            </Text>

            <Text style={styles.sectionTitle}>4. Content Moderation</Text>
            <Text style={styles.text}>
              Our moderation team reviews all reports within 24 hours. When objectionable content is confirmed:
            </Text>
            <Text style={styles.bulletPoint}>
              • The offending content will be immediately removed{'\n'}
              • The user who provided the content will be permanently banned{'\n'}
              • Appropriate legal action may be taken if necessary
            </Text>

            <Text style={styles.sectionTitle}>5. Blocking Users</Text>
            <Text style={styles.text}>
              You have the right to block any user who engages in abusive behavior. Blocked users will not be able to contact you or see your profile. You can manage your blocked users list in your settings.
            </Text>

            <Text style={styles.sectionTitle}>6. Reporting Abuse</Text>
            <Text style={styles.text}>
              If you encounter objectionable content or abusive behavior, please report it immediately using the report feature. All reports are taken seriously and reviewed promptly.
            </Text>

            <Text style={styles.sectionTitle}>7. Account Termination</Text>
            <Text style={styles.text}>
              We reserve the right to terminate or suspend your account immediately, without prior notice, if you violate these terms or engage in any prohibited activities.
            </Text>

            <Text style={styles.sectionTitle}>8. Privacy and Safety</Text>
            <Text style={styles.text}>
              Your privacy and safety are our top priorities. We encourage you to use the blocking and reporting features to maintain a safe environment. Never share sensitive personal information with other users.
            </Text>

            <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
            <Text style={styles.text}>
              We may update these terms from time to time. Continued use of the application after changes constitutes acceptance of the new terms.
            </Text>

            <Text style={styles.sectionTitle}>10. Contact</Text>
            <Text style={styles.text}>
              If you have questions about these terms or need to report a serious issue, please contact our support team through the application.
            </Text>

            <View style={styles.acknowledgment}>
              <Text style={styles.acknowledgmentText}>
                By clicking "I Accept", you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Zero Tolerance Policy for objectionable content and abusive users.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
           
            {/* <View style={styles.acceptButtonContainer}> */}
              <GradientButton
                title="Ok"
                onPress={() => onClose()}
                disabled={!hasScrolled}
                styleBtn={{ width: '100%' }}
              />
            {/* </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scalePadding(20),
  },
  modalContainer: {
    width: getWidthPercentage(90),
    maxHeight: '85%',
    backgroundColor: Colors.cardBackground,
    borderRadius: scaleBorderRadius(25),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  header: {
    padding: scalePadding(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: '60%',
  },
  scrollContent: {
    padding: scalePadding(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    color: Colors.textAccent,
    marginTop: scaleMargin(16),
    marginBottom: scaleMargin(8),
  },
  text: {
    fontSize: moderateScale(14),
    fontFamily: 'DynaPuff',
    color: Colors.textSecondary,
    lineHeight: scaleSize(20),
    marginBottom: scaleMargin(12),
  },
  bulletPoint: {
    fontSize: moderateScale(14),
    fontFamily: 'DynaPuff',
    color: Colors.textSecondary,
    lineHeight: scaleSize(20),
    marginLeft: scaleMargin(12),
    marginBottom: scaleMargin(12),
  },
  acknowledgment: {
    backgroundColor: Colors.backgroundSettings,
    padding: scalePadding(16),
    borderRadius: scaleBorderRadius(15),
    marginTop: scaleMargin(20),
    marginBottom: scaleMargin(10),
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  acknowledgmentText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: scaleSize(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: scalePadding(16),
    gap: scaleMargin(12),
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  declineButton: {
    width: '40%',
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    borderRadius: scaleBorderRadius(25),
    backgroundColor: Colors.backgroundSettings,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textError,
    fontWeight: '600',
  },
  acceptButtonContainer: {
    flex: 1,
    borderRadius: scaleBorderRadius(25),
    overflow: 'hidden',
  },
});

export default EULAModal;

