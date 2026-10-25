import React from 'react';
import { FlatList } from 'react-native';
import { PHONES } from '../data/phones';
import { ProductRow, s } from '../components';
import type { TabProps } from './types';
export function ProductsTab({ navigation }: TabProps<'Products'>) { return <FlatList data={PHONES} keyExtractor={p => p.id} contentContainerStyle={s.list} renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}/>}/>; }
