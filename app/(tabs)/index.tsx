import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const router = useRouter();
    const { user, messages } = useApp();
    const scrollRef = useRef(null);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarouselIndex((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

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
        <SafeAreaView className="flex-1 bg-gray-50">

            {/* TOP BAR — No Gradient */}
            <View className="px-6 pt-4 pb-4">
                <View className="flex-row justify-between items-center">

                    {/* USER INFO */}
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-blue-600 rounded-full w-12 h-12 items-center justify-center border-2 border-white shadow-lg">
                            <Text className="text-white text-xl font-bold">
                                {(user?.name || 'U').charAt(0).toUpperCase()}
                            </Text>
                        </View>

                        <View className="flex-1">
                            <Text className="text-blue-700 text-lg font-bold">
                                {user?.name || 'User'}
                            </Text>
                            <Text className="text-blue-700 text-xs opacity-80">
                                GuardNex
                            </Text>
                        </View>
                    </View>

                    {/* ICONS */}
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center">
                            <MaterialCommunityIcons name="bell-outline" size={22} color="white" />
                            <View className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2" />
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center">
                            <MaterialCommunityIcons name="magnify" size={22} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {/* MAIN SCROLL */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* CAROUSEL */}
                <View className="mt-6 mb-6">
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        className="ml-6"
                    >
                        {carouselBanners.map((banner) => (
                            <View key={banner.id} className="w-80 mr-4">
                                <View
                                    style={{ backgroundColor: banner.color }}
                                    className="rounded-2xl p-6 h-40 justify-between"
                                >
                                    <View className="flex-row justify-between">
                                        <View className="flex-1">
                                            <Text className="text-white font-bold text-lg">{banner.title}</Text>
                                            <Text className="text-white text-sm opacity-90 mt-1">{banner.subtitle}</Text>
                                        </View>

                                        <View className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <MaterialCommunityIcons name={banner.icon} size={24} color="white" />
                                        </View>
                                    </View>

                                    {/* STATIC SLIDER BAR */}
                                    <View className="bg-white bg-opacity-20 h-1 rounded-full">
                                        <View className="bg-white h-full w-full" />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* DOTS */}
                    <View className="flex-row justify-center gap-2 mt-4">
                        {carouselBanners.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentCarouselIndex(index)}
                                className={`${index === currentCarouselIndex
                                    ? 'bg-blue-600 w-8 h-2'
                                    : 'bg-gray-300 w-2 h-2'
                                    } rounded-full`}
                            />
                        ))}
                    </View>
                </View>

                {/* YOUR STATISTICS */}
                <View className="px-6 py-8">

                    <Text className="text-gray-900 text-lg font-bold mb-4">Your Statistics</Text>

                    {/* Total Scanned — No Gradient */}
                    <View className="bg-blue-50 rounded-2xl p-6 mb-4">
                        <View className="flex-row justify-between mb-6">
                            <View>
                                <Text className="text-gray-600 text-sm">Total Scanned</Text>
                                <Text className="text-4xl font-bold text-blue-600">
                                    {stats.totalScanned}
                                </Text>
                            </View>

                            <View className="bg-blue-600 rounded-2xl p-4">
                                <MaterialCommunityIcons name="shield-check" size={40} color="white" />
                            </View>
                        </View>

                        <View className="bg-blue-200 h-1 rounded-full overflow-hidden">
                            <View className="bg-blue-600 h-full" style={{ width: '65%' }} />
                        </View>

                        <Text className="text-gray-600 text-xs mt-2">
                            You're protecting yourself daily
                        </Text>
                    </View>

                    {/* GRID */}
                    <View className="gap-3 mb-2">

                        {/* Spam */}
                        <View className="flex-row gap-3">

                            <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 border">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-red-100 rounded-xl p-3">
                                        <MaterialCommunityIcons name="alert-circle" size={24} color="#ef4444" />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-gray-600 text-xs">Spam Blocked</Text>
                                        <Text className="text-2xl font-bold text-gray-900">{stats.spamDetected}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Safe */}
                            <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 border">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-green-100 rounded-xl p-3">
                                        <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-gray-600 text-xs">Safe Messages</Text>
                                        <Text className="text-2xl font-bold text-gray-900">{stats.legitimate}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>

                        {/* Accuracy */}
                        <View className="bg-purple-50 border rounded-2xl p-4">
                            <View className="flex-row justify-between">
                                <View>
                                    <Text className="text-gray-600 text-xs">Detection Accuracy</Text>
                                    <Text className="text-3xl font-bold text-purple-600">{stats.accuracy}%</Text>
                                </View>
                                <View className="bg-purple-600 rounded-full w-16 h-16 items-center justify-center">
                                    <Text className="text-white text-2xl font-bold">{stats.accuracy}%</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>

                {/* FEATURE LIST */}
                <View className="px-6 pb-8">
                    <Text className="text-gray-900 text-lg font-bold mb-4">Quick Features</Text>

                    <View className="gap-3">
                        {features.map((feature) => (
                            <TouchableOpacity
                                key={feature.id}
                                onPress={() => router.push(feature.route)}
                                className="bg-white rounded-2xl p-4 flex-row items-center gap-4 border"
                            >
                                <View
                                    style={{ backgroundColor: feature.color + '20' }}
                                    className="rounded-xl p-3 w-14 h-14 items-center justify-center"
                                >
                                    <MaterialCommunityIcons name={feature.icon} size={28} color={feature.color} />
                                </View>

                                <View className="flex-1">
                                    <Text className="text-gray-900 font-bold">{feature.title}</Text>
                                    <Text className="text-gray-500 text-xs">{feature.description}</Text>
                                </View>

                                <MaterialCommunityIcons name="chevron-right" size={24} color="#d1d5db" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
