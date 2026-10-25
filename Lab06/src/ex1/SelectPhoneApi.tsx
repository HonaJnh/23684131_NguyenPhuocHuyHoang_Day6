import React, { useState, useCallback, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Phone } from '../types';
import { PHONES } from '../data/phones';
import { colors } from '../theme';
import { Loading, ErrorBox, s } from '../components';
import { fetchPhone, USING_API } from '../api/phoneApi';
import { p } from './styles';
import { SelectPhoneApp } from './SelectPhoneApp';
export function SelectPhoneApi() {
    const [phone, setPhone] = useState<Phone | null>(null), [error, setError] = useState<string | null>(null), [attempt, setAttempt] = useState(0), [offline, setOffline] = useState(false);
    const load = useCallback(() => { setOffline(false); setAttempt(a => a + 1); }, []);
    useEffect(() => {
        const controller = new AbortController();
        let active = true;
        setError(null);
        setPhone(null);
        fetchPhone('1', controller.signal).then(p => {
            if (active)
                setPhone(p);
        }).catch(e => {
            if (active)
                setError(e instanceof Error ? e.message : 'Không thể kết nối API');
        });
        return () => { active = false; controller.abort(); };
    }, [attempt]);
    if (error && !offline)
        return <ErrorBox message={error} onRetry={load} onOffline={() => { setPhone(PHONES[0]); setOffline(true); }}/>;
    if (!phone)
        return <Loading />;
    return <View style={s.root}><Text style={p.mode}>{offline || !USING_API ? 'Dữ liệu mẫu offline' : 'Dữ liệu từ API'}{offline ? ' · Có thể thử kết nối lại' : ''}</Text>{offline && <Pressable accessibilityRole="button" onPress={load}><Text style={{ textAlign: 'center', color: colors.blue, padding: 6 }}>Thử kết nối lại API</Text></Pressable>}<SelectPhoneApp phone={phone}/></View>;
}
