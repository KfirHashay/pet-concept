import { useAppTheme } from '@/src/theme/ThemeContext';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
    return <Text style={{ fontSize: focused ? 26 : 22, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>;
}

export default function TabLayout() {
    const { colors, radii } = useAppTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.tabIconActive,
                tabBarInactiveTintColor: colors.tabIconDefault,
                tabBarStyle: {
                    backgroundColor: colors.tabBar,
                    borderTopColor: colors.border,
                    borderTopWidth: 0.5,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="closet"
                options={{
                    title: 'Closet',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="👗" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} />,
                }}
            />
        </Tabs>
    );
}
