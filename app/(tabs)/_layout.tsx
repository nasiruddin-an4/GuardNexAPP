import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#ffffff',
                    borderBottomColor: '#e5e7eb',
                    borderBottomWidth: 1,
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#111827',
                },
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopColor: '#e5e7eb',
                    borderTopWidth: 1,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan Message',
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="shield-check" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Message History',
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
