import dayjs from "dayjs";

export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

export function formatDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}
