import { useEffect, useMemo, useState } from "react";
import MyTable from "../components/UI/MyTable";
import { attendanceSchemas } from "../dataTable/attendanceTable";
import { useAttendanceStore, useCommonStore } from "../stores";
import MyCalendar from "../components/UI/MyCalendar.tsx";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useClassStore } from "../stores/classStore.ts";
import { exportToExcel, getPastDate } from "../utils";
import dayjs from "dayjs";
import MyLoading from "../components/UI/MyLoading.tsx";

const Attendance = () => {
  const { resetActions, setHeaderTitle, isLoadingApi, setHeaderActions } =
    useCommonStore();
  const { getAll, attendances, total } = useAttendanceStore();
  const [dates, setDates] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const { getMe, classes } = useClassStore();

  useEffect(() => {
    setHeaderTitle("Điểm danh");
    getMe({ pagination: false });
    setHeaderActions([
      {
        icon: "pi pi-download",
        title: "Export excel",
        onClick: () => {
          const dataExcel = attendances.map((item) => ({
            "Môn học": item.attendance.class.major.name,
            "Lớp học": item.attendance.class.name,
            "Giảng viên": item.attendance.class.teachers
              .map((t) => t.name)
              .join(", "),
            "Thời gian": dayjs(item.createdAt).format("DD/MM/YYYY HH:mm"),
          }));
          exportToExcel(dataExcel, `DIEM_DANH_${Date.now()}.xlsx`);
        },
      },
    ]);
    return () => {
      resetActions();
    };
  }, []);

  const classOptions = useMemo(() => {
    return classes.map((item) => ({
      name: `${item.major.name} - ${item.name}`,
      value: item.id,
    }));
  }, [classes]);

  const applyFilter = () => {
    const query: any = {};
    if (selectedClass) {
      query.classId = selectedClass;
    }
    if (dates) {
      query.from = dates[0].toISOString();
      query.to = dates[1].toISOString();
    }

    getAll(query);
  };

  const resetFilter = () => {
    setSelectedClass(null);
    setDates(null);
    getAll({});
  };

  return (
    <div className={"tw-space-y-4"}>
      <Card title={"Tìm kiếm"}>
        <div className={"tw-flex tw-items-end tw-gap-4 tw-flex-wrap"}>
          <div>
            <div className={"mb-1"}>Lọc theo môn</div>
            <Dropdown
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.value)}
              options={classOptions}
              optionLabel="name"
              loading={isLoadingApi}
              placeholder="Chọn lớp học"
              className="w-full"
            />
          </div>
          <div>
            <div className={"mb-1"}>Lọc theo ngày</div>
            <MyCalendar
              initToday={getPastDate(30)}
              spaceDate={30}
              dates={dates}
              setDates={setDates}
            />
          </div>
          <div>
            <div className={"mb-1"}>Thao tác</div>
            <div className={"tw-flex tw-gap-2"}>
              <Button
                onClick={applyFilter}
                icon={"pi pi-play"}
                iconPos={"right"}
                label={"Áp dụng"}
              ></Button>
              <Button
                onClick={resetFilter}
                severity={"contrast"}
                icon={"pi pi-refresh"}
                iconPos={"right"}
                label={"Reset"}
              ></Button>
            </div>
          </div>
        </div>
      </Card>
      <MyTable
        schemas={attendanceSchemas}
        data={attendances}
        totalRecords={total}
        isLoading={isLoadingApi}
        onChange={(query) => getAll(query)}
      />
    </div>
  );
};

export default Attendance;
