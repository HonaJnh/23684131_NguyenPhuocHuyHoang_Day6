import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { formatPrice } from '../theme';
import { s } from './styles';
export function ProductRow({ phone, onPress }: {
    phone: Phone;
    onPress?: () => void;
}) { return <Pressable accessibilityRole={onPress ? 'button' : undefined} onPress={onPress} style={s.card}><Image source={PHONE_COLORS[phone.defaultColor].image} style={{ width: 64, height: 90 }} resizeMode="contain"/><View style={{ flex: 1, gap: 8 }}><Text>{phone.name.split(' - ')[0]}</Text><Text style={s.price}>{formatPrice(phone.price)}</Text></View>{onPress && <Text>›</Text>}</Pressable>; }
