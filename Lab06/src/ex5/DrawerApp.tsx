import React, { createContext, useContext, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Profile, s } from '../components';
type Settings = {
    notify: boolean;
    dark: boolean;
    setNotify: (v: boolean) => void;
    setDark: (v: boolean) => void;
};
const SettingsContext = createContext<Settings | null>(null);
function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx)
        throw new Error('SettingsProvider is required');
    return ctx;
}
type Routes = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};
const Drawer = createDrawerNavigator<Routes>();
function Home() { const { dark } = useSettings(); return <View style={[s.center, { backgroundColor: dark ? '#181B24' : 'white' }]}><Text style={[s.title, { color: dark ? 'white' : colors.text }]}>Xin chào 👋</Text><Text style={{ color: dark ? '#BEC5D3' : colors.muted }}>Mở menu để khám phá các màn hình.</Text></View>; }
function User() { const { dark } = useSettings(); return <Profile dark={dark}/>; }
function SettingsScreen() { const { notify, dark, setNotify, setDark } = useSettings(); const textColor = dark ? 'white' : colors.text; return <View style={{ flex: 1, padding: 20, gap: 24, backgroundColor: dark ? '#181B24' : 'white' }}>{[{ label: 'Nhận thông báo', value: notify, set: setNotify }, { label: 'Giao diện tối', value: dark, set: setDark }].map(item => <View key={item.label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: textColor, fontSize: 16 }}>{item.label}</Text><Switch accessibilityLabel={item.label} value={item.value} onValueChange={item.set}/></View>)}<Text accessibilityLiveRegion="polite" style={{ color: textColor }}>Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện: {dark ? 'tối' : 'sáng'}</Text></View>; }
export function DrawerApp() { const [notify, setNotify] = useState(true), [dark, setDark] = useState(false); return <SettingsContext.Provider value={{ notify, dark, setNotify, setDark }}><ThemeProvider value={dark ? DarkTheme : DefaultTheme}><Drawer.Navigator screenOptions={({ route }) => ({ drawerActiveTintColor: colors.red, drawerIcon: ({ color, size }) => <Ionicons name={route.name === 'Home' ? 'home-outline' : route.name === 'Profile' ? 'person-outline' : 'settings-outline'} color={color} size={size}/> })}><Drawer.Screen name="Home" component={Home} options={{ title: 'Trang chủ' }}/><Drawer.Screen name="Profile" component={User} options={{ title: 'Cá nhân' }}/><Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }}/></Drawer.Navigator></ThemeProvider></SettingsContext.Provider>; }
