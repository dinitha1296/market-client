export const parseCurrency = (amount: number): string => {
    return amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

export const parseProductUnit = (unit: string): string => {
    return (!unit || unit === "null") ? "" : " " + unit.toLocaleLowerCase();
}

export const parseProductUnitWithPer = (unit: string): string => {
    return (!unit || unit === "null") ? "" : "per " + unit.toLocaleLowerCase();
}