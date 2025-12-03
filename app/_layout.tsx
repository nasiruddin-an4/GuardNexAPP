import "@/global.css";
import { AppProvider } from "@/src/contexts/AppContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <AppProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </AppProvider>
    );
}
