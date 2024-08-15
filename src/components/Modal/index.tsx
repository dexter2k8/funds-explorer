import Button from "../Button";
import "./styles.css";
import { IModal } from "./types";

export default function Modal({ okText = "Ok", cancelText = "Cancel", ...props }: IModal) {
  const modalClasses = ["ds-modal"];
  props.open && modalClasses.push("ds-modal__open");
  const modalClass = modalClasses.join(" ");

  return (
    <div className={modalClass} onClick={props.onClose}>
      <div
        className="ds-modal__content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: props.width }}
      >
        {!props.hideHeader && (
          <header>
            {props.leftIcon}
            <div className="ds-modal__header-content">
              <h3>{props.title}</h3>
              <p>{props.description}</p>
            </div>
            {!props.hideCross && <span onClick={props.onClose}>&times;</span>}
          </header>
        )}

        <main>{props.children}</main>

        {!props.hideFooter && (
          <footer>
            <Button onClick={props.onClose}>{cancelText}</Button>
            <Button loading={props.okLoading} onClick={props.onOk}>
              {okText}
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
}
