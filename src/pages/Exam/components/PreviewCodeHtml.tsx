import React, { useEffect, useMemo, useState } from "react";
import {
  IExamQuestion,
  IHistoryExam,
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
  data: IHistoryExam;
  index: number;
}

const PreviewCodeHtml: React.FC<Props> = ({ data, index }) => {
  const { title, content } = data.questionTemp;

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
      </div>
      <div className={"tw-flex-1 tw-border-l-2 tw-px-4 overflow-x-auto"}>
        <MyHtmlCodeEditor
          key={data.id}
          options={{ readOnly: true }}
          heightItem="30vh"
          htmlInitialValue={data?.codeHtml?.html || ""}
          cssInitialValue={data?.codeHtml?.css || ""}
          jsInitialValue={data?.codeHtml?.javascript || ""}
        />
      </div>
    </div>
  );
};

export default React.memo(PreviewCodeHtml);
