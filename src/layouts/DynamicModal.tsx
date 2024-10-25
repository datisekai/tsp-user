import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import TestModal from "../components/Modal/TestModal";
import { ModalName } from "../constants";
import { useModalStore } from "../stores/modalStore";
import NotificationModal from "../components/Modal/NotificationModal";
import LetterModal from "../components/Modal/LetterModal";

const DynamicModal = () => {
  const { modalName, onDismiss, visible, footer, header, style } =
    useModalStore();

  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [visible]);
  return (
    <Dialog
      visible={visible}
      modal
      header={header}
      footer={footer}
      className={`tw-w-[90%] md:tw-w-[50rem] ${style} modal-${modalName}`}
      onHide={onDismiss}
    >
      {modalName === ModalName.TEST && <TestModal />}
      {modalName === ModalName.NOTIFICATION && <NotificationModal />}
      {modalName === ModalName.LETTER && <LetterModal />}
    </Dialog>
  );
};

export default DynamicModal;
