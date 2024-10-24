import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Grade = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Bảng điểm");
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
  return <div>Grade</div>;
};

export default Grade;
