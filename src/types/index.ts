export interface Message {
    id: string;
    content: string;
    channel: 'email' | 'sms' | 'social';
    isSpam: boolean;
    confidence: number;
    timestamp: string;
    language: 'en' | 'es' | 'bn';
}

export interface User {
    id: string;
    name: string;
    email: string;
    language: 'en' | 'es' | 'bn';
    hasCompletedOnboarding: boolean;
}

export interface ScanResult {
    message: string;
    channel: 'email' | 'sms' | 'social';
    isSpam: boolean;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
    details: string;
}
