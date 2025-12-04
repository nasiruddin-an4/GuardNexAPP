import { useApp } from '@/src/contexts/AppContext';
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

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function SignUpScreen() {
    const router = useRouter();
    const { setUser, completeOnboarding } = useApp();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    // Focus states
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        return password.length >= 8;
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
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldBlur = (fieldName: string) => {
        setTouchedFields(prev => new Set(prev).add(fieldName));
        validateForm();
    };

    const handleSignUp = async () => {
        // Mark all fields as touched
        setTouchedFields(new Set(['name', 'email', 'password', 'confirmPassword']));

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
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

    const handleSocialSignUp = (provider: string) => {
        console.log(`Sign up with ${provider}`);
    };

    const getPasswordStrength = (): { strength: string; color: string; width: string } => {
        if (!password) return { strength: '', color: '', width: '0%' };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return { strength: 'Weak', color: '#ef4444', width: '33%' };
        if (score <= 4) return { strength: 'Medium', color: '#f59e0b', width: '66%' };
        return { strength: 'Strong', color: '#10b981', width: '100%' };
    };

    const passwordStrength = getPasswordStrength();

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
                            <View style={{ marginBottom: 32, marginTop: 10 }}>
                                {/* Logo/Icon */}
                                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                    <LinearGradient
                                        colors={['#10b981', '#059669', '#047857']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 24,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#10b981',
                                            shadowOffset: { width: 0, height: 8 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 16,
                                            elevation: 10,
                                        }}
                                    >
                                        <MaterialCommunityIcons name="account-plus" size={40} color="#ffffff" />
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
                                    Create Account
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#94a3b8',
                                        textAlign: 'center',
                                        lineHeight: 24,
                                    }}
                                >
                                    Sign up to start protecting your messages
                                </Text>
                            </View>

                            {/* Sign Up Form */}
                            <View style={{ gap: 18, marginBottom: 28 }}>
                                {/* Name Input */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#e2e8f0',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Full Name
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 2,
                                            borderColor: errors.name && touchedFields.has('name')
                                                ? '#ef4444'
                                                : nameFocused
                                                    ? '#10b981'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: nameFocused ? '#10b981' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: nameFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: nameFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="account-outline"
                                            size={22}
                                            color={nameFocused ? '#10b981' : '#64748b'}
                                            style={{ marginRight: 12 }}
                                        />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 16,
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}
                                            placeholder="John Doe"
                                            placeholderTextColor="#475569"
                                            value={name}
                                            onChangeText={setName}
                                            autoCapitalize="words"
                                            onFocus={() => setNameFocused(true)}
                                            onBlur={() => {
                                                setNameFocused(false);
                                                handleFieldBlur('name');
                                            }}
                                        />
                                    </View>
                                    {errors.name && touchedFields.has('name') && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                            <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                            <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                                {errors.name}
                                            </Text>
                                        </View>
                                    )}
                                </View>

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
                                                    ? '#10b981'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: emailFocused ? '#10b981' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: emailFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: emailFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="email-outline"
                                            size={22}
                                            color={emailFocused ? '#10b981' : '#64748b'}
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
                                            onChangeText={setEmail}
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
                                                    ? '#10b981'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: passwordFocused ? '#10b981' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: passwordFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: passwordFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="lock-outline"
                                            size={22}
                                            color={passwordFocused ? '#10b981' : '#64748b'}
                                            style={{ marginRight: 12 }}
                                        />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 16,
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}
                                            placeholder="Create a strong password"
                                            placeholderTextColor="#475569"
                                            value={password}
                                            onChangeText={setPassword}
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
                                    {password.length > 0 && (
                                        <View style={{ marginTop: 8 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Password Strength</Text>
                                                <Text style={{ fontSize: 12, color: passwordStrength.color, fontWeight: '600' }}>
                                                    {passwordStrength.strength}
                                                </Text>
                                            </View>
                                            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 4, borderRadius: 2 }}>
                                                <View
                                                    style={{
                                                        backgroundColor: passwordStrength.color,
                                                        height: '100%',
                                                        borderRadius: 2,
                                                        width: passwordStrength.width as any,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    )}
                                    {errors.password && touchedFields.has('password') && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                            <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                            <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                                {errors.password}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Confirm Password Input */}
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#e2e8f0',
                                            marginBottom: 10,
                                        }}
                                    >
                                        Confirm Password
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 16,
                                            borderWidth: 2,
                                            borderColor: errors.confirmPassword && touchedFields.has('confirmPassword')
                                                ? '#ef4444'
                                                : confirmPasswordFocused
                                                    ? '#10b981'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 16,
                                            shadowColor: confirmPasswordFocused ? '#10b981' : '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: confirmPasswordFocused ? 0.3 : 0.1,
                                            shadowRadius: 8,
                                            elevation: confirmPasswordFocused ? 4 : 2,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="lock-check-outline"
                                            size={22}
                                            color={confirmPasswordFocused ? '#10b981' : '#64748b'}
                                            style={{ marginRight: 12 }}
                                        />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                paddingVertical: 16,
                                                fontSize: 16,
                                                color: '#ffffff',
                                            }}
                                            placeholder="Re-enter your password"
                                            placeholderTextColor="#475569"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize="none"
                                            onFocus={() => setConfirmPasswordFocused(true)}
                                            onBlur={() => {
                                                setConfirmPasswordFocused(false);
                                                handleFieldBlur('confirmPassword');
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            activeOpacity={0.7}
                                        >
                                            <MaterialCommunityIcons
                                                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                                size={22}
                                                color="#64748b"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.confirmPassword && touchedFields.has('confirmPassword') && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                            <MaterialCommunityIcons name="alert-circle" size={14} color="#ef4444" />
                                            <Text style={{ fontSize: 13, color: '#ef4444', marginLeft: 4 }}>
                                                {errors.confirmPassword}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* Sign Up Button */}
                            <TouchableOpacity
                                onPress={handleSignUp}
                                activeOpacity={0.8}
                                disabled={isLoading}
                                style={{ marginBottom: 24 }}
                            >
                                <LinearGradient
                                    colors={['#10b981', '#059669', '#047857']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        paddingVertical: 18,
                                        borderRadius: 16,
                                        shadowColor: '#10b981',
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
                                                Creating Account...
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
                                                    Create Account
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
                                    Or sign up with
                                </Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                            </View>

                            {/* Social Sign Up Buttons */}
                            <View style={{ gap: 12, marginBottom: 32 }}>
                                {/* Google */}
                                <TouchableOpacity
                                    onPress={() => handleSocialSignUp('Google')}
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
                                    onPress={() => handleSocialSignUp('Apple')}
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
                            </View>

                            {/* Sign In Link */}
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
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.push('/(auth)/signin' as any)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: '#10b981',
                                        }}
                                    >
                                        Sign In
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
