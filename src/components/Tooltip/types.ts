export type TPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
type TTextAlign = "left" | "center" | "right";

export interface ITooltipProps {
  message: string;
  targetRef: React.RefObject<HTMLElement>;
  placement?: TPlacement;
  delay?: number;
  maxWidth?: number;
  textAlign?: TTextAlign;
  hideArrow?: boolean;
}
