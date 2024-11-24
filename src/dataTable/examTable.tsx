import dayjs from "dayjs";
import { TableSchema } from "../types/table";

export const examSchemas: TableSchema[] = [
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
      return (
        <span>
          {" "}
          {record.class.major.name} - {record.class.name}
        </span>
      );
    },
  },
  {
    label: "Tiêu đề",
    prop: "title",
    type: "text",
  },
  {
    label: "Giảng viên",
    prop: "teacher",
    type: "text",
    render(row, record) {
      return (
        <span>
          {" "}
          {record.class.teachers.map((item: any) => item.name).join(", ")}
        </span>
      );
    },
  },
  {
    label: "Thời gian hiệu lực",
    prop: "startTime",
    type: "datetime",
    render(row, record) {
      return `${dayjs(record.startTime).format("DD/MM/YYYY HH:mm")} - ${dayjs(
        record.endTime
      ).format("DD/MM/YYYY HH:mm")}`;
    },
  },
  {
    label: "Thời gian làm bài",
    prop: "duration",
    type: "number",
    render(row, record) {
      return `${record.duration || 0} phút`;
    },
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge(value) {
      switch (value) {
        case "active":
          return { severity: "info", value: "Đang mở" };
        case "expired":
          return { severity: "danger", value: "Đã đóng" };
        case "submitted":
          return { severity: "success", value: "Đã nộp bài" };
        default:
          return { severity: "danger", value: "Chưa mở" };
      }
    },
  },
  {
    label: "Bắt đầu làm",
    prop: "examLogs",
    type: "text",
    render(row, record) {
      return (
        <span>
          {row?.length > 0
            ? dayjs(row[0].startTime).format("DD/MM/YYYY HH:mm")
            : "Chưa có"}{" "}
        </span>
      );
    },
  },
];
