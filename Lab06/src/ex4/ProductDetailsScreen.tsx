import React from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PHONES, PHONE_COLORS } from '../data/phones';
import { formatPrice } from '../theme';
import { Button, Stars, s } from '../components';
import type { RootStackParamList } from './types';
import { useFavorites } from './FavoritesContext';
export function ProductDetailsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'ProductDetails'>) {
    const { id } = route.params;
    const phone = PHONES.find(p => p.id === id);
    const { has, toggle } = useFavorites();
    if (!phone)
        return <Text style={{ padding: 24 }}>Không tìm thấy sản phẩm #{id}</Text>;
    return <ScrollView style={s.root} contentContainerStyle={{ padding: 20, gap: 16 }}><Image source={PHONE_COLORS[phone.defaultColor].image} resizeMode="contain" style={{ width: '100%', height: 300 }}/><Text style={s.title}>{phone.name}</Text><Stars value={phone.rating}/><Text style={s.price}>{formatPrice(phone.price)}</Text><Text>Cung cấp bởi {phone.supplier}</Text><Button title={has(id) ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'} onPress={() => toggle(id)}/></ScrollView>;
}
