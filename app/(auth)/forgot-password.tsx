import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        setError('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setEmailSent(true);
        }, 1500);
    };

    if (emailSent) {
        return (
            <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
                <LinearGradient
                    colors={['#1e293b', '#0f172a', '#020617']}
                    locations={[0, 0.5, 1]}
                    style={{ flex: 1 }}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 24,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {/* Success Icon */}
                            <View style={{ alignItems: 'center', marginBottom: 32 }}>
                                <LinearGradient
                                    colors={['#10b981', '#059669', '#047857']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 60,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        shadowColor: '#10b981',
                                        shadowOffset: { width: 0, height: 12 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 20,
                                        elevation: 12,
                                    }}
                                >
                                    <MaterialCommunityIcons name="email-check" size={56} color="#ffffff" />
                                </LinearGradient>
                            </View>

                            {/* Success Message */}
                            <Text
                                style={{
                                    fontSize: 32,
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    marginBottom: 12,
                                    letterSpacing: -0.5,
                                }}
                            >
                                Check Your Email
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#94a3b8',
                                    textAlign: 'center',
                                    lineHeight: 24,
                                    marginBottom: 8,
                                    paddingHorizontal: 20,
                                }}
                            >
                                We've sent password reset instructions to
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#10b981',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    marginBottom: 40,
                                }}
                            >
                                {email}
                            </Text>

                            {/* Info Box */}
                            <View
                                style={{
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: 'rgba(59, 130, 246, 0.2)',
                                    padding: 16,
                                    marginBottom: 32,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <MaterialCommunityIcons
                                        name="information"
                                        size={20}
                                        color="#3b82f6"
                                        style={{ marginRight: 12, marginTop: 2 }}
                                    />
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontSize: 14,
                                            color: '#94a3b8',
                                            lineHeight: 20,
                                        }}
                                    >
                                        Didn't receive the email? Check your spam folder or try again in a few minutes.
                                    </Text>
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View style={{ width: '100%', gap: 12 }}>
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/signin' as any)}
                                    activeOpacity={0.8}
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
                                            <Text
                                                style={{
                                                    color: '#ffffff',
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    marginRight: 8,
                                                }}
                                            >
                                                Back to Sign In
                                            </Text>
                                            <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setEmailSent(false)}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            paddingVertical: 16,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: '#94a3b8',
                                                fontSize: 16,
                                                fontWeight: '600',
                                            }}
                                        >
                                            Resend Email
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </View>
        );
    }

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
                            <View style={{ marginBottom: 40, marginTop: 40 }}>
                                {/* Logo/Icon */}
                                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                                    <LinearGradient
                                        colors={['#f59e0b', '#d97706', '#b45309']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#f59e0b',
                                            shadowOffset: { width: 0, height: 8 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 16,
                                            elevation: 10,
                                        }}
                                    >
                                        <MaterialCommunityIcons name="lock-reset" size={48} color="#ffffff" />
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
                                    Forgot Password?
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#94a3b8',
                                        textAlign: 'center',
                                        lineHeight: 24,
                                        paddingHorizontal: 20,
                                    }}
                                >
                                    No worries! Enter your email and we'll send you reset instructions
                                </Text>
                            </View>

                            {/* Email Input */}
                            <View style={{ marginBottom: 32 }}>
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
                                        borderColor: error
                                            ? '#ef4444'
                                            : emailFocused
                                                ? '#f59e0b'
                                                : 'rgba(255, 255, 255, 0.1)',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 16,
                                        shadowColor: emailFocused ? '#f59e0b' : '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: emailFocused ? 0.3 : 0.1,
                                        shadowRadius: 8,
                                        elevation: emailFocused ? 4 : 2,
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="email-outline"
                                        size={22}
                                        color={emailFocused ? '#f59e0b' : '#64748b'}
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
                                            setError('');
                                        }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>
                                {error && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                        <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                        <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                            {error}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Reset Password Button */}
                            <TouchableOpacity
                                onPress={handleResetPassword}
                                activeOpacity={0.8}
                                disabled={isLoading}
                                style={{ marginBottom: 24 }}
                            >
                                <LinearGradient
                                    colors={['#f59e0b', '#d97706', '#b45309']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        paddingVertical: 18,
                                        borderRadius: 16,
                                        shadowColor: '#f59e0b',
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
                                                Sending...
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
                                                    Send Reset Link
                                                </Text>
                                                <MaterialCommunityIcons name="send" size={20} color="#ffffff" />
                                            </>
                                        )}
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Back to Sign In */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingBottom: 24,
                                }}
                            >
                                <MaterialCommunityIcons name="arrow-left" size={18} color="#94a3b8" />
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/signin' as any)}
                                    activeOpacity={0.7}
                                    style={{ marginLeft: 8 }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '600',
                                            color: '#3b82f6',
                                        }}
                                    >
                                        Back to Sign In
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
