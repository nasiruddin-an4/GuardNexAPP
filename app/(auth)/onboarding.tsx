import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
            description: 'Protect your messages across Email, SMS, and Social Media from spam and phishing attacks.',
            icon: 'shield-check',
        },
        {
            title: 'Multi-Channel Protection',
            subtitle: 'Detect Spam Everywhere',
            description: 'GuardNex monitors your Email, SMS, and Social Media messages with AI-powered detection.',
            icon: 'email-multiple',
        },
        {
            title: 'Multilingual Support',
            subtitle: 'English, Spanish & Bangla',
            description: 'Spam detection works seamlessly across English, Spanish, and Bangla languages.',
            icon: 'translate',
        },
        {
            title: 'Get Started',
            subtitle: 'Tell us about you',
            description: 'Set your preferences to begin protecting your messages.',
            icon: 'account',
        },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
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
        <ScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
            <View className="flex-1 justify-between px-6 py-12">
                {/* Header with progress indicator */}
                <View className="mt-8 mb-8">
                    <View className="flex-row justify-center gap-2 mb-8">
                        {steps.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 w-8 rounded-full ${index <= step ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </View>

                    {/* Icon */}
                    <View className="items-center mb-8">
                        <View className="bg-blue-100 rounded-full p-6 mb-6">
                            <MaterialCommunityIcons
                                name={currentStep.icon as any}
                                size={64}
                                color="#2563eb"
                            />
                        </View>
                    </View>

                    {/* Content */}
                    <Text className="text-4xl font-bold text-center text-gray-900 mb-2">
                        {currentStep.title}
                    </Text>
                    <Text className="text-xl font-semibold text-center text-blue-600 mb-4">
                        {currentStep.subtitle}
                    </Text>
                    <Text className="text-base text-center text-gray-600">
                        {currentStep.description}
                    </Text>
                </View>

                {/* Input Section for Last Step */}
                {step === steps.length - 1 && (
                    <View className="gap-6 mb-8">
                        <View>
                            <Text className="text-base font-semibold text-gray-800 mb-3">
                                Your Name
                            </Text>
                            <TextInput
                                className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <View>
                            <Text className="text-base font-semibold text-gray-800 mb-3">
                                Preferred Language
                            </Text>
                            <View className="gap-3">
                                {[
                                    { code: 'en', label: 'English 🇬🇧' },
                                    { code: 'es', label: 'Spanish 🇪🇸' },
                                    { code: 'bn', label: 'Bangla 🇧🇩' },
                                ].map((lang) => (
                                    <TouchableOpacity
                                        key={lang.code}
                                        onPress={() => setLanguage(lang.code as 'en' | 'es' | 'bn')}
                                        className={`px-4 py-3 rounded-lg border-2 ${language === lang.code
                                            ? 'bg-blue-100 border-blue-600'
                                            : 'bg-white border-gray-300'
                                            }`}
                                    >
                                        <Text
                                            className={`text-base font-medium ${language === lang.code
                                                ? 'text-blue-600'
                                                : 'text-gray-700'
                                                }`}
                                        >
                                            {lang.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

                {/* Buttons */}
                <View className="gap-3 mb-4">
                    {step === steps.length - 1 ? (
                        <TouchableOpacity
                            onPress={handleComplete}
                            className="bg-blue-600 py-4 rounded-lg shadow-lg"
                        >
                            <Text className="text-center text-white text-lg font-bold">
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleNext}
                            className="bg-blue-600 py-4 rounded-lg shadow-lg"
                        >
                            <Text className="text-center text-white text-lg font-bold">
                                Next
                            </Text>
                        </TouchableOpacity>
                    )}

                    {step > 0 && (
                        <TouchableOpacity
                            onPress={() => setStep(step - 1)}
                            className="bg-gray-200 py-4 rounded-lg"
                        >
                            <Text className="text-center text-gray-800 text-lg font-bold">
                                Back
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
