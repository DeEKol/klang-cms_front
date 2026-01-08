import { TPhoneModelsAlias } from "../../types";

// * Создаем union тип из элементов массива
type ArrayToUnion<T extends readonly TPhoneModelsAlias[]> = T[number];

const PHONE_MODELS_ALIAS_VALUES = [
    "Apple iPhone 15 Pro Max",
    "Samsung Galaxy S24 Ultra",
    "Google Pixel 8 Pro",
    "Xiaomi Redmi Note 13 Pro+",
    "OnePlus Nord 3",
    "Samsung Galaxy A54",
    "Apple iPhone SE (3rd)",
] as const;

/*
 * Проверка: если какой-то элемент TPhoneModelsAlias отсутствует в массиве,
 * то тип Exclude<TPhoneModelsAlias, ArrayToUnion<typeof PHONE_MODELS_ALIAS_VALUES>> будет не never
 */
type MissingValues = Exclude<TPhoneModelsAlias, ArrayToUnion<typeof PHONE_MODELS_ALIAS_VALUES>>;

// * Если MissingValues не never, TypeScript покажет ошибку
const _check: MissingValues extends never ? true : false = true;

/*
 * Утилита, преобразует string в TPhoneModelsAlias
 */
export function convertStringToTPhoneModelsAlias(
    value: string,
    defaultValue: TPhoneModelsAlias,
): TPhoneModelsAlias {
    if (PHONE_MODELS_ALIAS_VALUES.includes(value as TPhoneModelsAlias))
        return value as TPhoneModelsAlias;
    else return defaultValue;
}
