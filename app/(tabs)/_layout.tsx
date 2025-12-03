import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#94a3b8',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopColor: '#e2e8f0',
                    borderTopWidth: 1,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
                    paddingTop: 2,
                    height: Platform.OS === 'ios' ? 93 : 68,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 4,
                    marginBottom: 0,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons 
                            name={focused ? "home" : "home-outline"} 
                            size={26} 
                            color={color} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan Message',
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons 
                            name={focused ? "shield-check" : "shield-check-outline"} 
                            size={26} 
                            color={color} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Message History',
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons 
                            name="history" 
                            size={26} 
                            color={color} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons 
                            name={focused ? "cog" : "cog-outline"} 
                            size={26} 
                            color={color} 
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
