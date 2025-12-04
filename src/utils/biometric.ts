import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

export interface BiometricType {
    isAvailable: boolean;
    biometricType: 'fingerprint' | 'faceId' | 'iris' | 'none';
    supportedTypes: LocalAuthentication.AuthenticationType[];
}

/**
 * Check if biometric authentication is available on the device
 */
export const checkBiometricAvailability = async (): Promise<BiometricType> => {
    try {
        const compatible = await LocalAuthentication.hasHardwareAsync();

        if (!compatible) {
            return {
                isAvailable: false,
                biometricType: 'none',
                supportedTypes: [],
            };
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();

        if (!enrolled) {
            return {
                isAvailable: false,
                biometricType: 'none',
                supportedTypes: [],
            };
        }

        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

        let biometricType: 'fingerprint' | 'faceId' | 'iris' | 'none' = 'none';

        if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
            biometricType = 'faceId';
        } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            biometricType = 'fingerprint';
        } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
            biometricType = 'iris';
        }

        return {
            isAvailable: true,
            biometricType,
            supportedTypes,
        };
    } catch (error) {
        console.error('Error checking biometric availability:', error);
        return {
            isAvailable: false,
            biometricType: 'none',
            supportedTypes: [],
        };
    }
};

/**
 * Authenticate user using biometrics
 */
export const authenticateWithBiometrics = async (): Promise<{
    success: boolean;
    error?: string;
}> => {
    try {
        const biometricCheck = await checkBiometricAvailability();

        if (!biometricCheck.isAvailable) {
            return {
                success: false,
                error: 'Biometric authentication is not available on this device',
            };
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to sign in',
            fallbackLabel: 'Use passcode',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        });

        if (result.success) {
            return { success: true };
        } else {
            return {
                success: false,
                error: result.error || 'Authentication failed',
            };
        }
    } catch (error) {
        console.error('Biometric authentication error:', error);
        return {
            success: false,
            error: 'An error occurred during authentication',
        };
    }
};

/**
 * Get biometric icon name based on type
 */
export const getBiometricIcon = (biometricType: string): string => {
    switch (biometricType) {
        case 'faceId':
            return 'face-recognition';
        case 'fingerprint':
            return 'fingerprint';
        case 'iris':
            return 'eye-outline';
        default:
            return 'shield-lock';
    }
};

/**
 * Get biometric display name
 */
export const getBiometricDisplayName = (biometricType: string): string => {
    switch (biometricType) {
        case 'faceId':
            return Platform.OS === 'ios' ? 'Face ID' : 'Face Recognition';
        case 'fingerprint':
            return 'Fingerprint';
        case 'iris':
            return 'Iris Scanner';
        default:
            return 'Biometric';
    }
};
