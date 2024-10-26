import { TableSchema } from "../types/table";

export const attendanceSchemas: TableSchema[] = [
  {
    label: "Môn học",
    prop: "major",
    type: "text",
    render(row, record) {
      const { attendance } = record;
      return <span> {attendance.class.major.code} - {attendance.class.major.name}</span>
    },
  },
  {
    label: "Lớp học",
    prop: "class",
    type: "text",
    render(row, record) {
      const { attendance } = record;
      return <span> {attendance.class.name}</span>
    },
  },
  {
    label: "Giảng viên",
    prop: "teacher",
    type: "text",
    render(row, record) {
      const { attendance } = record;
      return <span> {attendance.class.teachers.map((item: any) => item.name).join(", ")}</span>
    },
  },
  {
    label: "Thời gian",
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge(value) {
      return { severity: "success", value: "Thành công" }
    },
  },
];
