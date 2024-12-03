import { useEffect } from "react";
import MyTable from "../components/UI/MyTable";
import { ModalName } from "../constants";
import { useCommonStore, useModalStore } from "../stores";
import { useNotificationStore } from "../stores/notificationStore";
import { notificationSchemas } from "../dataTable/notificationTable";
import { classSchemas } from "../dataTable/classTable";
import { useClassStore } from "../stores/classStore";

const Class = () => {
  const { resetActions, setHeaderTitle } = useCommonStore();
  const { classes, getMe } = useClassStore();
  const onToggle = useModalStore((state) => state.onToggle);
  const { isLoadingApi } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Thông báo");
    getMe();
    return () => {
      resetActions();
    };
  }, []);

  return (
    <MyTable isLoading={isLoadingApi} schemas={classSchemas} data={classes} />
  );
};

export default Class;
