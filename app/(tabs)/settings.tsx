import { useApp } from '@/src/contexts/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();
    const { user, updateUser, resetApp } = useApp();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    // Modal states
    const [showNameModal, setShowNameModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [tempName, setTempName] = useState(user?.name || '');

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'bn', name: 'Bangla', flag: '🇧🇩' },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await resetApp();
                        router.replace('/(auth)/onboarding' as any);
                    },
                },
            ]
        );
    };

    const handleResetData = () => {
        Alert.alert(
            'Clear History',
            'This will delete all your scan records. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => { } },
            ]
        );
    };

    const handleSaveName = async () => {
        if (tempName.trim()) {
            await updateUser({ name: tempName.trim() });
            setShowNameModal(false);
            Alert.alert('Success', 'Your name has been updated!');
        } else {
            Alert.alert('Error', 'Please enter a valid name');
        }
    };

    const handleSelectLanguage = async (languageCode: string) => {
        await updateUser({ language: languageCode });
        setShowLanguageModal(false);
        Alert.alert('Success', 'Language has been updated!');
    };

    const settingItems = [
        {
            id: '2',
            title: 'Language',
            subtitle: languages.find(l => l.code === user?.language)?.name || 'English',
            icon: 'translate',
            gradient: ['#10b981', '#059669'],
            onPress: () => setShowLanguageModal(true),
        },
        {
            id: '3',
            title: 'Privacy & Security',
            subtitle: 'Manage your privacy settings',
            icon: 'shield-lock',
            gradient: ['#8b5cf6', '#6d28d9'],
            onPress: () => {
                Alert.alert('Privacy & Security', 'Privacy settings coming soon!');
            },
        },
    ];

    const dataItems = [
        {
            id: '1',
            title: 'Export Data',
            subtitle: 'Download your scan history',
            icon: 'download',
            gradient: ['#3b82f6', '#2563eb'],
            onPress: () => {
                Alert.alert('Export Data', 'Export functionality coming soon!');
            },
        },
        {
            id: '2',
            title: 'Clear History',
            subtitle: 'Delete all scan records',
            icon: 'delete-sweep',
            gradient: ['#ef4444', '#dc2626'],
            onPress: handleResetData,
            danger: true,
        },
    ];

    const supportItems = [
        {
            id: '1',
            title: 'Help Center',
            subtitle: 'FAQs and support guides',
            icon: 'help-circle',
            gradient: ['#f59e0b', '#d97706'],
            onPress: () => {
                Alert.alert('Help Center', 'Help documentation coming soon!');
            },
        },
        {
            id: '2',
            title: 'Feedback',
            subtitle: 'Send us your thoughts',
            icon: 'message-text',
            gradient: ['#10b981', '#059669'],
            onPress: () => {
                Alert.alert('Feedback', 'Thank you for your interest! Feedback form coming soon.');
            },
        },
        {
            id: '3',
            title: 'About GuardNex',
            subtitle: 'App information',
            icon: 'information',
            gradient: ['#6366f1', '#4f46e5'],
            onPress: () => setShowAboutModal(true),
        },
    ];

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
                            Settings
                        </Text>
                        <Text style={{ fontSize: 14, color: '#dbeafe' }}>
                            Manage your account and preferences
                        </Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    >
                        {/* User Profile Card */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <LinearGradient
                                colors={['#ffffff', '#f8fafc'] as any}
                                style={{
                                    borderRadius: 20,
                                    padding: 20,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 12,
                                    elevation: 6,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                                    <LinearGradient
                                        colors={['#3b82f6', '#2563eb'] as any}
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 36,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#3b82f6',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 4,
                                        }}
                                    >
                                        <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: 'bold' }}>
                                            {(user?.name || 'U').charAt(0).toUpperCase()}
                                        </Text>
                                    </LinearGradient>

                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>
                                            {user?.name || 'User'}
                                        </Text>
                                        <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                                            {user?.email || 'user@example.com'}
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: '#dbeafe',
                                                paddingHorizontal: 12,
                                                paddingVertical: 4,
                                                borderRadius: 12,
                                                alignSelf: 'flex-start',
                                            }}
                                        >
                                            <Text style={{ color: '#2563eb', fontSize: 11, fontWeight: '700' }}>
                                                PREMIUM USER
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => {
                                        setTempName(user?.name || '');
                                        setShowNameModal(true);
                                    }}>
                                        <View
                                            style={{
                                                backgroundColor: '#f1f5f9',
                                                borderRadius: 12,
                                                padding: 10,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="pencil" size={20} color="#64748b" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Preferences Section */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 }}>
                                Preferences
                            </Text>

                            {/* Notifications Toggle */}
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
                                    elevation: 2,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                        <LinearGradient
                                            colors={['#a855f7', '#9333ea'] as any}
                                            style={{
                                                borderRadius: 12,
                                                padding: 10,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="bell" size={22} color="#ffffff" />
                                        </LinearGradient>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 2 }}>
                                                Notifications
                                            </Text>
                                            <Text style={{ fontSize: 12, color: '#64748b' }}>
                                                {notifications ? 'Enabled' : 'Disabled'}
                                            </Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={notifications}
                                        onValueChange={setNotifications}
                                        trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
                                        thumbColor={notifications ? '#3b82f6' : '#f1f5f9'}
                                        ios_backgroundColor="#cbd5e1"
                                    />
                                </View>
                            </View>

                            {/* Dark Mode Toggle */}
                            <View
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 16,
                                    padding: 16,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.06,
                                    shadowRadius: 8,
                                    elevation: 2,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                        <LinearGradient
                                            colors={['#475569', '#334155'] as any}
                                            style={{
                                                borderRadius: 12,
                                                padding: 10,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="moon-waning-crescent" size={22} color="#ffffff" />
                                        </LinearGradient>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 2 }}>
                                                Dark Mode
                                            </Text>
                                            <Text style={{ fontSize: 12, color: '#64748b' }}>
                                                {darkMode ? 'Enabled' : 'Disabled'}
                                            </Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={darkMode}
                                        onValueChange={setDarkMode}
                                        trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
                                        thumbColor={darkMode ? '#3b82f6' : '#f1f5f9'}
                                        ios_backgroundColor="#cbd5e1"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Account Settings Section */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 }}>
                                Account Settings
                            </Text>

                            {settingItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={item.onPress}
                                    activeOpacity={0.7}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 16,
                                        marginBottom: 12,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 2,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                            <LinearGradient
                                                colors={item.gradient as any}
                                                style={{
                                                    borderRadius: 12,
                                                    padding: 10,
                                                }}
                                            >
                                                <MaterialCommunityIcons name={item.icon as any} size={22} color="#ffffff" />
                                            </LinearGradient>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 2 }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={{ fontSize: 12, color: '#64748b' }}>
                                                    {item.subtitle}
                                                </Text>
                                            </View>
                                        </View>
                                        <MaterialCommunityIcons name="chevron-right" size={22} color="#cbd5e1" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Data Management Section */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 }}>
                                Data Management
                            </Text>

                            {dataItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={item.onPress}
                                    activeOpacity={0.7}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 16,
                                        marginBottom: 12,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 2,
                                        borderWidth: item.danger ? 1 : 0,
                                        borderColor: item.danger ? '#fecaca' : 'transparent',
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                            <LinearGradient
                                                colors={item.gradient as any}
                                                style={{
                                                    borderRadius: 12,
                                                    padding: 10,
                                                }}
                                            >
                                                <MaterialCommunityIcons name={item.icon as any} size={22} color="#ffffff" />
                                            </LinearGradient>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 15, fontWeight: '600', color: item.danger ? '#ef4444' : '#0f172a', marginBottom: 2 }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={{ fontSize: 12, color: '#64748b' }}>
                                                    {item.subtitle}
                                                </Text>
                                            </View>
                                        </View>
                                        <MaterialCommunityIcons name="chevron-right" size={22} color="#cbd5e1" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Help & Support Section */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 }}>
                                Help & Support
                            </Text>

                            {supportItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={item.onPress}
                                    activeOpacity={0.7}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 16,
                                        padding: 16,
                                        marginBottom: 12,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        elevation: 2,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                                            <LinearGradient
                                                colors={item.gradient as any}
                                                style={{
                                                    borderRadius: 12,
                                                    padding: 10,
                                                }}
                                            >
                                                <MaterialCommunityIcons name={item.icon as any} size={22} color="#ffffff" />
                                            </LinearGradient>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 2 }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={{ fontSize: 12, color: '#64748b' }}>
                                                    {item.subtitle}
                                                </Text>
                                            </View>
                                        </View>
                                        <MaterialCommunityIcons name="chevron-right" size={22} color="#cbd5e1" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Logout Button */}
                        <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
                            <TouchableOpacity
                                onPress={handleLogout}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#ef4444', '#dc2626'] as any}
                                    style={{
                                        borderRadius: 16,
                                        padding: 16,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        shadowColor: '#ef4444',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 4,
                                    }}
                                >
                                    <MaterialCommunityIcons name="logout" size={22} color="#ffffff" />
                                    <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
                                        Logout
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>

            {/* Edit Name Modal */}
            <Modal
                visible={showNameModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowNameModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 }}>
                            Edit Name
                        </Text>
                        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
                            Update your display name
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: '#f8fafc',
                                borderRadius: 12,
                                padding: 16,
                                fontSize: 16,
                                color: '#0f172a',
                                marginBottom: 24,
                                borderWidth: 1,
                                borderColor: '#e2e8f0',
                            }}
                            placeholder="Enter your name"
                            placeholderTextColor="#94a3b8"
                            value={tempName}
                            onChangeText={setTempName}
                            autoFocus
                        />

                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={() => setShowNameModal(false)}
                                style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#64748b' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSaveName}
                                style={{ flex: 1 }}
                            >
                                <LinearGradient
                                    colors={['#3b82f6', '#2563eb'] as any}
                                    style={{ borderRadius: 12, padding: 16, alignItems: 'center' }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>
                                        Save
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Language Selection Modal */}
            <Modal
                visible={showLanguageModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 }}>
                            Select Language
                        </Text>
                        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
                            Choose your preferred language
                        </Text>

                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                onPress={() => handleSelectLanguage(lang.code)}
                                style={{
                                    backgroundColor: user?.language === lang.code ? '#eff6ff' : '#f8fafc',
                                    borderRadius: 12,
                                    padding: 16,
                                    marginBottom: 12,
                                    borderWidth: 2,
                                    borderColor: user?.language === lang.code ? '#3b82f6' : '#e2e8f0',
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                        <Text style={{ fontSize: 32 }}>{lang.flag}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a' }}>
                                            {lang.name}
                                        </Text>
                                    </View>
                                    {user?.language === lang.code && (
                                        <MaterialCommunityIcons name="check-circle" size={24} color="#3b82f6" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            onPress={() => setShowLanguageModal(false)}
                            style={{ backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#64748b' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* About Modal */}
            <Modal
                visible={showAboutModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowAboutModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400 }}>
                        <LinearGradient
                            colors={['#6366f1', '#4f46e5'] as any}
                            style={{
                                borderRadius: 16,
                                padding: 20,
                                alignItems: 'center',
                                marginBottom: 24,
                            }}
                        >
                            <MaterialCommunityIcons name="shield-check" size={64} color="#ffffff" />
                            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginTop: 12 }}>
                                GuardNex
                            </Text>
                            <Text style={{ fontSize: 14, color: '#e0e7ff', marginTop: 4 }}>
                                Version 1.0.0
                            </Text>
                        </LinearGradient>

                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 }}>
                            About This App
                        </Text>
                        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 20, marginBottom: 20 }}>
                            GuardNex is an advanced multilingual spam detection application powered by AI. It helps protect you from spam messages across Email, SMS, and Social Media with 92% accuracy.
                        </Text>

                        <View style={{ backgroundColor: '#f8fafc', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                <MaterialCommunityIcons name="check-circle" size={20} color="#10b981" />
                                <Text style={{ fontSize: 14, color: '#0f172a', marginLeft: 8 }}>
                                    AI-Powered Detection
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                <MaterialCommunityIcons name="check-circle" size={20} color="#10b981" />
                                <Text style={{ fontSize: 14, color: '#0f172a', marginLeft: 8 }}>
                                    Multilingual Support
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="check-circle" size={20} color="#10b981" />
                                <Text style={{ fontSize: 14, color: '#0f172a', marginLeft: 8 }}>
                                    Real-time Analysis
                                </Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
                            © 2025 GuardNex. All rights reserved.
                        </Text>

                        <TouchableOpacity
                            onPress={() => setShowAboutModal(false)}
                        >
                            <LinearGradient
                                colors={['#6366f1', '#4f46e5'] as any}
                                style={{ borderRadius: 12, padding: 16, alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>
                                    Close
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
