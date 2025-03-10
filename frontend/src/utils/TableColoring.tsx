export const getStockCellClass = (stock: number) => {
  if (stock < 5) {
    return "bg-danger text-white fw-bold"; // Rojo
  } else if (stock >= 5 && stock <= 10) {
    return "bg-warning"; // Naranja
  } else {
    return ""; // Sin color
  }
};

export const getRowClass = (expirationDate: string | null) => {
  if (!expirationDate) return "";
  const today = new Date();
  const expiry = new Date(expirationDate);
  const diffInDays = Math.ceil(
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) {
    return "table-danger"; // Expirado
  } else if (diffInDays <= 7) {
    return "table-danger"; // Menos de 1 semana
  } else if (diffInDays <= 14) {
    return "table-warning"; // Entre 1 y 2 semanas
  } else {
    return "table-success"; // Más de 2 semanas
  }
};
