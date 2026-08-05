export function formatPrice(amount: number) {
  const price = new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  return `${price} DH`;
}
