import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Button, Stars, s } from '../components';
import type { SelectPhoneParamList } from './types';
import { p } from './styles';
export function ProductScreen({ navigation, route, phone }: {
    phone: Phone;
} & NativeStackScreenProps<SelectPhoneParamList, 'Product'>) {
    const picked = route.params?.color;
    const shown = picked ?? phone.defaultColor;
    return <SafeAreaView edges={['bottom']} style={p.root}><ScrollView contentContainerStyle={p.productContent}><Image source={PHONE_COLORS[shown].image} resizeMode="contain" style={p.hero}/><Text style={p.name}>{phone.name}</Text><View style={p.row}><Stars value={phone.rating}/><Text>(Xem {phone.reviewCount} đánh giá)</Text></View><View style={p.row}><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={p.old}>{formatPrice(phone.oldPrice)}</Text></View><View style={p.row}><Text style={p.badge}>{phone.badge}</Text><Pressable accessibilityRole="button" accessibilityLabel="Thông tin hoàn tiền" onPress={() => Alert.alert('Cam kết giá', 'Liên hệ nhà cung cấp để biết điều kiện hoàn tiền.')}><Text style={p.question}>?</Text></Pressable></View><Pressable accessibilityRole="button" style={p.choose} onPress={() => navigation.navigate('ChooseColor', { color: picked })}><Text>{phone.colors.length} MÀU-CHỌN {picked ? 'LOẠI' : 'MÀU'}</Text><Text style={p.chevron}>›</Text></Pressable></ScrollView><View style={{ paddingVertical: 12 }}><Button title="CHỌN MUA" onPress={() => Alert.alert('Đã chọn sản phẩm', `${phone.name}\nMàu: ${PHONE_COLORS[shown].label}\n${formatPrice(phone.price)}`)}/></View></SafeAreaView>;
}
