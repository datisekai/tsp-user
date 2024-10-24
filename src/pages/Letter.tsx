import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Letter = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Đơn từ");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {},
        type: "button",
        disabled: false,
      },
    ]);

    return () => {
      resetActions();
    };
  }, []);
  return <div>Letter</div>;
};

export default Letter;
