import React, { useEffect } from "react";
import { useCommonStore, useModalStore } from "../../stores";
import MyTable from "../../components/UI/MyTable";
import { useLetterStore } from "../../stores/letterStore";
import { useNavigate } from "react-router-dom";
import { ModalName, pathNames } from "../../constants";
import { letterSchemas } from "../../dataTable/letterTable";
import { useConfirm, useToast } from "../../hooks";
import {LetterStatus} from "../../types/letter.ts";

const Letter = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();
  const { getAll, letters, total, _delete } = useLetterStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { onToggle } = useModalStore();
  const { onConfirm } = useConfirm();

  useEffect(() => {
    setHeaderTitle("Đơn từ");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          navigate(pathNames.LETTER_CREATE);
        },
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, []);

  const handleDelete = (id: string) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá?",
      header: "Xác nhận",
      onAccept: async () => {
        const result = await _delete(+id);
        if (!result) {
          return showToast({
            severity: "danger",
            summary: "Thông báo",
            message: "Xóa thất bại",
            life: 3000,
          });
        }
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Xóa thành công",
          life: 3000,
        });
      },
      onReject: () => {},
    };
    onConfirm(data);
  };

  return (
    <MyTable
      schemas={letterSchemas}
      data={letters}
      totalRecords={total}
      onChange={(query) => getAll(query)}
      actions={[
        {
          icon: "pi-info-circle",
          tooltip: "Chi tiết",
          onClick: (data) => {
            onToggle(ModalName.LETTER, {
              content: data,
              header: "Chi tiết đơn",
            });
          },
        },
        {
          onClick: (data) => handleDelete(data.id),
          tooltip: "Xóa",
          icon: "pi-trash",
          severity: "danger",
          isHidden:(record:any) => record.status !== LetterStatus.PENDING
        },
      ]}
    />
  );
};

export default Letter;
