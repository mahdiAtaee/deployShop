export const amountWithDiscount = (amount, percent) => {
    return amount * (1 - (percent / 100))
}

export const calculateDiscountAmount = (amount, percent) => {
    return amount - amountWithDiscount(amount, percent)
}

export function formatNumberCurrency(number) {
  const str = number.toString().replace(/\D/g, ''); // فقط ارقام
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}