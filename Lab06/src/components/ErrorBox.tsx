import React from 'react';
import { Text, View } from 'react-native';
import { s } from './styles';
import { Button } from './Button';
export function ErrorBox({ message, onRetry, onOffline }: {
    message: string;
    onRetry: () => void;
    onOffline?: () => void;
}) { return <View style={s.center}><Text style={s.title}>Không tải được sản phẩm</Text><Text style={s.message}>{message}</Text><Button title="THỬ LẠI" onPress={onRetry}/>{onOffline && <Button title="Dùng dữ liệu offline" secondary onPress={onOffline}/>}</View>; }
