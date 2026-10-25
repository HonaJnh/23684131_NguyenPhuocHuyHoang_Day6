import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme';
import { s } from './styles';
export function Profile({ dark = false }: {
    dark?: boolean;
}) { return <View style={[s.center, { backgroundColor: dark ? '#181B24' : 'white' }]}><View style={s.avatar}><Text style={{ fontSize: 32, color: 'white' }}>NA</Text></View><Text style={[s.title, { color: dark ? 'white' : colors.text }]}>Nguyễn Phước Huy Hoàng</Text><Text style={{ color: dark ? '#BEC5D3' : colors.muted }}>hoang.nguyen@example.com</Text></View>; }
