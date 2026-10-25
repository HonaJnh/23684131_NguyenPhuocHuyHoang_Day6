import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorKey, Phone } from '../types';
import { PHONE_COLORS, COLOR_ORDER } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Button, s } from '../components';
import type { SelectPhoneParamList } from './types';
import { p } from './styles';
export function ChooseColorScreen({ navigation, route, phone }: {
    phone: Phone;
} & NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'>) {
    const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
    const [line1, line2] = phone.name.split(' - ');
    return <SafeAreaView edges={['bottom']} style={s.root}>
        <View style={p.header}>
            <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={p.thumb} resizeMode="contain"/>
            <View style={{ flex: 1, gap: 8 }}>
                <Text>{line1}</Text>
                <Text>{line2}
                </Text>{picked && <>
                <Text>Màu: <Text style={p.bold}>{PHONE_COLORS[picked].label}</Text>
                </Text><Text>Cung cấp bởi <Text style={p.bold}>{phone.supplier}</Text>
                </Text><Text style={s.price}>{formatPrice(phone.price)}</Text></>}</View>
                </View><View style={p.colorBody}><ScrollView contentContainerStyle={{ flexGrow: 1 }}><Text style={{ fontSize: 16 }}>Chọn một màu bên dưới:</Text><View style={p.swatches}>{COLOR_ORDER.filter(c => phone.colors.includes(c)).map(c => <Pressable key={c} accessibilityRole="radio" accessibilityLabel={`Màu ${PHONE_COLORS[c].label}`} accessibilityState={{ selected: picked === c }} onPress={() => setPicked(c)} style={[p.swatch, { backgroundColor: PHONE_COLORS[c].hex }, picked === c && p.selected]}>{picked === c && <Text style={{ color: c === 'silver' ? 'black' : 'white', fontSize: 24 }}>✓</Text>}</Pressable>)}</View></ScrollView><Button title="XONG" secondary onPress={() => navigation.popTo('Product', { color: picked })}/></View></SafeAreaView>;
}
