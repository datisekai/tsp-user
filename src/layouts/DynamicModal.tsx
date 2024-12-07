import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import TestModal from "../components/Modal/TestModal";
import { ModalName } from "../constants";
import { useModalStore } from "../stores/modalStore";
import NotificationModal from "../components/Modal/NotificationModal";
import LetterModal from "../components/Modal/LetterModal";
import ScanQrModal from "../components/Modal/ScanQrModal";
import UpdateProfileModal from "../components/Modal/UpdateProfileModal.tsx";
import JoinClassModal from "../components/Modal/JoinClassModal.tsx";

const DynamicModal = () => {
  const { modalName, onDismiss, visible, footer, header, style, content } =
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
      closable={content?.closeable != null ? content.closeable : true}
    >
      {modalName === ModalName.TEST && <TestModal />}
      {modalName === ModalName.NOTIFICATION && <NotificationModal />}
      {modalName === ModalName.LETTER && <LetterModal />}
      {modalName === ModalName.SCAN_QR && <ScanQrModal />}
      {modalName === ModalName.UPDATE_PROFILE && <UpdateProfileModal />}
      {modalName === ModalName.JOIN_CLASS && <JoinClassModal />}
    </Dialog>
  );
};

export default DynamicModal;
