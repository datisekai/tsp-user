import { TableSchema } from "../types/table";

export const classSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Lớp học",
    prop: "class",
    type: "text",
    render(row, record) {
      return `${record.major.code} - ${record.major.name} - ${record.name}`;
    },
  },
  {
    label: "Giảng viên",
    prop: "teachers",
    type: "text",
    render(row, record) {
      return `${row?.map((item) => item.name).join(", ")}`;
    },
  },

  {
    label: "Thời gian",
    prop: "duration",
    type: "text",
  },
  {
    label: "Mã tham gia",
    prop: "secretKey",
    type: "text",
  },
];
