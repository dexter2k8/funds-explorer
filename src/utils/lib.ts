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

export function parseDate(date: string | Date) {
  if (!date) return null;
  if (date instanceof Date) return dayjs(date).format("YYYY-MM-DD");
  const parsedDate = dayjs(date, "DD/MM/YYYY");
  if (!parsedDate.isValid()) return null;
  return parsedDate.format("YYYY-MM-DD");
}
