import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const { completeOnboarding, setUser } = useApp();
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [language, setLanguage] = useState<'en' | 'es' | 'bn'>('en');

    const steps = [
        {
            title: 'Welcome to GuardNex',
            subtitle: 'Advanced Multilingual Spam Detection',
            description: 'Protect your messages across Email, SMS, and Social Media from spam and phishing attacks with AI-powered technology.',
            icon: 'shield-check',
            gradient: ['#3b82f6', '#1d4ed8'],
        },
        {
            title: 'Multi-Channel Protection',
            subtitle: 'Detect Spam Everywhere',
            description: 'GuardNex monitors your Email, SMS, and Social Media messages with advanced AI-powered detection algorithms.',
            icon: 'email-multiple',
            gradient: ['#8b5cf6', '#6d28d9'],
        },
        {
            title: 'Multilingual Support',
            subtitle: 'English, Spanish & Bangla',
            description: 'Spam detection works seamlessly across English, Spanish, and Bangla languages with high accuracy.',
            icon: 'translate',
            gradient: ['#ec4899', '#be185d'],
        },
        {
            title: 'Get Started',
            subtitle: 'Tell us about you',
            description: 'Set your preferences to begin protecting your messages with GuardNex.',
            icon: 'account',
            gradient: ['#10b981', '#059669'],
        },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const handleSkip = async () => {
        await setUser({
            id: `user_${Date.now()}`,
            name: 'User',
            email: 'user@example.com',
            language: 'en',
            hasCompletedOnboarding: true,
        });
        await completeOnboarding();
        router.replace('/(tabs)' as any);
    };

    const handleComplete = async () => {
        const userName = name.trim() || 'User';
        await setUser({
            id: `user_${Date.now()}`,
            name: userName,
            email: `${userName.toLowerCase()}@example.com`,
            language,
            hasCompletedOnboarding: true,
        });
        await completeOnboarding();
        router.replace('/(tabs)' as any);
    };

    const currentStep = steps[step];

    return (
        <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
            <LinearGradient
                colors={['#eff6ff', '#f8fafc', '#ffffff']}
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1 }}>
                        {/* Skip Button */}
                        {step < steps.length - 1 && (
                            <View style={{ paddingHorizontal: 24, paddingTop: 48, alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={handleSkip}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#64748b' }}>
                                        Skip
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingHorizontal: 24,
                                paddingTop: step < steps.length - 1 ? 20 : 48,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Progress Indicator */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
                                {steps.map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            height: 4,
                                            width: index === step ? 32 : 16,
                                            borderRadius: 8,
                                            backgroundColor: index <= step ? currentStep.gradient[0] : '#cbd5e1',
                                            opacity: index === step ? 1 : index < step ? 0.7 : 0.3,
                                        }}
                                    />
                                ))}
                            </View>

                            {/* Icon with Gradient Background */}
                            <View style={{ alignItems: 'center', marginBottom: 32 }}>
                                <LinearGradient
                                    colors={currentStep.gradient as any}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 60,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        shadowColor: currentStep.gradient[0],
                                        shadowOffset: { width: 0, height: 8 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 16,
                                        elevation: 8,
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name={currentStep.icon as any}
                                        size={56}
                                        color="#ffffff"
                                    />
                                </LinearGradient>
                            </View>

                            {/* Content */}
                            <View style={{ marginBottom: 40 }}>
                                <Text
                                    style={{
                                        fontSize: 32,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#0f172a',
                                        marginBottom: 12,
                                        lineHeight: 40,
                                    }}
                                >
                                    {currentStep.title}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        color: currentStep.gradient[0],
                                        marginBottom: 16,
                                        lineHeight: 26,
                                    }}
                                >
                                    {currentStep.subtitle}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        textAlign: 'center',
                                        color: '#64748b',
                                        lineHeight: 24,
                                        paddingHorizontal: 8,
                                    }}
                                >
                                    {currentStep.description}
                                </Text>
                            </View>

                            {/* Input Section for Last Step */}
                            {step === steps.length - 1 && (
                                <View style={{ gap: 24, marginBottom: 40 }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '600',
                                                color: '#334155',
                                                marginBottom: 10,
                                            }}
                                        >
                                            Your Name
                                        </Text>
                                        <TextInput
                                            style={{
                                                backgroundColor: '#ffffff',
                                                paddingHorizontal: 16,
                                                paddingVertical: 14,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: name ? currentStep.gradient[0] : '#e2e8f0',
                                                fontSize: 16,
                                                color: '#0f172a',
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.05,
                                                shadowRadius: 4,
                                                elevation: 2,
                                            }}
                                            placeholder="Enter your name"
                                            value={name}
                                            onChangeText={setName}
                                            placeholderTextColor="#94a3b8"
                                        />
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '600',
                                                color: '#334155',
                                                marginBottom: 10,
                                            }}
                                        >
                                            Preferred Language
                                        </Text>
                                        <View style={{ gap: 12 }}>
                                            {[
                                                { code: 'en', label: 'English', flag: '🇬🇧' },
                                                { code: 'es', label: 'Spanish', flag: '🇪🇸' },
                                                { code: 'bn', label: 'Bangla', flag: '🇧🇩' },
                                            ].map((lang) => (
                                                <TouchableOpacity
                                                    key={lang.code}
                                                    onPress={() => setLanguage(lang.code as 'en' | 'es' | 'bn')}
                                                    style={{
                                                        backgroundColor: language === lang.code ? `${currentStep.gradient[0]}15` : '#ffffff',
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 16,
                                                        borderRadius: 12,
                                                        borderWidth: 2,
                                                        borderColor: language === lang.code ? currentStep.gradient[0] : '#e2e8f0',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        shadowColor: '#000',
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: language === lang.code ? 0.1 : 0.05,
                                                        shadowRadius: 4,
                                                        elevation: language === lang.code ? 3 : 2,
                                                    }}
                                                >
                                                    <Text style={{ fontSize: 24, marginRight: 12 }}>
                                                        {lang.flag}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: language === lang.code ? '600' : '500',
                                                            color: language === lang.code ? currentStep.gradient[0] : '#475569',
                                                        }}
                                                    >
                                                        {lang.label}
                                                    </Text>
                                                    {language === lang.code && (
                                                        <MaterialCommunityIcons
                                                            name="check-circle"
                                                            size={20}
                                                            color={currentStep.gradient[0]}
                                                            style={{ marginLeft: 'auto' }}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            )}
                        </ScrollView>

                        {/* Fixed Bottom Navigation */}
                        <View
                            style={{
                                paddingHorizontal: 24,
                                paddingBottom: Platform.OS === 'ios' ? 40 : 24,
                                paddingTop: 16,
                                backgroundColor: '#ffffff',
                                borderTopWidth: 1,
                                borderTopColor: '#f1f5f9',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: -4 },
                                shadowOpacity: 0.05,
                                shadowRadius: 8,
                                elevation: 8,
                            }}
                        >
                            <View style={{ gap: 12 }}>
                                {/* Primary Button */}
                                <TouchableOpacity
                                    onPress={step === steps.length - 1 ? handleComplete : handleNext}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={currentStep.gradient as any}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            paddingVertical: 16,
                                            borderRadius: 12,
                                            shadowColor: currentStep.gradient[0],
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 4,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    color: '#ffffff',
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    marginRight: 8,
                                                }}
                                            >
                                                {step === steps.length - 1 ? 'Get Started' : 'Continue'}
                                            </Text>
                                            <MaterialCommunityIcons
                                                name={step === steps.length - 1 ? 'check' : 'arrow-right'}
                                                size={20}
                                                color="#ffffff"
                                            />
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Back Button */}
                                {step > 0 && (
                                    <TouchableOpacity
                                        onPress={() => setStep(step - 1)}
                                        activeOpacity={0.7}
                                        style={{
                                            backgroundColor: '#f1f5f9',
                                            paddingVertical: 14,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <MaterialCommunityIcons
                                                name="arrow-left"
                                                size={20}
                                                color="#64748b"
                                                style={{ marginRight: 8 }}
                                            />
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    color: '#64748b',
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Back
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </View>
    );
}
