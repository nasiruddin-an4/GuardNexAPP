import { useApp } from '@/src/contexts/AppContext';
import { ScanResult } from '@/src/types';
import { generateScanResult } from '@/src/utils/mockData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for recent messages and emails
const mockRecentMessages = [
    { id: '1', content: 'Congratulations! You won $10,000. Click here to claim now!', sender: 'Unknown', type: 'sms' },
    { id: '2', content: 'Your package delivery is pending. Confirm your address here.', sender: '+1234567890', type: 'sms' },
    { id: '3', content: 'Hey, are we still meeting for lunch tomorrow?', sender: 'John', type: 'sms' },
];

const mockRecentEmails = [
    { id: '1', content: 'URGENT: Your account will be suspended. Verify now!', sender: 'security@fake-bank.com', type: 'email' },
    { id: '2', content: 'Meeting reminder: Project review at 3 PM', sender: 'team@company.com', type: 'email' },
    { id: '3', content: 'Limited time offer! 90% discount on all items!', sender: 'deals@shop.com', type: 'email' },
];

export default function ScanScreen() {
    const { addMessage } = useApp();
    const [message, setMessage] = useState('');
    const [channel, setChannel] = useState<'email' | 'sms' | 'social'>('sms');
    const [result, setResult] = useState<ScanResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showQuickScan, setShowQuickScan] = useState(true);

    const channels = [
        { id: 'sms', label: 'SMS', icon: 'message-text', gradient: ['#3b82f6', '#2563eb'] },
        { id: 'email', label: 'Email', icon: 'email', gradient: ['#10b981', '#059669'] },
        { id: 'social', label: 'Social', icon: 'chat', gradient: ['#8b5cf6', '#6d28d9'] },
    ];

    const handleScan = async () => {
        if (!message.trim()) {
            Alert.alert('Empty Message', 'Please enter a message to scan');
            return;
        }

        setIsScanning(true);
        setShowQuickScan(false);

        // Simulate API call delay
        setTimeout(async () => {
            const scanResult = generateScanResult(message, channel);
            setResult(scanResult);

            // Save to history
            await addMessage({
                id: `msg_${Date.now()}`,
                content: message,
                channel,
                isSpam: scanResult.isSpam,
                confidence: scanResult.confidence,
                timestamp: new Date().toISOString(),
                language: 'en',
            });

            setIsScanning(false);
        }, 1500);
    };

    const handleQuickScan = (content: string, type: 'sms' | 'email') => {
        setMessage(content);
        setChannel(type);
        setShowQuickScan(false);
    };

    const clearResult = () => {
        setResult(null);
        setMessage('');
        setShowQuickScan(true);
    };

    const riskColors = {
        low: { bg: '#d1fae5', text: '#065f46', icon: '#10b981', gradient: ['#10b981', '#059669'] },
        medium: { bg: '#fef3c7', text: '#92400e', icon: '#f59e0b', gradient: ['#f59e0b', '#d97706'] },
        high: { bg: '#fee2e2', text: '#7f1d1d', icon: '#ef4444', gradient: ['#ef4444', '#dc2626'] },
    };

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
                            Scan Message
                        </Text>
                        <Text style={{ fontSize: 14, color: '#dbeafe' }}>
                            Detect spam with AI-powered analysis
                        </Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    >
                        {!result ? (
                            <View>
                                {/* Channel Selection */}
                                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                                        Select Channel
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: 12 }}>
                                        {channels.map((ch) => (
                                            <TouchableOpacity
                                                key={ch.id}
                                                onPress={() => setChannel(ch.id as 'email' | 'sms' | 'social')}
                                                activeOpacity={0.8}
                                                style={{ flex: 1 }}
                                            >
                                                <LinearGradient
                                                    colors={channel === ch.id ? ch.gradient as any : ['#ffffff', '#ffffff']}
                                                    style={{
                                                        padding: 16,
                                                        borderRadius: 16,
                                                        alignItems: 'center',
                                                        borderWidth: 2,
                                                        borderColor: channel === ch.id ? 'transparent' : '#e2e8f0',
                                                        shadowColor: channel === ch.id ? ch.gradient[0] : '#000',
                                                        shadowOffset: { width: 0, height: 2 },
                                                        shadowOpacity: channel === ch.id ? 0.3 : 0.05,
                                                        shadowRadius: 8,
                                                        elevation: channel === ch.id ? 4 : 2,
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name={ch.icon as any}
                                                        size={28}
                                                        color={channel === ch.id ? '#ffffff' : '#64748b'}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: '600',
                                                            color: channel === ch.id ? '#ffffff' : '#64748b',
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        {ch.label}
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Quick Scan Section */}
                                {showQuickScan && (
                                    <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a' }}>
                                                Quick Scan
                                            </Text>
                                            <TouchableOpacity onPress={() => setShowQuickScan(false)}>
                                                <MaterialCommunityIcons name="close" size={20} color="#64748b" />
                                            </TouchableOpacity>
                                        </View>

                                        {/* Recent Messages */}
                                        {channel === 'sms' && (
                                            <View>
                                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>
                                                    Recent SMS Messages
                                                </Text>
                                                {mockRecentMessages.map((msg) => (
                                                    <TouchableOpacity
                                                        key={msg.id}
                                                        onPress={() => handleQuickScan(msg.content, 'sms')}
                                                        activeOpacity={0.7}
                                                        style={{
                                                            backgroundColor: '#ffffff',
                                                            borderRadius: 12,
                                                            padding: 12,
                                                            marginBottom: 8,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 1 },
                                                            shadowOpacity: 0.05,
                                                            shadowRadius: 4,
                                                            elevation: 2,
                                                        }}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                                            <MaterialCommunityIcons name="message-text" size={16} color="#3b82f6" />
                                                            <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', marginLeft: 6 }}>
                                                                {msg.sender}
                                                            </Text>
                                                        </View>
                                                        <Text style={{ fontSize: 13, color: '#0f172a', lineHeight: 18 }} numberOfLines={2}>
                                                            {msg.content}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}

                                        {/* Recent Emails */}
                                        {channel === 'email' && (
                                            <View>
                                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>
                                                    Recent Emails
                                                </Text>
                                                {mockRecentEmails.map((email) => (
                                                    <TouchableOpacity
                                                        key={email.id}
                                                        onPress={() => handleQuickScan(email.content, 'email')}
                                                        activeOpacity={0.7}
                                                        style={{
                                                            backgroundColor: '#ffffff',
                                                            borderRadius: 12,
                                                            padding: 12,
                                                            marginBottom: 8,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 1 },
                                                            shadowOpacity: 0.05,
                                                            shadowRadius: 4,
                                                            elevation: 2,
                                                        }}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                                            <MaterialCommunityIcons name="email" size={16} color="#10b981" />
                                                            <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', marginLeft: 6 }}>
                                                                {email.sender}
                                                            </Text>
                                                        </View>
                                                        <Text style={{ fontSize: 13, color: '#0f172a', lineHeight: 18 }} numberOfLines={2}>
                                                            {email.content}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                )}

                                {/* Manual Input Section */}
                                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                                        Enter Message Manually
                                    </Text>
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
                                        <TextInput
                                            style={{
                                                fontSize: 15,
                                                color: '#0f172a',
                                                minHeight: 120,
                                                textAlignVertical: 'top',
                                            }}
                                            placeholder="Paste or type the message you want to scan..."
                                            placeholderTextColor="#94a3b8"
                                            value={message}
                                            onChangeText={setMessage}
                                            multiline
                                            editable={!isScanning}
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' }}>
                                            <Text style={{ fontSize: 12, color: '#94a3b8' }}>
                                                {message.length} characters
                                            </Text>
                                            {message.length > 0 && (
                                                <TouchableOpacity onPress={() => setMessage('')}>
                                                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#ef4444' }}>
                                                        Clear
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {/* Scan Button */}
                                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                                    <TouchableOpacity
                                        onPress={handleScan}
                                        disabled={isScanning || !message.trim()}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={isScanning || !message.trim() ? ['#cbd5e1', '#94a3b8'] : ['#3b82f6', '#2563eb'] as any}
                                            style={{
                                                paddingVertical: 16,
                                                borderRadius: 16,
                                                shadowColor: '#3b82f6',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: isScanning || !message.trim() ? 0 : 0.3,
                                                shadowRadius: 8,
                                                elevation: isScanning || !message.trim() ? 0 : 4,
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                                <MaterialCommunityIcons
                                                    name={isScanning ? 'loading' : 'shield-search'}
                                                    size={22}
                                                    color="#ffffff"
                                                />
                                                <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: 'bold' }}>
                                                    {isScanning ? 'Scanning...' : 'Scan Message'}
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                {/* Info Card */}
                                <View style={{ paddingHorizontal: 24 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#dbeafe',
                                            borderRadius: 16,
                                            padding: 16,
                                            borderLeftWidth: 4,
                                            borderLeftColor: '#3b82f6',
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', gap: 12 }}>
                                            <MaterialCommunityIcons name="information" size={24} color="#2563eb" />
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1e40af', marginBottom: 4 }}>
                                                    How it works
                                                </Text>
                                                <Text style={{ fontSize: 13, color: '#1e3a8a', lineHeight: 18 }}>
                                                    GuardNex uses advanced ML algorithms trained on multilingual datasets to detect spam patterns with 92% accuracy across Email, SMS, and Social Media.
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            /* Result Section */
                            <View style={{ paddingHorizontal: 24 }}>
                                {/* Result Card */}
                                <LinearGradient
                                    colors={riskColors[result.riskLevel].gradient as any}
                                    style={{
                                        borderRadius: 20,
                                        padding: 24,
                                        alignItems: 'center',
                                        marginBottom: 20,
                                        shadowColor: riskColors[result.riskLevel].icon,
                                        shadowOffset: { width: 0, height: 8 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 12,
                                        elevation: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                            borderRadius: 40,
                                            padding: 16,
                                            marginBottom: 16,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={
                                                result.riskLevel === 'high'
                                                    ? 'alert-circle'
                                                    : result.riskLevel === 'medium'
                                                        ? 'alert'
                                                        : 'check-circle'
                                            }
                                            size={56}
                                            color="#ffffff"
                                        />
                                    </View>
                                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 8, textAlign: 'center' }}>
                                        {result.isSpam ? 'SPAM DETECTED' : 'LEGITIMATE'}
                                    </Text>
                                    <Text style={{ fontSize: 15, color: '#ffffff', opacity: 0.9, textTransform: 'capitalize' }}>
                                        Risk Level: {result.riskLevel}
                                    </Text>
                                </LinearGradient>

                                {/* Confidence Score */}
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 20,
                                        marginBottom: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a' }}>
                                            Confidence Score
                                        </Text>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: riskColors[result.riskLevel].icon }}>
                                            {(result.confidence * 100).toFixed(1)}%
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: '#f1f5f9', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                                        <LinearGradient
                                            colors={riskColors[result.riskLevel].gradient as any}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={{
                                                width: `${result.confidence * 100}%`,
                                                height: '100%',
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* Analysis Details */}
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 20,
                                        marginBottom: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                                        Analysis
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#475569', lineHeight: 20 }}>
                                        {result.details}
                                    </Text>
                                </View>

                                {/* Message Preview */}
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 20,
                                        marginBottom: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                                        Scanned Message
                                    </Text>
                                    <View style={{ backgroundColor: '#f8fafc', borderRadius: 12, padding: 12 }}>
                                        <Text style={{ fontSize: 13, color: '#475569', lineHeight: 18 }}>
                                            {result.message}
                                        </Text>
                                    </View>
                                </View>

                                {/* Metadata */}
                                <View
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 20,
                                        marginBottom: 24,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Channel</Text>
                                            <View style={{ backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
                                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2563eb', textTransform: 'capitalize' }}>
                                                    {result.channel}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Scanned At</Text>
                                            <Text style={{ fontSize: 13, fontWeight: '600', color: '#0f172a' }}>
                                                {new Date().toLocaleTimeString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={{ gap: 12, marginBottom: 16 }}>
                                    <TouchableOpacity onPress={clearResult} activeOpacity={0.8}>
                                        <LinearGradient
                                            colors={['#3b82f6', '#2563eb'] as any}
                                            style={{
                                                paddingVertical: 16,
                                                borderRadius: 16,
                                                shadowColor: '#3b82f6',
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 8,
                                                elevation: 4,
                                            }}
                                        >
                                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                                Scan Another Message
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{
                                            backgroundColor: '#f1f5f9',
                                            paddingVertical: 14,
                                            borderRadius: 16,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            <MaterialCommunityIcons name="share-variant" size={20} color="#64748b" />
                                            <Text style={{ color: '#64748b', fontSize: 15, fontWeight: '600' }}>
                                                Share Result
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
