import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';


export default function SettingsScreen() {
    const router = useRouter();
    const { user, resetApp } = useApp();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = async () => {
        await resetApp();
        router.replace('/(auth)/onboarding' as any);
    };

    const handleResetData = async () => {
        alert('This will delete all your scan records. This action cannot be undone.');
    };

    const settingItems = [
        {
            id: '1',
            title: 'User Profile',
            subtitle: 'View and edit your profile',
            icon: 'account',
            color: '#2563eb',
            onPress: () => { },
        },
        {
            id: '2',
            title: 'Language',
            subtitle: user?.language === 'en' ? 'English' : user?.language === 'es' ? 'Spanish' : 'Bangla',
            icon: 'translate',
            color: '#10b981',
            onPress: () => { },
        },
        {
            id: '3',
            title: 'About GuardNex',
            subtitle: 'Version 1.0.0',
            icon: 'information',
            color: '#f59e0b',
            onPress: () => { },
        },
    ];

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* User Profile Card */}
            <View className="bg-white mx-4 mt-6 mb-4 rounded-lg p-6 shadow-sm border border-gray-100">
                <View className="flex-row items-center gap-4">
                    <View className="bg-blue-600 rounded-full w-16 h-16 items-center justify-center">
                        <MaterialCommunityIcons name="account" size={32} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-900">
                            {user?.name || 'User'}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                            {user?.email || 'user@example.com'}
                        </Text>
                        <View className="mt-2 bg-blue-100 px-2 py-1 rounded w-fit">
                            <Text className="text-blue-700 text-xs font-semibold">
                                Premium User
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Preferences */}
            <View className="px-4 mb-6">
                <Text className="text-lg font-bold text-gray-900 mb-4">
                    Preferences
                </Text>

                {/* Notifications */}
                <View className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm">
                    <View className="flex-row items-center gap-3">
                        <View className="bg-purple-100 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="bell"
                                size={24}
                                color="#a855f7"
                            />
                        </View>
                        <View>
                            <Text className="text-gray-900 font-semibold">
                                Notifications
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                {notifications ? 'Enabled' : 'Disabled'}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                        thumbColor={notifications ? '#2563eb' : '#9ca3af'}
                    />
                </View>

                {/* Dark Mode */}
                <View className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm">
                    <View className="flex-row items-center gap-3">
                        <View className="bg-gray-200 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="moon-waning-crescent"
                                size={24}
                                color="#374151"
                            />
                        </View>
                        <View>
                            <Text className="text-gray-900 font-semibold">
                                Dark Mode
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                {darkMode ? 'Enabled' : 'Disabled'}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                        thumbColor={darkMode ? '#2563eb' : '#9ca3af'}
                    />
                </View>
            </View>

            {/* Account Settings */}
            <View className="px-4 mb-6">
                <Text className="text-lg font-bold text-gray-900 mb-4">
                    Account Settings
                </Text>

                {settingItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={item.onPress}
                        className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm"
                    >
                        <View className="flex-row items-center gap-3 flex-1">
                            <View
                                style={{ backgroundColor: item.color + '20' }}
                                className="p-3 rounded-lg"
                            >
                                <MaterialCommunityIcons
                                    name={item.icon as any}
                                    size={24}
                                    color={item.color}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-900 font-semibold">
                                    {item.title}
                                </Text>
                                <Text className="text-gray-600 text-xs">
                                    {item.subtitle}
                                </Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={24}
                            color="#9ca3af"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Data Management */}
            <View className="px-4 mb-6">
                <Text className="text-lg font-bold text-gray-900 mb-4">
                    Data Management
                </Text>

                <TouchableOpacity className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-blue-100 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="backup-restore"
                                size={24}
                                color="#2563eb"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-semibold">
                                Export Data
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                Download your scan history
                            </Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#9ca3af"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleResetData}
                    className="bg-white rounded-lg p-4 flex-row items-center justify-between shadow-sm border border-red-200 mb-3"
                >
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-red-100 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="delete"
                                size={24}
                                color="#ef4444"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-semibold">
                                Clear History
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                Delete all scan records
                            </Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#9ca3af"
                    />
                </TouchableOpacity>
            </View>

            {/* Help & Support */}
            <View className="px-4 mb-6">
                <Text className="text-lg font-bold text-gray-900 mb-4">
                    Help & Support
                </Text>

                <TouchableOpacity className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-orange-100 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="help-circle"
                                size={24}
                                color="#f59e0b"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-semibold">
                                Help Center
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                FAQs and support guides
                            </Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#9ca3af"
                    />
                </TouchableOpacity>

                <TouchableOpacity className="bg-white rounded-lg p-4 flex-row items-center justify-between mb-3 shadow-sm">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View className="bg-green-100 p-3 rounded-lg">
                            <MaterialCommunityIcons
                                name="message-text"
                                size={24}
                                color="#10b981"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-semibold">
                                Feedback
                            </Text>
                            <Text className="text-gray-600 text-xs">
                                Send us your thoughts
                            </Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="#9ca3af"
                    />
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <View className="px-4 mb-8">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-red-600 py-4 rounded-lg flex-row items-center justify-center gap-2"
                >
                    <MaterialCommunityIcons name="logout" size={20} color="white" />
                    <Text className="text-white text-lg font-bold">Logout</Text>
                </TouchableOpacity>
            </View>

            {/* App Info */}
            <View className="px-4 py-6 items-center border-t border-gray-200 mb-4">
                <Text className="text-gray-600 text-sm font-medium">
                    GuardNex v1.0.0
                </Text>
                <Text className="text-gray-500 text-xs mt-2">
                    Advanced Multilingual Spam Detection
                </Text>
                <Text className="text-gray-500 text-xs mt-4">
                    © 2025 GuardNex. All rights reserved.
                </Text>
            </View>
        </ScrollView>
    );
}
