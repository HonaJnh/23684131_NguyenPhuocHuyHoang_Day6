import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../data/phones';
import { colors } from '../theme';
import { ProductRow, Profile, s } from '../components';
type Tabs = {
    Home: undefined;
    Search: undefined;
    Profile: undefined;
};
const Tab = createBottomTabNavigator<Tabs>();
const icons: Record<keyof Tabs, [
    keyof typeof Ionicons.glyphMap,
    keyof typeof Ionicons.glyphMap
]> = { Home: ['home', 'home-outline'], Search: ['search', 'search-outline'], Profile: ['person', 'person-outline'] };
function Home() { return <FlatList data={PHONES} keyExtractor={p => p.id} contentContainerStyle={s.list} renderItem={({ item }) => <ProductRow phone={item}/>}/>; }
function Search() { const [keyword, setKeyword] = useState(''); const data = PHONES.filter(p => p.name.toLowerCase().includes(keyword.trim().toLowerCase())); return <View style={s.root}><TextInput accessibilityLabel="Tìm sản phẩm" value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input}/><FlatList keyboardShouldPersistTaps="handled" data={data} keyExtractor={p => p.id} contentContainerStyle={s.list} renderItem={({ item }) => <ProductRow phone={item}/>} ListEmptyComponent={<Text>Không có kết quả cho “{keyword}”</Text>}/></View>; }
export function BottomTabApp() { return <Tab.Navigator screenOptions={({ route }) => ({ tabBarActiveTintColor: colors.red, tabBarIcon: ({ focused, color, size }) => <Ionicons name={icons[route.name][focused ? 0 : 1]} color={color} size={size}/> })}><Tab.Screen name="Home" component={Home} options={{ title: 'Trang chủ' }}/><Tab.Screen name="Search" component={Search} options={{ title: 'Tìm kiếm' }}/><Tab.Screen name="Profile" component={Profile} options={{ title: 'Cá nhân' }}/></Tab.Navigator>; }
