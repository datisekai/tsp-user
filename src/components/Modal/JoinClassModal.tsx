import React, { InputHTMLAttributes, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";
import { useClassStore } from "../../stores/classStore";
import { useToast } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../constants";
import { useModalStore } from "../../stores";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  events: React.HTMLAttributes<HTMLInputElement>;
  props: React.HTMLAttributes<HTMLInputElement>;
}

const JoinClassModal = () => {
  const [code, setCode] = useState<any>("");
  const { join, getMe } = useClassStore();
  const { showToast } = useToast();
  const { onDismiss } = useModalStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const customInput = ({ events, props }: CustomInputProps) => (
    <input {...events} {...props} type="text" className="custom-otp-input" />
  );

  const handleJoin = async () => {
    setLoading(true);
    const result = await join(code);
    setLoading(false);
    if (!result) {
      return showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Tham gia lớp học thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Tham gia lớp học thành công",
      life: 3000,
    });

    getMe();
    navigate(pathNames.CLASS);
    onDismiss();
  };
  return (
    <div>
      <div className="flex justify-content-center">
        <style scoped>
          {`
                    .custom-otp-input {
                        width: 40px;
                        font-size: 36px;
                        border: 0 none;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        background: transparent;
                        border-bottom: 2px solid var(--surface-500);
                    }

                    .custom-otp-input:focus {
                        outline: 0 none;
                        border-bottom-color: var(--primary-color);
                    }
                `}
        </style>
        <InputOtp
          value={code}
          onChange={(e) => setCode(e.value)}
          inputTemplate={customInput as any}
          length={6}
        />
      </div>

      <div className="tw-mt-10 tw-flex tw-justify-end">
        <Button
          label="Tham gia"
          onClick={handleJoin}
          loading={loading}
          disabled={code?.length !== 6}
          icon="pi pi-play"
        ></Button>
      </div>
    </div>
  );
};

export default JoinClassModal;
