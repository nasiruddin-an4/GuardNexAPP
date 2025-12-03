import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();
    const { user, messages } = useApp();
    const scrollRef = useRef<ScrollView>(null);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

    const carouselBanners = [
        {
            id: '1',
            title: 'Stay Protected',
            subtitle: 'Real-time spam detection for all messages',
            icon: 'shield-check',
            color: '#2563eb',
        },
        {
            id: '2',
            title: 'Check History',
            subtitle: 'View all scanned messages and trends',
            icon: 'history',
            color: '#10b981',
        },
        {
            id: '3',
            title: 'New Features',
            subtitle: 'Advanced spam filtering coming soon',
            icon: 'star',
            color: '#f59e0b',
        },
    ];

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarouselIndex((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Scroll carousel when index changes
    useEffect(() => {
        scrollRef.current?.scrollTo({
            x: currentCarouselIndex * 320,
            animated: true,
        });
    }, [currentCarouselIndex]);

    const stats = {
        totalScanned: messages.length,
        spamDetected: messages.filter(m => m.isSpam).length,
        legitimate: messages.filter(m => !m.isSpam).length,
        accuracy: 92,
    };

    const features = [
        {
            id: '1',
            title: 'Scan Messages',
            subtitle: 'Detect spam instantly',
            icon: 'shield-check',
            color: '#2563eb',
            route: '/(tabs)/scan',
            description: 'Check any message for spam',
        },
        {
            id: '2',
            title: 'Message History',
            subtitle: 'View all scans',
            icon: 'history',
            color: '#10b981',
            route: '/(tabs)/history',
            description: 'Access your scanning history',
        },
        {
            id: '3',
            title: 'Settings',
            subtitle: 'Customize experience',
            icon: 'cog',
            color: '#f59e0b',
            route: '/(tabs)/settings',
            description: 'Update preferences',
        },
    ];

    return (
        <View className="flex-1 bg-white">
            {/* Fixed/Sticky Top Bar */}
            <View className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pt-6 pb-4 shadow-lg">
                {/* Top Bar with Profile and Icons */}
                <View className="flex-row justify-between items-center">
                    {/* Left: User Profile */}
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-white rounded-full w-12 h-12 items-center justify-center border-2 border-white shadow-lg">
                            <Text className="text-blue-600 text-xl font-bold">
                                {(user?.name || 'U').charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-xs font-medium opacity-80">
                                Welcome back
                            </Text>
                            <Text className="text-white text-lg font-bold">
                                {user?.name || 'User'}
                            </Text>
                        </View>
                    </View>

                    {/* Right: Notification and Search Icons */}
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center active:bg-opacity-30"
                            onPress={() => {/* Handle search */ }}
                        >
                            <MaterialCommunityIcons name="magnify" size={22} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center active:bg-opacity-30"
                            onPress={() => {/* Handle notifications */ }}
                        >
                            <MaterialCommunityIcons name="bell-outline" size={22} color="white" />
                            {/* Notification Badge */}
                            <View className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Protection Status Banner */}
                <View className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pb-6">
                    <View className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="bg-green-400 w-3 h-3 rounded-full" />
                            <Text className="text-white font-semibold">Protection Active</Text>
                        </View>
                        <Text className="text-blue-100 text-sm">
                            Your device is protected against spam and phishing
                        </Text>
                    </View>
                </View>

                {/* Carousel Banners */}
                <View className="mt-6 mb-6">
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        className="ml-6"
                    >
                        {carouselBanners.map((banner) => (
                            <View key={banner.id} className="w-80 mr-4">
                                <View
                                    style={{ backgroundColor: banner.color }}
                                    className="rounded-2xl p-6 h-40 justify-between"
                                >
                                    <View className="flex-row items-start justify-between">
                                        <View className="flex-1">
                                            <Text className="text-white font-bold text-lg mb-1">
                                                {banner.title}
                                            </Text>
                                            <Text className="text-white text-opacity-90 text-sm leading-4">
                                                {banner.subtitle}
                                            </Text>
                                        </View>
                                        <View className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <MaterialCommunityIcons
                                                name={banner.icon as any}
                                                size={24}
                                                color="white"
                                            />
                                        </View>
                                    </View>
                                    <View className="bg-white bg-opacity-20 h-1 rounded-full overflow-hidden">
                                        <View className="bg-white h-full" style={{ width: '100%' }} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Carousel Dots */}
                    <View className="flex-row justify-center gap-2 mt-4">
                        {carouselBanners.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentCarouselIndex(index)}
                                className={`rounded-full transition-all ${index === currentCarouselIndex
                                    ? 'bg-blue-600 w-8 h-2'
                                    : 'bg-gray-300 w-2 h-2'
                                    }`}
                            />
                        ))}
                    </View>
                </View>
                <View className="px-6 py-8">
                    <Text className="text-gray-900 text-lg font-bold mb-4">Your Statistics</Text>

                    <View className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4">
                        <View className="flex-row items-center justify-between mb-6">
                            <View>
                                <Text className="text-gray-600 text-sm font-medium mb-1">Total Scanned</Text>
                                <Text className="text-4xl font-bold text-blue-600">
                                    {stats.totalScanned}
                                </Text>
                            </View>
                            <View className="bg-blue-600 rounded-2xl p-4">
                                <MaterialCommunityIcons name="shield-check" size={40} color="white" />
                            </View>
                        </View>
                        <View className="bg-blue-600 bg-opacity-10 h-1 rounded-full overflow-hidden">
                            <View
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full"
                                style={{ width: '65%' }}
                            />
                        </View>
                        <Text className="text-gray-600 text-xs mt-2">
                            You&apos;re protecting yourself daily
                        </Text>
                    </View>

                    {/* Stats Grid */}
                    <View className="gap-3 mb-2">
                        <View className="flex-row gap-3">
                            {/* Spam Detected */}
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/history' as any)}
                                className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 active:bg-gray-50"
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-red-100 rounded-xl p-3">
                                        <MaterialCommunityIcons
                                            name="alert-circle"
                                            size={24}
                                            color="#ef4444"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-600 text-xs font-medium">Spam Blocked</Text>
                                        <Text className="text-2xl font-bold text-gray-900 mt-1">
                                            {stats.spamDetected}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Legitimate */}
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/history' as any)}
                                className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 active:bg-gray-50"
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-green-100 rounded-xl p-3">
                                        <MaterialCommunityIcons
                                            name="check-circle"
                                            size={24}
                                            color="#10b981"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-600 text-xs font-medium">Safe Messages</Text>
                                        <Text className="text-2xl font-bold text-gray-900 mt-1">
                                            {stats.legitimate}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Accuracy */}
                        <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-gray-600 text-xs font-medium mb-1">Detection Accuracy</Text>
                                    <Text className="text-3xl font-bold text-purple-600">{stats.accuracy}%</Text>
                                </View>
                                <View className="bg-purple-600 rounded-full w-16 h-16 items-center justify-center">
                                    <Text className="text-white text-2xl font-bold">{stats.accuracy}%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Features Section */}
                <View className="px-6 pb-8">
                    <Text className="text-gray-900 text-lg font-bold mb-4">Quick Features</Text>

                    <View className="gap-3">
                        {features.map((feature) => (
                            <TouchableOpacity
                                key={feature.id}
                                onPress={() => router.push(feature.route as any)}
                                className="bg-white rounded-2xl p-4 flex-row items-center gap-4 border border-gray-100 active:bg-gray-50"
                            >
                                <View
                                    style={{ backgroundColor: feature.color + '20' }}
                                    className="rounded-xl p-3 w-14 h-14 items-center justify-center"
                                >
                                    <MaterialCommunityIcons
                                        name={feature.icon as any}
                                        size={28}
                                        color={feature.color}
                                    />
                                </View>

                                <View className="flex-1">
                                    <Text className="text-gray-900 font-bold text-base">
                                        {feature.title}
                                    </Text>
                                    <Text className="text-gray-500 text-xs mt-1">
                                        {feature.description}
                                    </Text>
                                </View>

                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={24}
                                    color="#d1d5db"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Info Banner */}
                <View className="px-6 pb-8">
                    <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200 flex-row gap-3">
                        <View className="bg-blue-600 rounded-full w-10 h-10 items-center justify-center flex-shrink-0 mt-1">
                            <MaterialCommunityIcons name="lightbulb" size={20} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-blue-900 font-bold text-sm mb-1">
                                Pro Tip
                            </Text>
                            <Text className="text-blue-800 text-xs leading-4">
                                Regularly check your message history to identify patterns and stay protected against evolving spam threats.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}