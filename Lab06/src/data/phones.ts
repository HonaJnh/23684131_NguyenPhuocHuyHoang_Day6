import { ColorKey, Phone } from '../types';
export const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue'];
export const PHONE_COLORS = {
    silver: { label: 'bạc', hex: '#C9EEFA', image: require('../../assets/phones/silver.png') },
    red: { label: 'đỏ', hex: '#E53A2F', image: require('../../assets/phones/red.png') },
    black: { label: 'đen', hex: '#000000', image: require('../../assets/phones/black.png') },
    blue: { label: 'xanh', hex: '#2A4494', image: require('../../assets/phones/blue.png') },    
};
export const PHONES: Phone[] = ['Joy 3', 'Live 4', 'Star 5', 'Active 3', 'Aris Pro', 'Bee 3'].map((name, i) => ({ id: String(i + 1), name: `Điện Thoại Vsmart ${name} - Hàng chính hãng`, price: [1790000, 3990000, 2290000, 2990000, 7490000, 990000][i], oldPrice: [1790000, 4490000, 2690000, 3490000, 8490000, 1190000][i], rating: 5, reviewCount: i === 0 ? 828 : 128 + i * 50, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN', colors: [...COLOR_ORDER], defaultColor: 'blue' }));
