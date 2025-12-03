import { Message, User } from '@/src/types';
import { mockMessages } from '@/src/utils/mockData';
import { storageUtils } from '@/src/utils/storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface AppContextType {
    user: User | null;
    messages: Message[];
    isOnboarded: boolean;
    setUser: (user: User) => void;
    addMessage: (message: Message) => void;
    completeOnboarding: () => void;
    resetApp: () => void;
    deleteMessage: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize app
    useEffect(() => {
        const initialize = async () => {
            try {
                const savedUser = await storageUtils.getUser();
                const onboardingCompleted = await storageUtils.isOnboardingCompleted();
                const savedMessages = await storageUtils.getMessages();

                if (savedUser) {
                    setUserState(savedUser);
                }
                setIsOnboarded(onboardingCompleted);
                setMessages(savedMessages.length > 0 ? savedMessages : mockMessages);
            } catch (error) {
                console.error('Error initializing app:', error);
                setMessages(mockMessages);
            } finally {
                setIsLoading(false);
            }
        };

        initialize();
    }, []);

    const setUser = async (newUser: User) => {
        setUserState(newUser);
        await storageUtils.setUser(newUser);
    };

    const addMessage = async (message: Message) => {
        const updatedMessages = [message, ...messages];
        setMessages(updatedMessages);
        await storageUtils.addMessage(message);
    };

    const completeOnboarding = async () => {
        setIsOnboarded(true);
        await storageUtils.setOnboardingCompleted();
    };

    const deleteMessage = (id: string) => {
        const updatedMessages = messages.filter(msg => msg.id !== id);
        setMessages(updatedMessages);
    };

    const resetApp = async () => {
        setUserState(null);
        setIsOnboarded(false);
        setMessages(mockMessages);
        await storageUtils.clearAllData();
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <AppContext.Provider
            value={{
                user,
                messages,
                isOnboarded,
                setUser,
                addMessage,
                completeOnboarding,
                resetApp,
                deleteMessage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
