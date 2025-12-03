import { Message, ScanResult } from '@/src/types';

export const mockMessages: Message[] = [
    {
        id: '1',
        content: 'Congratulations! You have won a free iPhone. Click here to claim.',
        channel: 'sms',
        isSpam: true,
        confidence: 0.95,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        language: 'en',
    },
    {
        id: '2',
        content: 'Hi, can we schedule a meeting for next week?',
        channel: 'email',
        isSpam: false,
        confidence: 0.02,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        language: 'en',
    },
    {
        id: '3',
        content: '¡Gana dinero rápido! Haz clic aquí para ganar $5000 en 24 horas.',
        channel: 'social',
        isSpam: true,
        confidence: 0.92,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        language: 'es',
    },
    {
        id: '4',
        content: 'Dear user, your account has been suspended. Verify now.',
        channel: 'email',
        isSpam: true,
        confidence: 0.88,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        language: 'en',
    },
    {
        id: '5',
        content: 'আপনার অ্যাকাউন্ট যাচাই করুন এবং ১০০০ টাকা জিতুন',
        channel: 'sms',
        isSpam: true,
        confidence: 0.89,
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        language: 'bn',
    },
    {
        id: '6',
        content: 'Your package will arrive tomorrow. Track it here.',
        channel: 'email',
        isSpam: false,
        confidence: 0.05,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        language: 'en',
    },
];

export const generateScanResult = (message: string, channel: string): ScanResult => {
    // Mock spam detection with some basic heuristics
    const spamKeywords = ['congratulations', 'won', 'click here', 'claim', 'free', 'gana', 'dinero', 'rápido', 'winner', 'verify account', 'suspended'];
    const lowerMessage = message.toLowerCase();

    let isSpam = false;
    let confidence = Math.random() * 0.3 + 0.3;

    if (spamKeywords.some(keyword => lowerMessage.includes(keyword))) {
        isSpam = true;
        confidence = Math.random() * 0.15 + 0.85;
    } else {
        confidence = Math.random() * 0.2 + 0.01;
    }

    const riskLevel: 'low' | 'medium' | 'high' =
        confidence > 0.8 ? 'high' : confidence > 0.5 ? 'medium' : 'low';

    return {
        message,
        channel: channel as 'email' | 'sms' | 'social',
        isSpam,
        confidence: Math.round(confidence * 100) / 100,
        riskLevel,
        details: isSpam
            ? 'This message contains common spam indicators such as urgent calls-to-action, unrealistic promises, or phishing attempts.'
            : 'This message appears to be legitimate based on content analysis.',
    };
};
