import React, { useState } from 'react';
import { BackHandler, Pressable, ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SelectPhoneLocal } from './src/ex1/SelectPhoneLocal';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';
import { colors } from './src/theme';
import { s } from './src/components';
const lessons = ['Select Phone · 4 trạng thái', 'API · Loading / Error / Retry', 'Bottom Tab · Home / Search / Profile', 'Stack + Tab · Params / Favorites', 'Drawer · Profile / Settings'];
export default function App() {
    const [lesson, setLesson] = useState<number | null>(null);
    React.useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (lesson !== null) {
                setLesson(null);
                return true;
            }
            return false;
        });
        return () => sub.remove();
    }, [lesson]);
    return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><SafeAreaView edges={['top', 'left', 'right']} style={s.root}>{lesson === null ? <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}><Text style={s.title}>Lab 06 — Navigation</Text><Text style={{ color: colors.muted }}>Chọn bài thực hành</Text>{lessons.map((title, i) => <Pressable accessibilityRole="button" key={title} onPress={() => setLesson(i)} style={s.card}><Text style={{ fontSize: 22, color: colors.red, fontWeight: '700' }}>{i + 1}</Text><Text style={{ flex: 1, fontSize: 16 }}>{title}</Text><Text>›</Text></Pressable>)}</ScrollView> : <><Pressable accessibilityRole="button" onPress={() => setLesson(null)} style={{ padding: 10, borderBottomWidth: 1, borderColor: colors.line }}><Text style={{ color: colors.blue }}>‹ Menu bài tập · Bài {lesson + 1}</Text></Pressable><View style={{ flex: 1 }}><NavigationContainer key={lesson}>{lesson === 0 ? <SelectPhoneLocal /> : lesson === 1 ? <SelectPhoneApi /> : lesson === 2 ? <BottomTabApp /> : lesson === 3 ? <StackTabApp /> : <DrawerApp />}</NavigationContainer></View></>}</SafeAreaView></SafeAreaProvider></GestureHandlerRootView>;
}
