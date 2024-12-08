import React, { useEffect, useMemo, useState } from "react";
import {
  IExamQuestion,
  IJoinExam,
  IRunCodeResult,
} from "../../../types/exam.ts";
import Editor from "@monaco-editor/react";
import { useLanguageStore } from "../../../stores/languageStore.ts";
import { Dropdown } from "primereact/dropdown";
import { zeroPad } from "../../../utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useConfirm, useToast } from "../../../hooks";
import { examService } from "../../../services/examService.ts";
import { TabPanel, TabView } from "primereact/tabview";
import { encode, decode } from "js-base64";
import { useExamStore } from "../../../stores/examStore.ts";
import { useCommonStore } from "../../../stores/commonStore.ts";
import MyHtmlCodeEditor from "../../../components/UI/MyHtmlCodeEditor.tsx";

interface Props {
  examQuestion: IExamQuestion;
  index: number;
  examId: number;
  currentExam: IJoinExam;
}

const CodeHtml: React.FC<Props> = ({
  examQuestion,
  index,
  examId,
  currentExam,
}) => {
  const { question } = examQuestion;
  const { title, content } = question;
  const [initCode, setInitCode] = useState<any>(question.initCode || "");
  const { isLoadingApi } = useCommonStore();
  const [code, setCode] = useState({
    html: "",
    css: "",
    javascript: "",
  });
  console.log('initCode', initCode);
  const { onConfirm } = useConfirm();
  const { submitCode, submissions, submitCodeHtml } = useExamStore();
  const { showToast } = useToast();

  const handleSubmit = () => {
    onConfirm({
      header: "Xác nhận",
      message: "Bạn có chắc chắn muốn submit câu này?",
      onAccept: async () => {
        await submitCodeHtml({
          examQuestionId: examQuestion.id,
          examId,
          code,
        });
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Submit câu trả lời thành công.",
        });
      },
    });
  };

  useEffect(() => {
    const submission = submissions[examQuestion.id];
    setCode(submission?.answer || question?.initCode || "");
    setInitCode(submission?.answer || question?.initCode || "");
  }, [submissions, examQuestion.id]);


  return (
    <div
      className={
        "tw-animate-fade-right tw-animate-once tw-flex tw-flex-col tw-gap-2"
      }
    >
      <div className="tw-w-full tw-flex">
        <div className={"tw-w-full "}>
          <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
          <p className={"tw-mt-2"}>{title}</p>
          <div
            className={"tw-mt-1"}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            loading={isLoadingApi}
            icon={"pi pi-bolt"}
            iconPos={"right"}
            label={"Submit"}
          ></Button>
        </div>
      </div>
      <div className={"tw-flex-1 overflow-x-auto"}>
        <MyHtmlCodeEditor
          key={`${examQuestion.id}-${JSON.stringify(initCode)}`}
          onChange={setCode}
          heightItem="30vh"
          htmlInitialValue={initCode?.html || ""}
          cssInitialValue={initCode?.css || ""}
          jsInitialValue={initCode?.javascript || ""}
        />
      </div>
    </div>
  );
};

export default React.memo(CodeHtml);
