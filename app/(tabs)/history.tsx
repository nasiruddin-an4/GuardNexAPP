import { useApp } from '@/src/contexts/AppContext';
import { Message } from '@/src/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen() {
    const { messages, deleteMessage } = useApp();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'spam' | 'safe'>('all');

    const filters = [
        { id: 'all', label: 'All', icon: 'inbox' },
        { id: 'spam', label: 'Spam', icon: 'alert-circle' },
        { id: 'safe', label: 'Safe', icon: 'check-circle' },
    ];

    const filteredMessages = messages.filter((msg) => {
        if (selectedFilter === 'spam') return msg.isSpam;
        if (selectedFilter === 'safe') return !msg.isSpam;
        return true;
    });

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const MessageItem = ({ msg }: { msg: Message }) => (
        <View className="bg-white rounded-lg p-4 mb-3 border-l-4 border-l-gray-200 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 pr-3">
                    <Text
                        className="text-gray-900 font-semibold text-base mb-2"
                        numberOfLines={2}
                    >
                        {msg.content.substring(0, 60)}
                        {msg.content.length > 60 ? '...' : ''}
                    </Text>

                    <View className="flex-row gap-2 items-center flex-wrap">
                        <View className="bg-gray-100 px-2 py-1 rounded">
                            <Text className="text-gray-700 text-xs font-medium capitalize">
                                {msg.channel}
                            </Text>
                        </View>
                        <View className="bg-gray-100 px-2 py-1 rounded">
                            <Text className="text-gray-700 text-xs font-medium">
                                {msg.language.toUpperCase()}
                            </Text>
                        </View>
                        <Text className="text-gray-500 text-xs">
                            {formatDate(msg.timestamp)}
                        </Text>
                    </View>
                </View>

                {/* Status Badge */}
                <View
                    className={`px-3 py-2 rounded-full ${msg.isSpam
                        ? 'bg-red-100'
                        : 'bg-green-100'
                        }`}
                >
                    <Text
                        className={`text-xs font-bold ${msg.isSpam ? 'text-red-700' : 'text-green-700'
                            }`}
                    >
                        {msg.isSpam ? '⚠️ SPAM' : '✓ Safe'}
                    </Text>
                </View>
            </View>

            {/* Confidence Bar */}
            <View className="flex-row items-center gap-2 mb-3">
                <View className="flex-1 bg-gray-200 rounded-full h-2">
                    <View
                        style={{
                            width: `${msg.confidence * 100}%`,
                            backgroundColor: msg.isSpam ? '#ef4444' : '#10b981',
                        }}
                        className="h-full rounded-full"
                    />
                </View>
                <Text className="text-gray-700 text-xs font-medium w-10">
                    {(msg.confidence * 100).toFixed(0)}%
                </Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
                onPress={() => deleteMessage(msg.id)}
                className="flex-row items-center justify-center gap-2 bg-red-50 py-2 rounded"
            >
                <MaterialCommunityIcons name="trash-can" size={16} color="#ef4444" />
                <Text className="text-red-600 text-xs font-semibold">Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Filters */}
            <View className="bg-white px-6 py-4 border-b border-gray-200">
                <Text className="text-gray-900 font-bold mb-3">Filter Results</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2">
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => setSelectedFilter(filter.id as any)}
                                className={`px-4 py-2 rounded-full border-2 flex-row items-center gap-2 ${selectedFilter === filter.id
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'bg-white border-gray-300'
                                    }`}
                            >
                                <MaterialCommunityIcons
                                    name={filter.icon as any}
                                    size={16}
                                    color={selectedFilter === filter.id ? '#ffffff' : '#6b7280'}
                                />
                                <Text
                                    className={`font-semibold text-sm ${selectedFilter === filter.id
                                        ? 'text-white'
                                        : 'text-gray-700'
                                        }`}
                                >
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Stats */}
            <View className="bg-white px-6 py-4 border-b border-gray-200">
                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <Text className="text-gray-600 text-sm mb-1">Total Scanned</Text>
                        <Text className="text-2xl font-bold text-gray-900">
                            {messages.length}
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-600 text-sm mb-1">Spam</Text>
                        <Text className="text-2xl font-bold text-red-600">
                            {messages.filter(m => m.isSpam).length}
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-600 text-sm mb-1">Safe</Text>
                        <Text className="text-2xl font-bold text-green-600">
                            {messages.filter(m => !m.isSpam).length}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Messages List */}
            <FlatList
                data={filteredMessages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MessageItem msg={item} />}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                }}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-16">
                        <MaterialCommunityIcons
                            name={
                                selectedFilter === 'spam'
                                    ? 'check-circle'
                                    : 'inbox-multiple'
                            }
                            size={64}
                            color="#d1d5db"
                        />
                        <Text className="text-gray-600 text-center mt-4 text-lg">
                            {selectedFilter === 'spam'
                                ? 'No spam messages found'
                                : selectedFilter === 'safe'
                                    ? 'No safe messages found'
                                    : 'No messages in history'}
                        </Text>
                        <Text className="text-gray-500 text-center mt-2 text-sm px-4">
                            {selectedFilter === 'spam'
                                ? 'Great! You have no spam messages.'
                                : selectedFilter === 'safe'
                                    ? 'Keep your inbox clean!'
                                    : 'Start scanning messages to build your history.'}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
