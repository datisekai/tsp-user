import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import TestModal from "../components/Modal/TestModal";
import { ModalName } from "../constants";
import { useModalStore } from "../stores/modalStore";

const DynamicModal = () => {
  const { modalName, onDismiss, onToggle, visible, footer, header, style } =
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
    </Dialog>
  );
};

export default DynamicModal;
