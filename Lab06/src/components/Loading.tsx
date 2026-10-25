import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../theme';
import { s } from './styles';
export function Loading() { return <View style={s.center}><ActivityIndicator size="large" color={colors.red}/><Text>Đang tải...</Text></View>; }
