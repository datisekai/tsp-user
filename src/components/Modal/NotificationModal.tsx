import { useMemo } from "react";
import { useModalStore } from "../../stores/modalStore";
import dayjs from "dayjs";
import { INotification } from "../../types/notification";

const NotificationModal = () => {
  const { content } = useModalStore();

  const classNames: string = useMemo(() => {
    return (content as INotification).classes
      .map((c) => `${c.major.name} - ${c.name}`)
      .join(";");
  }, [content]);
  return (
    <div>
      <div className="tw-flex tw-gap-x-4 md:tw-flex-row tw-gap-y-4 md:tw-items-center tw-flex-col-reverse">
        <div className="tw-flex-1 tw-space-y-2">
          <div>
            Tiêu đề: <strong>{content.name}</strong>
          </div>
          <div>
            Thời gian:{" "}
            <strong>
              {dayjs(content.createdAt).format("DD/MM/YYYY HH:mm")}
            </strong>
          </div>
          <div>
            Dành cho: <strong>{classNames}</strong>
          </div>
        </div>
        {content.image && (
          <div className="tw-flex-1">
            <img src={content.image} alt="image" className="tw-w-full" />
          </div>
        )}
      </div>

      <div className="tw-mt-4">
        <h3 className="tw-font-bold">Nội dung</h3>
        <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
      </div>
    </div>
  );
};

export default NotificationModal;
