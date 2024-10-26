import { useEffect } from "react";
import MyTable from "../components/UI/MyTable";
import { attendanceSchemas } from "../dataTable/attendanceTable";
import { useAttendanceStore, useCommonStore, useModalStore } from "../stores";

const Attendance = () => {
  const { resetActions, setHeaderTitle } = useCommonStore();
  const { getAll, attendances, total } = useAttendanceStore();
  const onToggle = useModalStore((state) => state.onToggle);

  useEffect(() => {
    setHeaderTitle("Lịch sử điểm danh");
    return () => {
      resetActions();
    };
  }, []);
  return (
    <MyTable
      schemas={attendanceSchemas}
      data={attendances}
      totalRecords={total}
      onChange={(query) => getAll(query)}
    />
  );
};

export default Attendance;
