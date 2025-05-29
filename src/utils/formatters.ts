export const formatCurrency = (value: number): string => {
  // Format as Angolan Kwanza (Kz)
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    currencyDisplay: 'symbol',
  }).format(value).replace('AOA', 'Kz');
};