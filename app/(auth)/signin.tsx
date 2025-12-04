import { useApp } from '@/src/contexts/AppContext';
import { authenticateWithBiometrics, checkBiometricAvailability } from '@/src/utils/biometric';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [biometricAvailable, setBiometricAvailable] = useState(false);

    useEffect(() => {
        checkBiometrics();
    }, []);

    const checkBiometrics = async () => {
        const biometricCheck = await checkBiometricAvailability();
        setBiometricAvailable(biometricCheck.isAvailable);
    };

    const handleBiometricLogin = async () => {
        const result = await authenticateWithBiometrics();

        if (result.success) {
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

    const handleSignIn = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

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

    return (
        <View style={{ flex: 1, backgroundColor: '#5B4CCC' }}>
            <LinearGradient
                colors={['#5B4CCC', '#6B5DD3', '#5B4CCC']}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        {/* Header */}
                        <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    style={{ marginRight: 16 }}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons name="chevron-left" size={32} color="#ffffff" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>
                                    Sign in
                                </Text>
                            </View>
                        </View>

                        <ScrollView
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* White Card Container */}
                            <View
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                    minHeight: '100%',
                                    paddingHorizontal: 24,
                                    paddingTop: 32,
                                    paddingBottom: 40,
                                }}
                            >
                                {/* Welcome Text */}
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#5B4CCC', marginBottom: 8 }}>
                                    Welcome Back
                                </Text>
                                <Text style={{ fontSize: 16, color: '#666666', marginBottom: 40 }}>
                                    Hello there, sign in to continue
                                </Text>

                                {/* Illustration */}
                                <View style={{ alignItems: 'center', marginBottom: 40, position: 'relative' }}>
                                    {/* Background Circle */}
                                    <View
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 100,
                                            backgroundColor: '#E8E4F8',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/* Lock Icon */}
                                        <View
                                            style={{
                                                width: 80,
                                                height: 100,
                                                backgroundColor: '#5B4CCC',
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <MaterialCommunityIcons name="lock" size={50} color="#ffffff" />
                                        </View>
                                    </View>

                                    {/* Decorative Dots */}
                                    <View style={{ position: 'absolute', top: 20, right: 60, width: 20, height: 20, borderRadius: 10, backgroundColor: '#5B4CCC' }} />
                                    <View style={{ position: 'absolute', top: 60, right: 20, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF6B9D' }} />
                                    <View style={{ position: 'absolute', bottom: 40, right: 30, width: 18, height: 18, borderRadius: 9, backgroundColor: '#4FC3F7' }} />
                                    <View style={{ position: 'absolute', bottom: 60, left: 30, width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFB74D' }} />
                                    <View style={{ position: 'absolute', top: 80, left: 20, width: 16, height: 16, borderRadius: 8, backgroundColor: '#4DD0E1' }} />
                                </View>

                                {/* Email Input */}
                                <View style={{ marginBottom: 16 }}>
                                    <TextInput
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderWidth: 1,
                                            borderColor: '#E0E0E0',
                                            borderRadius: 25,
                                            paddingHorizontal: 20,
                                            paddingVertical: 16,
                                            fontSize: 16,
                                            color: '#333333',
                                        }}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#BDBDBD"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <Text style={{ fontSize: 12, color: '#FF6B9D', marginTop: 4, marginLeft: 20 }}>
                                            {errors.email}
                                        </Text>
                                    )}
                                </View>

                                {/* Password Input */}
                                <View style={{ marginBottom: 8 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderWidth: 1,
                                            borderColor: '#E0E0E0',
                                            borderRadius: 25,
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                fontSize: 16,
                                                color: '#333333',
                                            }}
                                            placeholder="Password"
                                            placeholderTextColor="#BDBDBD"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            activeOpacity={0.7}
                                        >
                                            <MaterialCommunityIcons
                                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={22}
                                                color="#BDBDBD"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password && (
                                        <Text style={{ fontSize: 12, color: '#FF6B9D', marginTop: 4, marginLeft: 20 }}>
                                            {errors.password}
                                        </Text>
                                    )}
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/forgot-password' as any)}
                                    activeOpacity={0.7}
                                    style={{ alignSelf: 'flex-end', marginBottom: 32 }}
                                >
                                    <Text style={{ fontSize: 14, color: '#BDBDBD' }}>
                                        Forgot your password ?
                                    </Text>
                                </TouchableOpacity>

                                {/* Sign In Button */}
                                <TouchableOpacity
                                    onPress={handleSignIn}
                                    activeOpacity={0.8}
                                    disabled={isLoading}
                                    style={{ marginBottom: 32 }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: '#E8E4F8',
                                            borderRadius: 25,
                                            paddingVertical: 16,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#5B4CCC' }}>
                                            {isLoading ? 'Signing in...' : 'Sign in'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Biometric Login */}
                                {biometricAvailable && (
                                    <TouchableOpacity
                                        onPress={handleBiometricLogin}
                                        activeOpacity={0.7}
                                        style={{ alignItems: 'center', marginBottom: 32 }}
                                    >
                                        <View
                                            style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 40,
                                                backgroundColor: '#ffffff',
                                                borderWidth: 3,
                                                borderColor: '#5B4CCC',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <MaterialCommunityIcons name="fingerprint" size={48} color="#5B4CCC" />
                                        </View>
                                    </TouchableOpacity>
                                )}

                                {/* Sign Up Link */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#666666' }}>
                                        Don&apos;t have an account?{' '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => router.push('/(auth)/signup' as any)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5B4CCC' }}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
