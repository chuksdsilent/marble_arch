export const formatCurrency = value => {
  const formattedCurrency = value.toLocaleString(
    "en-US", // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: 2 }
  );

  return formattedCurrency;
};
