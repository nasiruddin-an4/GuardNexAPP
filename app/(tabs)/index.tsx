import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

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
            gradient: ['#3b82f6', '#1d4ed8'],
        },
        {
            id: '2',
            title: 'Check History',
            subtitle: 'View all scanned messages and trends',
            icon: 'history',
            gradient: ['#10b981', '#059669'],
        },
        {
            id: '3',
            title: 'New Features',
            subtitle: 'Advanced spam filtering coming soon',
            icon: 'star',
            gradient: ['#f59e0b', '#d97706'],
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarouselIndex((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            x: currentCarouselIndex * (CARD_WIDTH + 16),
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
            icon: 'shield-search',
            gradient: ['#3b82f6', '#1d4ed8'],
            route: '/(tabs)/scan',
            description: 'Check any message for spam',
        },
        {
            id: '2',
            title: 'Message History',
            subtitle: 'View all scans',
            icon: 'history',
            gradient: ['#10b981', '#059669'],
            route: '/(tabs)/history',
            description: 'Access your scanning history',
        },
        {
            id: '3',
            title: 'Settings',
            subtitle: 'Customize experience',
            icon: 'cog',
            gradient: ['#8b5cf6', '#6d28d9'],
            route: '/(tabs)/settings',
            description: 'Update preferences',
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
            <LinearGradient
                colors={['#3b82f6', '#2563eb', '#f8fafc']}
                locations={[0, 0.3, 0.7]}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    {/* HEADER */}
                    <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* USER INFO */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: '#dbeafe', fontWeight: '500' }}>
                                    {getGreeting()}
                                </Text>
                                <Text style={{ fontSize: 24, color: '#ffffff', fontWeight: 'bold', marginTop: 4 }}>
                                    {user?.name || 'User'}
                                </Text>
                            </View>

                            {/* USER AVATAR */}
                            <TouchableOpacity
                                onPress={() => router.push('/(tabs)/settings')}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#60a5fa', '#3b82f6']}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 3,
                                        borderColor: '#ffffff',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 8,
                                        elevation: 6,
                                    }}
                                >
                                    <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
                                        {(user?.name || 'U').charAt(0).toUpperCase()}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* MAIN SCROLL */}
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    >
                        {/* CAROUSEL */}
                        <View style={{ marginBottom: 24 }}>
                            <ScrollView
                                ref={scrollRef}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 24 }}
                                snapToInterval={CARD_WIDTH + 16}
                                decelerationRate="fast"
                            >
                                {carouselBanners.map((banner, index) => (
                                    <View key={banner.id} style={{ width: CARD_WIDTH, marginRight: index < carouselBanners.length - 1 ? 16 : 0 }}>
                                        <LinearGradient
                                            colors={banner.gradient as any}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                borderRadius: 20,
                                                padding: 24,
                                                minHeight: 160,
                                                justifyContent: 'space-between',
                                                shadowColor: banner.gradient[0],
                                                shadowOffset: { width: 0, height: 8 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 12,
                                                elevation: 8,
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <View style={{ flex: 1, paddingRight: 16 }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
                                                        {banner.title}
                                                    </Text>
                                                    <Text style={{ color: '#ffffff', fontSize: 14, opacity: 0.9, lineHeight: 20 }}>
                                                        {banner.subtitle}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                        borderRadius: 16,
                                                        padding: 12,
                                                    }}
                                                >
                                                    <MaterialCommunityIcons name={banner.icon as any} size={32} color="#ffffff" />
                                                </View>
                                            </View>

                                            {/* Progress Bar */}
                                            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: 4, borderRadius: 2, marginTop: 16 }}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#ffffff',
                                                        height: '100%',
                                                        borderRadius: 2,
                                                        width: index === currentCarouselIndex ? '100%' : '0%',
                                                    }}
                                                />
                                            </View>
                                        </LinearGradient>
                                    </View>
                                ))}
                            </ScrollView>

                            {/* DOTS */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                                {carouselBanners.map((_, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setCurrentCarouselIndex(index)}
                                        activeOpacity={0.8}
                                    >
                                        <View
                                            style={{
                                                width: index === currentCarouselIndex ? 24 : 8,
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: index === currentCarouselIndex ? '#3b82f6' : '#cbd5e1',
                                            }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* STATISTICS SECTION */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0f172a' }}>
                                    Your Statistics
                                </Text>
                                <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#3b82f6' }}>
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Total Scanned Card */}
                            <LinearGradient
                                colors={['#3b82f6', '#2563eb'] as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 20,
                                    padding: 20,
                                    marginBottom: 16,
                                    shadowColor: '#3b82f6',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                    elevation: 6,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#dbeafe', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>
                                            Total Scanned
                                        </Text>
                                        <Text style={{ color: '#ffffff', fontSize: 40, fontWeight: 'bold', marginBottom: 4 }}>
                                            {stats.totalScanned}
                                        </Text>
                                        <Text style={{ color: '#dbeafe', fontSize: 12, opacity: 0.9 }}>
                                            Messages protected
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 20,
                                            padding: 16,
                                        }}
                                    >
                                        <MaterialCommunityIcons name="shield-check" size={48} color="#ffffff" />
                                    </View>
                                </View>

                                {/* Progress Bar */}
                                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: 6, borderRadius: 3, marginTop: 16, overflow: 'hidden' }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            height: '100%',
                                            borderRadius: 3,
                                            width: stats.totalScanned > 0 ? '75%' : '0%',
                                        }}
                                    />
                                </View>
                            </LinearGradient>

                            {/* Stats Grid */}
                            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                                {/* Spam Blocked */}
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: 16,
                                            padding: 16,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.08,
                                            shadowRadius: 8,
                                            elevation: 3,
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: '#fee2e2',
                                                borderRadius: 12,
                                                padding: 10,
                                                alignSelf: 'flex-start',
                                                marginBottom: 12,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="alert-circle" size={24} color="#ef4444" />
                                        </View>
                                        <Text style={{ color: '#64748b', fontSize: 12, fontWeight: '500', marginBottom: 4 }}>
                                            Spam Blocked
                                        </Text>
                                        <Text style={{ color: '#0f172a', fontSize: 28, fontWeight: 'bold' }}>
                                            {stats.spamDetected}
                                        </Text>
                                    </View>
                                </View>

                                {/* Safe Messages */}
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: 16,
                                            padding: 16,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.08,
                                            shadowRadius: 8,
                                            elevation: 3,
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: '#d1fae5',
                                                borderRadius: 12,
                                                padding: 10,
                                                alignSelf: 'flex-start',
                                                marginBottom: 12,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" />
                                        </View>
                                        <Text style={{ color: '#64748b', fontSize: 12, fontWeight: '500', marginBottom: 4 }}>
                                            Safe Messages
                                        </Text>
                                        <Text style={{ color: '#0f172a', fontSize: 28, fontWeight: 'bold' }}>
                                            {stats.legitimate}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Accuracy Card */}
                            <LinearGradient
                                colors={['#8b5cf6', '#6d28d9'] as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 16,
                                    padding: 20,
                                    shadowColor: '#8b5cf6',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ color: '#e9d5ff', fontSize: 13, fontWeight: '500', marginBottom: 6 }}>
                                            Detection Accuracy
                                        </Text>
                                        <Text style={{ color: '#ffffff', fontSize: 36, fontWeight: 'bold' }}>
                                            {stats.accuracy}%
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                            borderRadius: 40,
                                            width: 72,
                                            height: 72,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MaterialCommunityIcons name="chart-line" size={36} color="#ffffff" />
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* QUICK FEATURES */}
                        <View style={{ paddingHorizontal: 24 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 }}>
                                Quick Actions
                            </Text>

                            <View style={{ gap: 12 }}>
                                {features.map((feature) => (
                                    <TouchableOpacity
                                        key={feature.id}
                                        onPress={() => router.push(feature.route as any)}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: 16,
                                                padding: 16,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.06,
                                                shadowRadius: 8,
                                                elevation: 2,
                                            }}
                                        >
                                            <LinearGradient
                                                colors={feature.gradient as any}
                                                style={{
                                                    borderRadius: 14,
                                                    width: 56,
                                                    height: 56,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 16,
                                                }}
                                            >
                                                <MaterialCommunityIcons name={feature.icon as any} size={28} color="#ffffff" />
                                            </LinearGradient>

                                            <View style={{ flex: 1 }}>
                                                <Text style={{ color: '#0f172a', fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>
                                                    {feature.title}
                                                </Text>
                                                <Text style={{ color: '#64748b', fontSize: 13 }}>
                                                    {feature.description}
                                                </Text>
                                            </View>

                                            <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
