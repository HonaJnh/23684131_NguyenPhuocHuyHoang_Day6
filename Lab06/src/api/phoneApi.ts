import { PHONES, COLOR_ORDER } from '../data/phones';
import { Phone } from '../types';
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '');
export const USING_API = API_URL !== '';
export function validatePhone(value: unknown): Phone {
    if (!value || typeof value !== 'object')
        throw new Error('Dữ liệu sản phẩm không hợp lệ');
    const p = value as Phone;
    if (typeof p.id !== 'string' || typeof p.name !== 'string' || !p.name.trim() || !['price', 'oldPrice', 'rating', 'reviewCount'].every(k => typeof p[k as keyof Phone] === 'number' && Number.isFinite(p[k as keyof Phone]) && Number(p[k as keyof Phone]) >= 0) || p.rating > 5 || !Number.isInteger(p.rating) || !Array.isArray(p.colors) || !p.colors.length || !p.colors.every(c => COLOR_ORDER.includes(c)) || !p.colors.includes(p.defaultColor) || typeof p.supplier !== 'string' || typeof p.badge !== 'string')
        throw new Error('Dữ liệu API sai định dạng. Kiểm tra các trường của phones.');
    return p;
}
export async function fetchPhone(id: string, signal?: AbortSignal): Promise<Phone> {
    if (!USING_API) {
        await new Promise(r => setTimeout(r, 600));
        const p = PHONES.find(p => p.id === id);
        if (!p)
            throw new Error('Không tìm thấy sản phẩm');
        return p;
    }
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener('abort', abort);
    if (signal?.aborted)
        controller.abort();
    const timeout = setTimeout(abort, 12000);
    try {
        const response = await fetch(`${API_URL}/phones/${encodeURIComponent(id)}`, { signal: controller.signal });
        if (!response.ok)
            throw new Error(`Máy chủ trả về lỗi ${response.status}`);
        return validatePhone(await response.json());
    }
    catch (e) {
        if (controller.signal.aborted)
            throw new Error('Yêu cầu đã dừng hoặc quá thời gian chờ.');
        throw e;
    }
    finally {
        clearTimeout(timeout);
        signal?.removeEventListener('abort', abort);
    }
}
