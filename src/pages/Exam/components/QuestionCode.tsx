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

interface Props {
  examQuestion: IExamQuestion;
  index: number;
  examId: number;
  currentExam: IJoinExam;
}

const QuestionCode: React.FC<Props> = ({
  examQuestion,
  index,
  examId,
  currentExam,
}) => {
  const { question } = examQuestion;
  const { title, content, acceptedLanguages, initCode, testCases } = question;
  const { isLoadingApi } = useCommonStore();
  const languages = useLanguageStore((state) => state.languages);
  const [defaultLanguage, setDefaultLanguage] = useState<{
    id: number;
    name: string;
  }>({ name: "", id: 0 });
  const [editorValue, setEditorValue] = useState("//some code");
  const { onConfirm } = useConfirm();
  const [runCode, setRunCode] = useState<{ [key: string]: IRunCodeResult }>({});
  const [loadingRunCode, setLoadingRunCode] = useState(false);
  const { submitCode, submissions } = useExamStore();
  const { showToast } = useToast();

  const languageOptions = useMemo(() => {
    return (
      acceptedLanguages
        ?.map((item) => {
          const language = languages.find((language) => +language.id === +item);
          return language;
        })
        .filter((item) => item) || []
    );
  }, [languages, acceptedLanguages]);

  const editorLanguageName = useMemo(() => {
    if (defaultLanguage && defaultLanguage.name)
      return defaultLanguage.name.split(" ")[0].toLowerCase();
    return "";
  }, [defaultLanguage]);

  useEffect(() => {
    if (
      defaultLanguage &&
      defaultLanguage.id &&
      initCode &&
      Object.keys(initCode).length > 0
    ) {
      const submission = submissions[examQuestion.id];
      console.log("initcode", initCode, submission, defaultLanguage);
      let newEditorValue = initCode[defaultLanguage.id] || "//some code";
      if (submission && submission.languageId == defaultLanguage.id) {
        newEditorValue = submission.answer;
      }

      setEditorValue(newEditorValue);
    }
  }, [initCode, defaultLanguage, submissions, examQuestion.id]);

  useEffect(() => {
    if (initCode && Object.keys(initCode).length > 0) {
      const firstKey = Object.keys(initCode)[0];
      setDefaultLanguage({
        id: +firstKey,
        name: languages.find((item) => item.id === +firstKey)?.name || "",
      });
    }
  }, [examQuestion.id]);

  const handleRunCode = async () => {
    setLoadingRunCode(true);
    Promise.allSettled(
      testCases?.map((testcase) => {
        return examService.runTestCode({
          language_id: defaultLanguage.id,
          expected_output: encode(testcase.expectedOutput),
          stdin: encode(testcase.input),
          source_code: encode(editorValue),
        });
      })
    )
      .then((result) => {
        const newRunCode = {};
        result.forEach((item, index) => {
          if (item.status === "fulfilled") {
            const testcaseId = testCases[index].id;
            newRunCode[testcaseId] = item.value;
          }
        });
        setRunCode(newRunCode);
        console.log("result", result);
      })
      .finally(() => {
        setLoadingRunCode(false);
      });
  };

  const handleSubmit = () => {
    onConfirm({
      header: "Xác nhận",
      message: "Bạn có chắc chắn muốn submit câu này?",
      onAccept: async () => {
        await submitCode({
          examQuestionId: examQuestion.id,
          examId,
          languageId: defaultLanguage.id,
          code: editorValue,
        });
        showToast({
          severity: "success",
          summary: "Thông báo",
          message: "Submit câu trả lời thành công.",
        });
      },
    });
  };

  const getTestcaseResult = (result: IRunCodeResult) => {
    console.log("result", result);
    if (!result) return "Không có";
    if (result.stdout) return decode(result.stdout);
    if (result.compile_output) return decode(result.compile_output);
    return result.stderr;
  };

  return (
    <div
      className={
        "tw-animate-fade-right tw-animate-once tw-flex tw-flex-col xl:tw-flex-row tw-gap-2"
      }
    >
      <div className={"tw-w-full xl:tw-w-[30%]"}>
        <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
        <p className={"tw-mt-2"}>{title}</p>
        <div
          className={"tw-mt-1"}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className={"tw-space-y-4 tw-mt-4"}>
          {testCases?.map((testcase, index) => (
            <div>
              <div
                className={"tw-flex tw-gap-2 tw-mb-2 tw-items-center"}
                key={index}
              >
                <div
                  className={
                    "bg-primary tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border tw-size-[30px]"
                  }
                >
                  {zeroPad(index + 1, 2)}
                </div>
                <div className={"tw-font-bold"}>
                  Test {zeroPad(index + 1, 2)}
                </div>
              </div>
              <div className={"tw-flex tw-gap-2"}>
                <div className={"tw-flex-1"}>
                  <div>Đầu vào</div>
                  <InputTextarea
                    readOnly={true}
                    value={testcase.input}
                    rows={3}
                    cols={15}
                    className={"tw-w-full tw-bg-gray-50"}
                  />
                </div>
                <div className={"tw-flex-1"}>
                  <div>Kết quả</div>
                  <InputTextarea
                    readOnly={true}
                    value={testcase.expectedOutput}
                    rows={3}
                    cols={15}
                    className={"tw-w-full tw-bg-gray-50"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={"tw-flex-1 tw-border-l-2 tw-px-4 overflow-x-auto"}>
        <div className={"tw-mb-8 tw-flex tw-justify-between tw-items-center"}>
          <Dropdown
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.value)}
            options={languageOptions}
            optionLabel="name"
            placeholder="Chọn ngôn ngữ"
          />
          <div className={"tw-flex tw-items-center tw-gap-2"}>
            <Button
              severity={"warning"}
              loading={loadingRunCode}
              onClick={handleRunCode}
              icon={"pi pi-caret-right"}
              iconPos={"right"}
              label={"Run"}
            ></Button>
            <Button
              onClick={handleSubmit}
              loading={isLoadingApi}
              icon={"pi pi-bolt"}
              iconPos={"right"}
              label={"Submit"}
            ></Button>
          </div>
        </div>
        <Editor
          height="40vh"
          options={{ contextmenu: !currentExam.blockControlCVX }}
          defaultLanguage={editorLanguageName}
          onChange={(value) => setEditorValue(value as string)}
          value={editorValue}
        />
        {Object.keys(runCode).length > 0 && (
          <div>
            <div className={"tw-font-bold"}>Kết quả run code:</div>
            <TabView className={"tw-bg-gray-50 tw-space-y-1 tw-mt-4 p-4"}>
              {testCases?.map((testcase, index) => (
                <TabPanel
                  key={index}
                  header={
                    <div>
                      <i
                        className={`pi ${
                          runCode[testcase.id]?.status.id === 3
                            ? "pi-check tw-text-green-500"
                            : "pi-times tw-text-red-500"
                        }`}
                        style={{
                          fontSize: "1rem",
                          marginRight: 4,
                        }}
                      ></i>
                      Testcase {zeroPad(index + 1, 2)}
                    </div>
                  }
                >
                  {getTestcaseResult(runCode[testcase.id])}
                </TabPanel>
              ))}
            </TabView>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(QuestionCode);
