import { useApp } from '@/src/contexts/AppContext';
import { Message } from '@/src/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
    const { messages, deleteMessage } = useApp();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'spam' | 'safe'>('all');

    const filters = [
        { id: 'all', label: 'All Messages', icon: 'inbox-multiple', gradient: ['#3b82f6', '#2563eb'] },
        { id: 'spam', label: 'Spam', icon: 'alert-circle', gradient: ['#ef4444', '#dc2626'] },
        { id: 'safe', label: 'Safe', icon: 'check-circle', gradient: ['#10b981', '#059669'] },
    ];

    const filteredMessages = messages.filter((msg) => {
        if (selectedFilter === 'spam') return msg.isSpam;
        if (selectedFilter === 'safe') return !msg.isSpam;
        return true;
    });

    const stats = {
        total: messages.length,
        spam: messages.filter(m => m.isSpam).length,
        safe: messages.filter(m => !m.isSpam).length,
        accuracy: messages.length > 0 ? ((messages.filter(m => m.confidence > 0.8).length / messages.length) * 100).toFixed(1) : '0',
    };

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

    const handleDelete = (id: string, content: string) => {
        Alert.alert(
            'Delete Message',
            `Are you sure you want to delete this message?\n\n"${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteMessage(id),
                },
            ]
        );
    };

    const MessageItem = ({ msg }: { msg: Message }) => (
        <View
            style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
                borderLeftWidth: 4,
                borderLeftColor: msg.isSpam ? '#ef4444' : '#10b981',
            }}
        >
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                    <Text
                        style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 8, lineHeight: 20 }}
                        numberOfLines={2}
                    >
                        {msg.content.substring(0, 80)}
                        {msg.content.length > 80 ? '...' : ''}
                    </Text>

                    {/* Tags */}
                    <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
                        <View style={{ backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 11, fontWeight: '600', color: '#64748b', textTransform: 'capitalize' }}>
                                {msg.channel}
                            </Text>
                        </View>
                        <View style={{ backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 11, fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>
                                {msg.language}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <MaterialCommunityIcons name="clock-outline" size={12} color="#94a3b8" />
                            <Text style={{ fontSize: 11, color: '#94a3b8' }}>
                                {formatDate(msg.timestamp)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Status Badge */}
                <LinearGradient
                    colors={msg.isSpam ? ['#ef4444', '#dc2626'] : ['#10b981', '#059669'] as any}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 12,
                        shadowColor: msg.isSpam ? '#ef4444' : '#10b981',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#ffffff' }}>
                        {msg.isSpam ? 'SPAM' : 'SAFE'}
                    </Text>
                </LinearGradient>
            </View>

            {/* Confidence Bar */}
            <View style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b' }}>
                        Confidence
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: msg.isSpam ? '#ef4444' : '#10b981' }}>
                        {(msg.confidence * 100).toFixed(0)}%
                    </Text>
                </View>
                <View style={{ backgroundColor: '#f1f5f9', borderRadius: 6, height: 6, overflow: 'hidden' }}>
                    <LinearGradient
                        colors={msg.isSpam ? ['#ef4444', '#dc2626'] : ['#10b981', '#059669'] as any}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: `${msg.confidence * 100}%`,
                            height: '100%',
                        }}
                    />
                </View>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
                onPress={() => handleDelete(msg.id, msg.content)}
                activeOpacity={0.7}
                style={{
                    backgroundColor: '#fef2f2',
                    borderRadius: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}
            >
                <MaterialCommunityIcons name="trash-can-outline" size={16} color="#ef4444" />
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#ef4444' }}>
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
            <LinearGradient
                colors={['#3b82f6', '#2563eb', '#f8fafc']}
                locations={[0, 0.25, 0.6]}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 }}>
                            History
                        </Text>
                        <Text style={{ fontSize: 14, color: '#dbeafe' }}>
                            Review your scanned messages
                        </Text>
                    </View>

                    {/* Statistics Cards */}
                    <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                            {/* Total Scanned */}
                            <View style={{ flex: 1 }}>
                                <LinearGradient
                                    colors={['#3b82f6', '#2563eb'] as any}
                                    style={{
                                        borderRadius: 16,
                                        padding: 16,
                                        shadowColor: '#3b82f6',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 4,
                                    }}
                                >
                                    <MaterialCommunityIcons name="shield-search" size={24} color="#ffffff" style={{ marginBottom: 8 }} />
                                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 2 }}>
                                        {stats.total}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#dbeafe', fontWeight: '600' }}>
                                        Total Scanned
                                    </Text>
                                </LinearGradient>
                            </View>

                            {/* Accuracy */}
                            <View style={{ flex: 1 }}>
                                <LinearGradient
                                    colors={['#8b5cf6', '#6d28d9'] as any}
                                    style={{
                                        borderRadius: 16,
                                        padding: 16,
                                        shadowColor: '#8b5cf6',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 4,
                                    }}
                                >
                                    <MaterialCommunityIcons name="chart-line" size={24} color="#ffffff" style={{ marginBottom: 8 }} />
                                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 2 }}>
                                        {stats.accuracy}%
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#ede9fe', fontWeight: '600' }}>
                                        Accuracy
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            {/* Spam Count */}
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <MaterialCommunityIcons name="alert-circle" size={24} color="#ef4444" style={{ marginBottom: 8 }} />
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ef4444', marginBottom: 2 }}>
                                        {stats.spam}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#64748b', fontWeight: '600' }}>
                                        Spam Blocked
                                    </Text>
                                </View>
                            </View>

                            {/* Safe Count */}
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" style={{ marginBottom: 8 }} />
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#10b981', marginBottom: 2 }}>
                                        {stats.safe}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#64748b', fontWeight: '600' }}>
                                        Safe Messages
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Filters */}
                    <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                            Filter Messages
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            {filters.map((filter) => (
                                <TouchableOpacity
                                    key={filter.id}
                                    onPress={() => setSelectedFilter(filter.id as any)}
                                    activeOpacity={0.8}
                                    style={{ flex: 1 }}
                                >
                                    <LinearGradient
                                        colors={selectedFilter === filter.id ? filter.gradient as any : ['#ffffff', '#ffffff']}
                                        style={{
                                            paddingVertical: 12,
                                            paddingHorizontal: 12,
                                            borderRadius: 12,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 6,
                                            borderWidth: selectedFilter === filter.id ? 0 : 1,
                                            borderColor: '#e2e8f0',
                                            shadowColor: selectedFilter === filter.id ? filter.gradient[0] : '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: selectedFilter === filter.id ? 0.3 : 0.05,
                                            shadowRadius: 4,
                                            elevation: selectedFilter === filter.id ? 3 : 1,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={filter.icon as any}
                                            size={16}
                                            color={selectedFilter === filter.id ? '#ffffff' : '#64748b'}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '600',
                                                color: selectedFilter === filter.id ? '#ffffff' : '#64748b',
                                            }}
                                        >
                                            {filter.label}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Messages List */}
                    <FlatList
                        data={filteredMessages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <MessageItem msg={item} />}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: 24,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
                                <View
                                    style={{
                                        backgroundColor: '#f1f5f9',
                                        borderRadius: 40,
                                        padding: 24,
                                        marginBottom: 16,
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            selectedFilter === 'spam'
                                                ? 'shield-check'
                                                : selectedFilter === 'safe'
                                                    ? 'alert-circle-outline'
                                                    : 'inbox-multiple-outline'
                                        }
                                        size={48}
                                        color="#94a3b8"
                                    />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#0f172a', marginBottom: 8, textAlign: 'center' }}>
                                    {selectedFilter === 'spam'
                                        ? 'No Spam Messages'
                                        : selectedFilter === 'safe'
                                            ? 'No Safe Messages'
                                            : 'No Messages Yet'}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center', paddingHorizontal: 32 }}>
                                    {selectedFilter === 'spam'
                                        ? 'Great! You have no spam messages.'
                                        : selectedFilter === 'safe'
                                            ? 'No safe messages found in your history.'
                                            : 'Start scanning messages to build your history.'}
                                </Text>
                            </View>
                        }
                    />
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
