import dayjs from "dayjs";
import { jwtVerify } from "jose";
import type { FactoryArg } from "imask";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export function currencyToNumber(currency: string) {
  const cleanString = currency.replace(/[^0-9,.-]/g, "");
  const raw = cleanString.replace(/\./g, "").replace(",", ".");
  const numberValue = parseFloat(raw);
  return numberValue;
}

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
  } catch {
    return "";
  }
};

export const currencyMask: FactoryArg = {
  mask: "R$num.00",
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: " ",
    },
  },
};

export function formatBRL(value: string) {
  // Remove todos os caracteres que não sejam dígitos ou vírgulas
  const cleaned = value.replace(/[^\d,]/g, "");

  // Separa a parte inteira da decimal com base na vírgula
  const parts = cleaned.split(",");

  let integerPart = parts[0];
  let decimalPart = parts[1];

  // Adiciona o ponto como separador de milhar
  if (integerPart.length > 3) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  let formatted = integerPart;

  // Adiciona a vírgula como separador decimal
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.slice(0, 2); // Limita a 2 casas decimais
    formatted += "," + decimalPart;
  }

  // Gera o valor "raw" com ponto como separador decimal
  const raw = formatted.replace(/\./g, "").replace(",", ".");

  return {
    value: formatted,
    raw: raw,
  };
}
