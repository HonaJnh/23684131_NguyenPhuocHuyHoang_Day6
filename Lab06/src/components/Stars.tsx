import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme';
export function Stars({ value }: {
    value: number;
}) { return <Text accessibilityLabel={`${value} trên 5 sao`} style={{ fontSize: 24, color: colors.star }}>{'★'.repeat(value)}<Text style={{ color: colors.line }}>{'★'.repeat(5 - value)}</Text></Text>; }
