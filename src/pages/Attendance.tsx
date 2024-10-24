import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Attendance = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Điểm danh");
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
  return <div>Attendance</div>;
};

export default Attendance;
