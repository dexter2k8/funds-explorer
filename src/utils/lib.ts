import dayjs from "dayjs";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export function formatDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}

export function parseDate(date: string | Date) {
  if (!date) return;
  if (date instanceof Date) return dayjs(date).format("YYYY-MM-DD");
  const parsedDate = dayjs(date, "DD/MM/YYYY");
  if (!parsedDate.isValid()) return;
  return parsedDate.format("YYYY-MM-DD");
}

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return payload;
  } catch (err) {
    return "";
  }
};
