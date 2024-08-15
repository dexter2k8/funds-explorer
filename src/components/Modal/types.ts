export interface IModal {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
  leftIcon?: React.ReactNode;
  title?: string;
  description?: string;
  width?: string | number;
  hideCross?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  okText?: string;
  okLoading?: boolean;
  cancelText?: string;
  children?: React.ReactNode;
}
