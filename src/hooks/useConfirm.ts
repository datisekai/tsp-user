import { confirmDialog } from "primereact/confirmdialog";

const defaultConfirm = {
  message: "Bạn có chắc chắn muốn xoá?",
  header: "Xác nhận",
  icon: "pi pi-exclamation-triangle",
  defaultFocus: "accept",
  acceptLabel: "OK",
  rejectLabel: "Huỷ",
  onAccept: () => {},
  onReject: () => {},
};
export const useConfirm = () => {
  const onConfirm = (data?: {
    message?: string;
    header?: string;
    icon?: string;
    defaultFocus?: "accept" | "reject";
    onAccept?: () => void;
    onReject?: () => void;
    acceptLabel?: string;
    rejectLabel?: string;
  }) => {
    confirmDialog({
      ...defaultConfirm,
      ...data,
      accept: data?.onAccept || defaultConfirm.onAccept,
      reject: data?.onReject || defaultConfirm.onReject,
    });
  };

  return { onConfirm };
};
