import { useMemo } from "react";
import { useModalStore } from "../../stores/modalStore";
import dayjs from "dayjs";
import { INotification } from "../../types/notification";
import { LetterTypeData } from "../../constants";
import { LetterStatus } from "../../types/letter";
import { Tag } from "primereact/tag";
import { getImageServer } from "../../utils";

function getStatus(value: string) {
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
}
const LetterModal = () => {
  const { content } = useModalStore();

  const status = useMemo(() => {
    return getStatus(content.status);
  }, [content]);

  return (
    <div>
      <div className="tw-flex tw-gap-x-4 md:tw-flex-row tw-gap-y-4 md:tw-items-center tw-flex-col-reverse">
        <div className="tw-flex-1 tw-space-y-2">
          <div>
            Loại đơn:{" "}
            <strong>{LetterTypeData[content.type] || "Không xác định"}</strong>
          </div>
          <div>
            Trạng thái:{" "}
            <Tag severity={status.severity as any} value={status.value} />
          </div>
          <div>
            Ngày tạo:{" "}
            <strong>
              {dayjs(content.createdAt).format("DD/MM/YYYY HH:mm")}
            </strong>
          </div>
          <div>
            Thời gian:{" "}
            <strong>
              {dayjs(content.time).format("DD/MM/YYYY")}
            </strong>
          </div>
          <div>
            Lớp:{" "}
            <strong>
              {content.class.major.name} - {content.class.name}
            </strong>
          </div>
          <div>
            Lý do: <div dangerouslySetInnerHTML={{ __html: content.reason }}></div>
          </div>
        </div>
        {content.image && (
          <div className="tw-flex-1">
            <img src={getImageServer(content.image)} alt="image" className="tw-w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterModal;
