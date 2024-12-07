import { apiConfig } from "../apis";
import { IForm } from "../types/form-item";

export const LetterForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "type",
        type: "select",
        label: "Loại đơn",
        options: [{ title: "Đơn xin nghỉ", value: "leave_application" }],
        col: 6,
      },
      {
        prop: "classId",
        type: "select-ajax",
        label: "Lớp học",
        col: 6,
        apiUrl: apiConfig.class.getAll.endpoint,
        getOptions(data) {
          return (
            data?.map((item: any) => ({
              title: `${item.major.name} - ${item.name}`,
              value: item.id,
            })) || []
          );
        },
      },
      {
        prop: "time",
        type: "date",
        label: "Thời gian",
        col: 6,
      },
      {
        prop: "reason",
        type: "editor",
        label: "Lý do",
        col: 12,
      },
      {
        prop: "image",
        type: "image",
        label: "Minh chứng",
        col: 6,
        required: false,
      },
    ],
  },
];
