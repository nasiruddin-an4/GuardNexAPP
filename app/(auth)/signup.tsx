import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
    name?: string;
    email?: string;
    password?: string;
}

export default function SignUpScreen() {
    const router = useRouter();
    const { setUser, completeOnboarding } = useApp();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async () => {
        if (!validateForm()) {
            return;
        }

        if (!agreedToTerms) {
            alert('Please agree to the Terms and Conditions');
            return;
        }

        setIsLoading(true);

        setTimeout(async () => {
            await setUser({
                id: `user_${Date.now()}`,
                name: name.trim(),
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
                                    Sign up
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
                                    Welcome to us,
                                </Text>
                                <Text style={{ fontSize: 16, color: '#666666', marginBottom: 40 }}>
                                    Hello there, create New account
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
                                        {/* Phone Icon */}
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
                                            <MaterialCommunityIcons name="account-group" size={50} color="#ffffff" />
                                        </View>
                                    </View>

                                    {/* Decorative Dots */}
                                    <View style={{ position: 'absolute', top: 20, right: 60, width: 20, height: 20, borderRadius: 10, backgroundColor: '#5B4CCC' }} />
                                    <View style={{ position: 'absolute', top: 60, right: 20, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF6B9D' }} />
                                    <View style={{ position: 'absolute', bottom: 40, right: 30, width: 18, height: 18, borderRadius: 9, backgroundColor: '#4FC3F7' }} />
                                    <View style={{ position: 'absolute', bottom: 60, left: 30, width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFB74D' }} />
                                    <View style={{ position: 'absolute', top: 80, left: 20, width: 16, height: 16, borderRadius: 8, backgroundColor: '#4DD0E1' }} />
                                </View>

                                {/* Name Input */}
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
                                        placeholder="Name"
                                        placeholderTextColor="#BDBDBD"
                                        value={name}
                                        onChangeText={setName}
                                        autoCapitalize="words"
                                    />
                                    {errors.name && (
                                        <Text style={{ fontSize: 12, color: '#FF6B9D', marginTop: 4, marginLeft: 20 }}>
                                            {errors.name}
                                        </Text>
                                    )}
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
                                <View style={{ marginBottom: 24 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderWidth: 1,
                                            borderColor: '#E0E0E0',
                                            borderRadius: 25,
                                            paddingHorizontal: 20,
                                            paddingVertical: 6,
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

                                {/* Terms and Conditions */}
                                <TouchableOpacity
                                    onPress={() => setAgreedToTerms(!agreedToTerms)}
                                    activeOpacity={0.7}
                                    style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 32 }}
                                >
                                    <View
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 6,
                                            borderWidth: 2,
                                            borderColor: agreedToTerms ? '#5B4CCC' : '#E0E0E0',
                                            backgroundColor: agreedToTerms ? '#5B4CCC' : '#ffffff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 12,
                                            marginTop: 2,
                                        }}
                                    >
                                        {agreedToTerms && (
                                            <MaterialCommunityIcons name="check" size={16} color="#ffffff" />
                                        )}
                                    </View>
                                    <Text style={{ fontSize: 14, color: '#666666', flex: 1, lineHeight: 20 }}>
                                        By creating an account your aggree to our{' '}
                                        <Text style={{ color: '#5B4CCC', fontWeight: '600' }}>
                                            Term and Condtions
                                        </Text>
                                    </Text>
                                </TouchableOpacity>

                                {/* Sign Up Button */}
                                <TouchableOpacity
                                    onPress={handleSignUp}
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
                                            {isLoading ? 'Creating Account...' : 'Sign up'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Sign In Link */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#666666' }}>
                                        Have an account?{' '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => router.push('/(auth)/signin' as any)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#5B4CCC' }}>
                                            Sign in
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
