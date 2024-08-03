import type { TPlacement } from "./types";

type PositionType = Record<TPlacement, { top: number; left: number }>;

export const calculatePosition = (
  placement: TPlacement,
  rect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number
) => {
  const positions: PositionType = {
    top: {
      top: rect.top - tooltipHeight - 5,
      left: rect.left - tooltipWidth / 2 + rect.width / 2,
    },
    bottom: {
      top: rect.bottom + 10,
      left: rect.left - tooltipWidth / 2 + rect.width / 2,
    },
    left: {
      top: rect.top + rect.height / 2 - tooltipHeight / 2,
      left: rect.left - tooltipWidth - 10,
    },
    right: {
      top: rect.top + rect.height / 2 - tooltipHeight / 2,
      left: rect.right + 10,
    },
    "bottom-left": {
      top: rect.bottom + 10,
      left: rect.left - tooltipWidth + rect.width + 10,
    },
    "top-left": {
      top: rect.top - tooltipHeight - 5,
      left: rect.left - tooltipWidth + rect.width + 10,
    },
    "top-right": {
      top: rect.top - tooltipHeight - 5,
      left: rect.right - rect.width - 10,
    },
    "bottom-right": {
      top: rect.bottom + 10,
      left: rect.right - rect.width - 10,
    },
  };

  return positions[placement];
};
