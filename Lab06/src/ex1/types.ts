import type { ColorKey } from '../types';
export type SelectPhoneParamList = {
    Product: {
        color?: ColorKey;
    } | undefined;
    ChooseColor: {
        color?: ColorKey;
    } | undefined;
};
