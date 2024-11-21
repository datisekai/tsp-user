import { useEffect, useMemo, useState } from "react";
import MyTable from "../../components/UI/MyTable.tsx";
import { pathNames } from "../../constants";
import { examSchemas } from "../../dataTable/examTable.tsx";
import { useCommonStore } from "../../stores";
import { useExamStore } from "../../stores/examStore.ts";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useClassStore } from "../../stores/classStore.ts";

const Index = () => {
  const { resetActions, setHeaderTitle, isLoadingApi } = useCommonStore();
  const { getAll, exams, total } = useExamStore();
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const { getMe, classes } = useClassStore();

  useEffect(() => {
    setHeaderTitle("Bài kiểm tra");
    getMe({ pagination: false });
    return () => {
      resetActions();
    };
  }, []);

  const applyFilter = () => {
    const query: any = {};
    if (selectedClass) {
      query.classId = selectedClass;
    }

    getAll(query);
  };

  const classOptions = useMemo(() => {
    return classes.map((item) => ({
      name: `${item.major.name} - ${item.name}`,
      value: item.id,
    }));
  }, [classes]);

  const resetFilter = () => {
    setSelectedClass(null);
    getAll({});
  };
  return (
    <div className={"tw-space-y-4"}>
      <Card title={"Tìm kiếm"}>
        <div className={"tw-flex tw-items-end tw-gap-4"}>
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
        schemas={examSchemas}
        data={exams}
        totalRecords={total}
        actions={[
          {
            icon: "pi-sign-in",
            tooltip: "Tham gia",
            severity: "info",
            isHidden: (record) => record.status != "active",
            onClick: (data) => {
              navigate(pathNames.JOIN_EXAM.replace(":id", data.id));
            },
          },
          {
            icon: "pi-info-circle",
            tooltip: "Chi tiết",
            isHidden: (record) => record.status == "active",
            onClick: (data) => {
              navigate(pathNames.HISTORY_EXAM.replace(":id", data.id));
            },
          },
        ]}
        onChange={(query) => getAll(query)}
      />
    </div>
  );
};

export default Index;
