import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors } from '../theme';
import { s } from './styles';
export function Button({ title, onPress, secondary = false }: {
    title: string;
    onPress: () => void;
    secondary?: boolean;
}) { return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [s.button, { backgroundColor: secondary ? colors.blue : colors.red, opacity: pressed ? .7 : 1 }]}>
    <Text style={s.buttonText}>{title}</Text>
    </Pressable>; 
    }
