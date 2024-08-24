import { FC, forwardRef } from "react";
import "./styles.css";
import { ControlledTextarea } from "./__components__/ControlledTextarea";
import type { ITextareaProps } from "./types";

const TextareaBasic: FC<ITextareaProps> = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ resize, ...props }, ref) => {
    return <textarea className="dx-textarea" ref={ref} {...props} style={{ resize }} />;
  }
);

const Textarea = TextareaBasic as FC<ITextareaProps> & {
  Controlled: typeof ControlledTextarea;
};

Textarea.Controlled = ControlledTextarea;

export default Textarea;
