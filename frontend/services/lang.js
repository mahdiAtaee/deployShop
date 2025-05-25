
const persianNumber = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
};

export const toPersianNumber = (data) => {
    return String(data)
        .split("")
        .map((char) => {
            return persianNumber[char] ? persianNumber[char] : char;
        })
        .join("");
};