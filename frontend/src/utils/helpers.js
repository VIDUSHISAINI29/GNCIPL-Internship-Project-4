export const formatCurrency = (value) => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
