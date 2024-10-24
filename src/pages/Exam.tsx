import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Exam = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Kiểm tra");
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
  return <div>Exam</div>;
};

export default Exam;
