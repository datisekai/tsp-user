import { TableSchema } from "../types/table";

export const notificationSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Tên thông báo",
    prop: "name",
    type: "text",
  },
  {
    label: "Nội dung thông báo",
    prop: "content",
    type: "text",
    render: (row, record) => {
      return <div dangerouslySetInnerHTML={{ __html: row }}></div>
    }
  },
  {
    label: "Thời gian",
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Lớp",
    prop: "classNames",
    type: "text",
  },
];
