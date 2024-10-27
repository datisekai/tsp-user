import { LetterTypeData } from "../constants";
import { LetterStatus, LetterType } from "../types/letter";
import { TableSchema } from "../types/table";

export const letterSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Loại đơn",
    prop: "type",
    type: "text",
    render(row, record) {
      return LetterTypeData[row] || "Không xác định";
    },
  },
  {
    label: "Lý do",
    prop: "reason",
    type: "text",
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge(value) {
      switch (value) {
        case LetterStatus.APPROVED:
          return {
            severity: "success",
            value: "Đã duyệt",
          };
        case LetterStatus.PENDING:
          return {
            severity: "warning",
            value: "Đang chờ duyệt",
          };
        case LetterStatus.REJECTED:
          return {
            severity: "danger",
            value: "Không duyệt",
          };
      }
      return {
        severity: "info",
        value,
      };
    },
  },
  {
    label: "Lớp học",
    prop: "className",
    type: "text",
    render(row, record) {
      return (
        <span>
          {record?.class?.major?.name} - {record?.class?.name}
        </span>
      );
    },
  },
  {
    label: "Thời gian",
    prop: "time",
    type: "date",
  },
];
