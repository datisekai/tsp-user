import { useEffect } from "react";
import MyTable from "../components/UI/MyTable";
import { ModalName } from "../constants";
import { examSchemas } from "../dataTable/examTable";
import { useCommonStore, useModalStore } from "../stores";
import { useExamStore } from "../stores/examStore";
import { IHistoryExam } from "../types/exam";


const Exam = () => {
  const { resetActions, setHeaderTitle } = useCommonStore();
  const { getAll, exams, total } = useExamStore();
  const onToggle = useModalStore((state) => state.onToggle);

  useEffect(() => {
    setHeaderTitle("Bài kiểm tra");
    return () => {
      resetActions();
    };
  }, []);
  return (
    <MyTable
      schemas={examSchemas}
      data={exams}
      totalRecords={total}
      actions={[
        {
          icon: "pi-sign-in",
          tooltip: "Tham gia",
          severity: 'info',
          isHidden: (record) => record.status != "active",
          onClick: (data) => {
            // onToggle(ModalName., {
            //   content: data,
            //   header: "Chi tiết thông báo",
            // });
          },
        },
        {
          icon: "pi-info-circle",
          tooltip: "Chi tiết",
          onClick: (data) => {
            // onToggle(ModalName., {
            //   content: data,
            //   header: "Chi tiết thông báo",
            // });
          },
        },
      ]}
      onChange={(query) => getAll(query)}
    />
  );
};

export default Exam;
