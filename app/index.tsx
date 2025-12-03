import { useApp } from "@/src/contexts/AppContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const router = useRouter();
    const { isOnboarded } = useApp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOnboarded) {
                router.replace("/(auth)/onboarding" as any);
            } else {
                router.replace("/(tabs)" as any);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isOnboarded, router]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
            }}
        >
            <ActivityIndicator size="large" color="#2563eb" />
        </View>
    );
}
