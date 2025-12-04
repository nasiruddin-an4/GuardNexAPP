import { useApp } from '@/src/contexts/AppContext';
import { authenticateWithBiometrics, checkBiometricAvailability } from '@/src/utils/biometric';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface ValidationErrors {
    email?: string;
    password?: string;
}

export default function SignInScreen() {
    const router = useRouter();
    const { setUser, completeOnboarding } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricType, setBiometricType] = useState<'fingerprint' | 'faceId' | 'iris' | 'none'>('none');

    useEffect(() => {
        checkBiometrics();
    }, []);

    const checkBiometrics = async () => {
        const biometricCheck = await checkBiometricAvailability();
        setBiometricAvailable(biometricCheck.isAvailable);
        setBiometricType(biometricCheck.biometricType);
    };

    const handleBiometricLogin = async () => {
        const result = await authenticateWithBiometrics();

        if (result.success) {
            // Simulate successful biometric login
            setIsLoading(true);
            setTimeout(async () => {
                await setUser({
                    id: `user_${Date.now()}`,
                    name: 'User',
                    email: 'user@example.com',
                    language: 'en',
                    hasCompletedOnboarding: true,
                });
                await completeOnboarding();
                setIsLoading(false);
                router.replace('/(tabs)' as any);
            }, 500);
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldBlur = (fieldName: string) => {
        setTouchedFields(prev => new Set(prev).add(fieldName));
        validateForm();
    };

    const handleSignIn = async () => {
        // Mark all fields as touched
        setTouchedFields(new Set(['email', 'password']));

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(async () => {
            const userName = email.split('@')[0] || 'User';
            await setUser({
                id: `user_${Date.now()}`,
                name: userName.charAt(0).toUpperCase() + userName.slice(1),
                email: email.trim(),
                language: 'en',
                hasCompletedOnboarding: true,
            });
            await completeOnboarding();
            setIsLoading(false);
            router.replace('/(tabs)' as any);
        }, 1500);
    };

    const handleSocialLogin = (provider: string) => {
        // Handle social login
        console.log(`Login with ${provider}`);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
            <LinearGradient
                colors={['#1e293b', '#0f172a', '#020617']}
                locations={[0, 0.5, 1]}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingHorizontal: 24,
                            }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={{
                                    marginTop: 8,
                                    marginBottom: 20,
                                    alignSelf: 'flex-start',
                                }}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: 12,
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MaterialCommunityIcons name="arrow-left" size={20} color="#e2e8f0" />
                                </View>
                            </TouchableOpacity>

                            {/* Header Section */}
                            <View style={{ marginBottom: 40, marginTop: 20 }}>
                                {/* Logo/Icon */}
                                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                                    <LinearGradient
                                        colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 24,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#3b82f6',
                                            shadowOffset: { width: 0, height: 8 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 16,
                                            elevation: 10,
                                        }}
                                    >
                                        <MaterialCommunityIcons name="shield-check" size={40} color="#ffffff" />
                                    </LinearGradient>
                                </View>

                                <Text
                                    style={{
                                        fontSize: 36,
                                        fontWeight: 'bold',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        marginBottom: 8,
                                        letterSpacing: -0.5,
                                    }}
                                >
                                    Welcome Back
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#94a3b8',
                                        textAlign: 'center',
                                        lineHeight: 24,
                                    }}
                                >
                                    Sign in to continue protecting your messages
                                </Text>
                            </View>

                            {/* Sign In Form */}
                            <View style={{ gap: 20, marginBottom: 32 }}>
                                {/* Email Input */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#e2e8f0',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Email Address
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 2,
                                            borderColor: errors.email && touchedFields.has('email')
                                                ? '#ef4444'
                                                : emailFocused
                                                    ? '#3b82f6'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: emailFocused ? '#3b82f6' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: emailFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: emailFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="email-outline"
                                            size={22}
                                            color={emailFocused ? '#3b82f6' : '#64748b'}
                                            style={{ marginRight: 12 }}
                                        />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 16,
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}
                                            placeholder="your.email@example.com"
                                            placeholderTextColor="#475569"
                                            value={email}
                                            onChangeText={(text) => {
                                                setEmail(text);
                                                if (errors.email) validateForm();
                                            }}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => {
                                                setEmailFocused(false);
                                                handleFieldBlur('email');
                                            }}
                                        />
                                    </View>
                                    {errors.email && touchedFields.has('email') && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                            <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                            <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                                {errors.email}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Password Input */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#e2e8f0',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Password
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 2,
                                            borderColor: errors.password && touchedFields.has('password')
                                                ? '#ef4444'
                                                : passwordFocused
                                                    ? '#3b82f6'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: passwordFocused ? '#3b82f6' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: passwordFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: passwordFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="lock-outline"
                                            size={22}
                                            color={passwordFocused ? '#3b82f6' : '#64748b'}
                                            style={{ marginRight: 12 }}
                                        />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 16,
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}
                                            placeholder="Enter your password"
                                            placeholderTextColor="#475569"
                                            value={password}
                                            onChangeText={(text) => {
                                                setPassword(text);
                                                if (errors.password) validateForm();
                                            }}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => {
                                                setPasswordFocused(false);
                                                handleFieldBlur('password');
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            activeOpacity={0.7}
                                        >
                                            <MaterialCommunityIcons
                                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={22}
                                                color="#64748b"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password && touchedFields.has('password') && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                            <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                            <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                                {errors.password}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/forgot-password' as any)}
                                    activeOpacity={0.7}
                                    style={{ alignSelf: 'flex-end' }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#3b82f6',
                                        }}
                                    >
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity
                                onPress={handleSignIn}
                                activeOpacity={0.8}
                                disabled={isLoading}
                                style={{ marginBottom: 24 }}
                            >
                                <LinearGradient
                                    colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        paddingVertical: 18,
                                        borderRadius: 16,
                                        shadowColor: '#3b82f6',
                                        shadowOffset: { width: 0, height: 8 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        {isLoading ? (
                                            <Text
                                                style={{
                                                    color: '#ffffff',
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Signing In...
                                            </Text>
                                        ) : (
                                            <>
                                                <Text
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 17,
                                                        fontWeight: 'bold',
                                                        marginRight: 8,
                                                    }}
                                                >
                                                    Sign In
                                                </Text>
                                                <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
                                            </>
                                        )}
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 24,
                                }}
                            >
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                                <Text
                                    style={{
                                        marginHorizontal: 16,
                                        fontSize: 14,
                                        color: '#64748b',
                                        fontWeight: '500',
                                    }}
                                >
                                    Or continue with
                                </Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                            </View>

                            {/* Social Login Buttons */}
                            <View style={{ gap: 12, marginBottom: 32 }}>
                                {/* Google */}
                                <TouchableOpacity
                                    onPress={() => handleSocialLogin('Google')}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            paddingVertical: 16,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MaterialCommunityIcons name="google" size={24} color="#ffffff" />
                                        <Text
                                            style={{
                                                marginLeft: 12,
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: '#ffffff',
                                            }}
                                        >
                                            Continue with Google
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Apple */}
                                <TouchableOpacity
                                    onPress={() => handleSocialLogin('Apple')}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            paddingVertical: 16,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MaterialCommunityIcons name="apple" size={24} color="#ffffff" />
                                        <Text
                                            style={{
                                                marginLeft: 12,
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: '#ffffff',
                                            }}
                                        >
                                            Continue with Apple
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Biometric Login */}
                                {biometricAvailable && (
                                    <TouchableOpacity
                                        onPress={handleBiometricLogin}
                                        activeOpacity={0.7}
                                    >
                                        <LinearGradient
                                            colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={{
                                                borderRadius: 16,
                                                borderWidth: 1,
                                                borderColor: 'rgba(139, 92, 246, 0.3)',
                                                paddingVertical: 16,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                shadowColor: '#8b5cf6',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 8,
                                                elevation: 4,
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name={biometricType === 'faceId' ? 'face-recognition' : 'fingerprint'}
                                                size={24}
                                                color="#ffffff"
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 12,
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                    color: '#ffffff',
                                                }}
                                            >
                                                {biometricType === 'faceId' ? 'Sign in with Face ID' : 'Sign in with Fingerprint'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Sign Up Link */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingBottom: 24,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#94a3b8',
                                    }}
                                >
                                    Don&apos;t have an account?{' '}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/signup' as any)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: '#3b82f6',
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
