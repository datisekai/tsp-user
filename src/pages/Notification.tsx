import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Notification = () => {
  const { setHeaderActions, resetActions, setHeaderTitle } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Thông báo");
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
  return <div>Notification</div>;
};

export default Notification;
