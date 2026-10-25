import React from 'react';
import { FlatList, Text } from 'react-native';
import { PHONES } from '../data/phones';
import { ProductRow, s } from '../components';
import type { TabProps } from './types';
import { useFavorites } from './FavoritesContext';
export function FavoritesTab({ navigation }: TabProps<'Favorites'>) { const { ids } = useFavorites(); return <FlatList data={PHONES.filter(p => ids.includes(p.id))} keyExtractor={p => p.id} contentContainerStyle={s.list} ListEmptyComponent={<Text>Chưa có sản phẩm nào được lưu.</Text>} renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}/>}/>; }
