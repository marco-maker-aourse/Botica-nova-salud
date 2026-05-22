export const requiredRule = (label) => ({
  required: `${label} es obligatorio`,
});

export const minNumberRule = (label, min = 0) => ({
  min: {
    value: min,
    message: `${label} debe ser mayor o igual a ${min}`,
  },
});
