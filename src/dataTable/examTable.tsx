import { TableSchema } from "../types/table";

export const examSchemas: TableSchema[] = [
    {
        label: "Lớp học",
        prop: "class",
        type: "text",
        render(row, record) {
            return <span> {record.class.major.name} - {record.class.name}</span>
        },
    },
    {
        label: "Giảng viên",
        prop: "teacher",
        type: "text",
        render(row, record) {
            return <span> {record.class.teachers.map((item: any) => item.name).join(", ")}</span>
        },
    },
    {
        label: "Bắt đầu",
        prop: "startTime",
        type: "datetime",
    },
    {
        label: "Kết thúc",
        prop: "endTime",
        type: "datetime",
    },
    {
        label: "Trạng thái",
        prop: "status",
        type: "badge",
        getBadge(value) {
            switch (value) {
                case "active":
                    return { severity: "info", value: "Đang mở" }
                case "expired":
                    return { severity: "danger", value: "Đã đóng" }
                case "submitted":
                    return {severity: "success", value: "Đã nộp bài"}
                default:
                    return { severity: "danger", value: "Chưa mở" }
            }
        },
    },
    {
        label: "Đã trả lời",
        prop: "submission",
        type: "text",
        render(row, record) {
            return <span> {record.submissions?.length || 0} câu hỏi</span>
        },
    },
];
