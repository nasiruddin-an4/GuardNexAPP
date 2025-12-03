import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();
    const { user, messages } = useApp();

    const stats = {
        totalScanned: messages.length,
        spamDetected: messages.filter(m => m.isSpam).length,
        legitimate: messages.filter(m => !m.isSpam).length,
        accuracy: 92,
    };

    const recentMessages = messages.slice(0, 5);

    const quickActions = [
        {
            id: '1',
            label: 'Scan Message',
            icon: 'shield-check',
            color: '#2563eb',
            route: '/(tabs)/scan',
        },
        {
            id: '2',
            label: 'View History',
            icon: 'history',
            color: '#10b981',
            route: '/(tabs)/history',
        },
        {
            id: '3',
            label: 'Settings',
            icon: 'cog',
            color: '#f59e0b',
            route: '/(tabs)/settings',
        },
    ];

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                <Text className="text-white text-3xl font-bold mb-2">
                    Welcome, {user?.name || 'User'}! 👋
                </Text>
                <Text className="text-blue-100 text-base">
                    Your spam detection shield is active
                </Text>
            </View>

            {/* Stats Grid */}
            <View className="px-6 py-6">
                <View className="gap-3">
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                            <View className="flex-row items-center gap-3 mb-2">
                                <View className="bg-blue-100 p-3 rounded-lg">
                                    <MaterialCommunityIcons
                                        name="shield-check"
                                        size={24}
                                        color="#2563eb"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-600 text-sm">Total Scanned</Text>
                                    <Text className="text-2xl font-bold text-gray-900">
                                        {stats.totalScanned}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                            <View className="flex-row items-center gap-3 mb-2">
                                <View className="bg-red-100 p-3 rounded-lg">
                                    <MaterialCommunityIcons
                                        name="alert-circle"
                                        size={24}
                                        color="#ef4444"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-600 text-sm">Spam Detected</Text>
                                    <Text className="text-2xl font-bold text-gray-900">
                                        {stats.spamDetected}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                            <View className="flex-row items-center gap-3 mb-2">
                                <View className="bg-green-100 p-3 rounded-lg">
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={24}
                                        color="#10b981"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-600 text-sm">Legitimate</Text>
                                    <Text className="text-2xl font-bold text-gray-900">
                                        {stats.legitimate}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                            <View className="flex-row items-center gap-3 mb-2">
                                <View className="bg-purple-100 p-3 rounded-lg">
                                    <MaterialCommunityIcons
                                        name="target"
                                        size={24}
                                        color="#a855f7"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-600 text-sm">Accuracy</Text>
                                    <Text className="text-2xl font-bold text-gray-900">
                                        {stats.accuracy}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Quick Actions */}
            <View className="px-6 mb-6">
                <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
                <View className="flex-row gap-3">
                    {quickActions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            onPress={() => router.push(action.route as any)}
                            className="flex-1 bg-white rounded-lg p-4 items-center shadow-sm"
                        >
                            <View
                                style={{ backgroundColor: action.color + '20' }}
                                className="p-3 rounded-full mb-2"
                            >
                                <MaterialCommunityIcons
                                    name={action.icon as any}
                                    size={28}
                                    color={action.color}
                                />
                            </View>
                            <Text className="text-sm font-medium text-gray-900 text-center">
                                {action.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Recent Messages */}
            <View className="px-6 mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-gray-900">Recent Messages</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/history' as any)}>
                        <Text className="text-blue-600 font-medium">View All</Text>
                    </TouchableOpacity>
                </View>

                {recentMessages.length > 0 ? (
                    <View className="gap-3">
                        {recentMessages.map((message) => (
                            <View key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
                                <View className="flex-row justify-between items-start mb-2">
                                    <View className="flex-1 pr-3">
                                        <Text
                                            className="text-gray-900 font-medium mb-1"
                                            numberOfLines={2}
                                        >
                                            {message.content.substring(0, 50)}...
                                        </Text>
                                        <View className="flex-row gap-2 items-center">
                                            <View className="bg-gray-100 px-2 py-1 rounded">
                                                <Text className="text-gray-700 text-xs font-medium capitalize">
                                                    {message.channel}
                                                </Text>
                                            </View>
                                            <Text className="text-gray-500 text-xs">
                                                {new Date(message.timestamp).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: message.isSpam ? '#fee2e2' : '#dcfce7',
                                        }}
                                        className="px-3 py-1 rounded"
                                    >
                                        <Text
                                            className={`text-xs font-bold ${message.isSpam ? 'text-red-700' : 'text-green-700'
                                                }`}
                                        >
                                            {message.isSpam ? '⚠️ Spam' : '✓ Safe'}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <View className="flex-1 bg-gray-200 rounded-full h-2">
                                        <View
                                            style={{
                                                width: `${message.confidence * 100}%`,
                                                backgroundColor: message.isSpam ? '#ef4444' : '#10b981',
                                            }}
                                            className="h-full rounded-full"
                                        />
                                    </View>
                                    <Text className="text-gray-700 text-xs font-medium">
                                        {(message.confidence * 100).toFixed(0)}%
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="bg-white rounded-lg p-8 items-center">
                        <MaterialCommunityIcons
                            name="inbox-multiple"
                            size={48}
                            color="#9ca3af"
                        />
                        <Text className="text-gray-600 mt-4">No messages yet</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
