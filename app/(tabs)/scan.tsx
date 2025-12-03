import { useApp } from '@/src/contexts/AppContext';
import { ScanResult } from '@/src/types';
import { generateScanResult } from '@/src/utils/mockData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
    const { addMessage } = useApp();
    const [message, setMessage] = useState('');
    const [channel, setChannel] = useState<'email' | 'sms' | 'social'>('sms');
    const [result, setResult] = useState<ScanResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const channels = [
        { id: 'sms', label: 'SMS', icon: 'message' },
        { id: 'email', label: 'Email', icon: 'email' },
        { id: 'social', label: 'Social Media', icon: 'chat' },
    ];

    const handleScan = async () => {
        if (!message.trim()) {
            alert('Please enter a message to scan');
            return;
        }

        setIsScanning(true);

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

    const clearResult = () => {
        setResult(null);
        setMessage('');
    };

    const riskColors = {
        low: { bg: '#dcfce7', text: '#166534', icon: '#10b981' },
        medium: { bg: '#fef3c7', text: '#92400e', icon: '#f59e0b' },
        high: { bg: '#fee2e2', text: '#7f1d1d', icon: '#ef4444' },
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="px-6 py-6">
                {/* Input Section */}
                {!result ? (
                    <View>
                        {/* Channel Selection */}
                        <View className="mb-6">
                            <Text className="text-lg font-bold text-gray-900 mb-3">
                                Message Channel
                            </Text>
                            <View className="flex-row gap-3">
                                {channels.map((ch) => (
                                    <TouchableOpacity
                                        key={ch.id}
                                        onPress={() => setChannel(ch.id as 'email' | 'sms' | 'social')}
                                        className={`flex-1 p-3 rounded-lg border-2 items-center ${channel === ch.id
                                                ? 'bg-blue-100 border-blue-600'
                                                : 'bg-white border-gray-200'
                                            }`}
                                    >
                                        <MaterialCommunityIcons
                                            name={ch.icon as any}
                                            size={24}
                                            color={channel === ch.id ? '#2563eb' : '#9ca3af'}
                                        />
                                        <Text
                                            className={`text-xs font-medium mt-2 ${channel === ch.id ? 'text-blue-600' : 'text-gray-600'
                                                }`}
                                        >
                                            {ch.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Message Input */}
                        <View className="mb-6">
                            <Text className="text-lg font-bold text-gray-900 mb-3">
                                Enter Message
                            </Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg p-4 text-gray-900 min-h-32"
                                placeholder="Paste the message you want to check for spam..."
                                placeholderTextColor="#9ca3af"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                editable={!isScanning}
                                textAlignVertical="top"
                            />
                            <Text className="text-gray-500 text-xs mt-2">
                                {message.length} characters
                            </Text>
                        </View>

                        {/* Scan Button */}
                        <TouchableOpacity
                            onPress={handleScan}
                            disabled={isScanning || !message.trim()}
                            className={`py-4 rounded-lg ${isScanning || !message.trim()
                                    ? 'bg-gray-300'
                                    : 'bg-blue-600'
                                }`}
                        >
                            <View className="flex-row items-center justify-center gap-2">
                                {isScanning && (
                                    <MaterialCommunityIcons
                                        name="loading"
                                        size={20}
                                        color="white"
                                    />
                                )}
                                <Text className="text-white text-lg font-bold">
                                    {isScanning ? 'Scanning...' : 'Scan Message'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Info Box */}
                        <View className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <View className="flex-row gap-3">
                                <MaterialCommunityIcons
                                    name="information"
                                    size={24}
                                    color="#2563eb"
                                />
                                <View className="flex-1">
                                    <Text className="text-blue-900 font-bold mb-1">
                                        How it works
                                    </Text>
                                    <Text className="text-blue-800 text-sm">
                                        GuardNex uses advanced ML algorithms trained on multilingual datasets to detect spam patterns with 92% accuracy across Email, SMS, and Social Media.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    /* Result Section */
                    <View>
                        <View className="mb-6">
                            <View
                                style={{ backgroundColor: riskColors[result.riskLevel].bg }}
                                className="rounded-lg p-6 items-center mb-6"
                            >
                                <MaterialCommunityIcons
                                    name={
                                        result.riskLevel === 'high'
                                            ? 'alert-circle'
                                            : result.riskLevel === 'medium'
                                                ? 'alert'
                                                : 'check-circle'
                                    }
                                    size={64}
                                    color={riskColors[result.riskLevel].icon}
                                />
                                <Text
                                    className="text-2xl font-bold mt-4"
                                    style={{ color: riskColors[result.riskLevel].text }}
                                >
                                    {result.isSpam ? '⚠️ SPAM DETECTED' : '✓ LEGITIMATE'}
                                </Text>
                                <Text
                                    className="text-sm mt-2 font-medium capitalize"
                                    style={{ color: riskColors[result.riskLevel].text }}
                                >
                                    Risk Level: {result.riskLevel}
                                </Text>
                            </View>

                            {/* Confidence Score */}
                            <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                                <View className="flex-row justify-between items-center mb-3">
                                    <Text className="text-gray-900 font-semibold">
                                        Confidence Score
                                    </Text>
                                    <Text className="text-xl font-bold text-blue-600">
                                        {(result.confidence * 100).toFixed(1)}%
                                    </Text>
                                </View>
                                <View className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <View
                                        style={{
                                            width: `${result.confidence * 100}%`,
                                            backgroundColor: result.isSpam ? '#ef4444' : '#10b981',
                                        }}
                                        className="h-full"
                                    />
                                </View>
                            </View>

                            {/* Details */}
                            <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                                <Text className="text-gray-900 font-semibold mb-3">Analysis</Text>
                                <Text className="text-gray-700 leading-5">{result.details}</Text>
                            </View>

                            {/* Message Preview */}
                            <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                                <Text className="text-gray-900 font-semibold mb-3">Message</Text>
                                <View className="bg-gray-50 rounded p-3">
                                    <Text className="text-gray-700">{result.message}</Text>
                                </View>
                            </View>

                            {/* Channel & Language */}
                            <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                                <View className="flex-row justify-between">
                                    <View>
                                        <Text className="text-gray-600 text-sm mb-1">Channel</Text>
                                        <View className="bg-blue-100 px-3 py-1 rounded">
                                            <Text className="text-blue-700 font-medium capitalize">
                                                {result.channel}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text className="text-gray-600 text-sm mb-1">Timestamp</Text>
                                        <Text className="text-gray-900 font-medium">
                                            {new Date().toLocaleTimeString()}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="gap-3 mb-8">
                            <TouchableOpacity
                                onPress={clearResult}
                                className="bg-blue-600 py-4 rounded-lg"
                            >
                                <Text className="text-white text-lg font-bold text-center">
                                    Scan Another Message
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-200 py-4 rounded-lg">
                                <View className="flex-row items-center justify-center gap-2">
                                    <MaterialCommunityIcons
                                        name="share"
                                        size={20}
                                        color="#374151"
                                    />
                                    <Text className="text-gray-800 text-lg font-bold">
                                        Share Result
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
