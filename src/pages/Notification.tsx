import { useEffect } from "react";
import MyTable from "../components/UI/MyTable";
import { ModalName } from "../constants";
import { useCommonStore, useModalStore } from "../stores";
import { useNotificationStore } from "../stores/notificationStore";
import { notificationSchemas } from "../dataTable/notificationTable";

const Notification = () => {
  const { resetActions, setHeaderTitle } = useCommonStore();
  const { getAll, notifications, total } = useNotificationStore();
  const onToggle = useModalStore((state) => state.onToggle);
  const { isLoadingApi } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Thông báo");
    return () => {
      resetActions();
    };
  }, []);
  return (
    <MyTable
      isLoading={isLoadingApi}
      schemas={notificationSchemas}
      data={notifications.map((item) => ({
        ...item,
        classNames: item.classes
          .map((c) => `${c.major.name} - ${c.name}`)
          .join(";"),
      }))}
      totalRecords={total}
      actions={[
        {
          icon: "pi-info-circle",
          tooltip: "Chi tiết",
          onClick: (data) => {
            onToggle(ModalName.NOTIFICATION, {
              content: data,
              header: "Chi tiết thông báo",
            });
          },
        },
      ]}
      onChange={(query) => getAll(query)}
    />
  );
};

export default Notification;
