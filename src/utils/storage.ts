import { User } from '@/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'guardnex_user';
const ONBOARDING_KEY = 'guardnex_onboarding_completed';
const MESSAGES_KEY = 'guardnex_messages';

export const storageUtils = {
    // User
    async setUser(user: User) {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user:', error);
        }
    },

    async getUser(): Promise<User | null> {
        try {
            const user = await AsyncStorage.getItem(USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    // Onboarding
    async setOnboardingCompleted() {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        } catch (error) {
            console.error('Error setting onboarding:', error);
        }
    },

    async isOnboardingCompleted(): Promise<boolean> {
        try {
            const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
            return completed === 'true';
        } catch (error) {
            console.error('Error checking onboarding:', error);
            return false;
        }
    },

    // Messages
    async addMessage(message: any) {
        try {
            const messages = await this.getMessages();
            messages.push(message);
            await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error('Error adding message:', error);
        }
    },

    async getMessages(): Promise<any[]> {
        try {
            const messages = await AsyncStorage.getItem(MESSAGES_KEY);
            return messages ? JSON.parse(messages) : [];
        } catch (error) {
            console.error('Error getting messages:', error);
            return [];
        }
    },

    async clearAllData() {
        try {
            await AsyncStorage.multiRemove([USER_KEY, ONBOARDING_KEY, MESSAGES_KEY]);
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    },
};
