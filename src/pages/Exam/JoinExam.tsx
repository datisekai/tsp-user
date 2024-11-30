import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useExamStore } from "../../stores/examStore.ts";
import { useConfirm, useToast } from "../../hooks";
import MyCard from "../../components/UI/MyCard.tsx";
import { Button } from "primereact/button";
import Countdown from "react-countdown";
import QuestionCode from "./components/QuestionCode.tsx";
import MultiChoice from "./components/MultiChoice.tsx";
import { Badge } from "primereact/badge";
import MyLoading from "../../components/UI/MyLoading.tsx";
import { pathNames, QuestionType } from "../../constants";
import { useLanguageStore } from "../../stores/languageStore.ts";
import { CheatAction } from "../../types/exam.ts";
import { useCommonStore } from "../../stores/commonStore.ts";
import CodeHtml from "./components/CodeHtml.tsx";

const JoinExam = () => {
  const cheatActionsQueue = useRef<CheatAction[]>([]);
  const { id } = useParams();
  const { joinExam, currentExam, submissions, submitExam, saveAction } =
    useExamStore();
  const { showToast } = useToast();
  const [questionIndex, setQuestionIndex] = useState(0);
  const { onConfirm } = useConfirm();
  const navigate = useNavigate();
  const { languages } = useLanguageStore();
  const intervalRef = useRef<any>(null);
  const { setHeaderTitle } = useCommonStore();

  useEffect(() => {
    getJoinExam();
  }, [id]);

  useEffect(() => {
    setHeaderTitle("Làm bài thi");
  }, []);

  useEffect(() => {
    // Hàm chặn chuột phải
    const handleContextMenu = (e) => {
      e.preventDefault();
      cheatActionsQueue.current.push(CheatAction.MOUSE_RIGHT);
      showToast({
        severity: "danger",
        summary: "Cảnh báo",
        message: "Vui lòng không dùng chuột phải!",
      });
    };

    const handleKeydown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "v" || e.key === "c" || e.key === "x")
      ) {
        e.preventDefault();
        showToast({
          severity: "danger",
          summary: "Cảnh báo",
          message: "Vui lòng không Copy, Cut, Paste!",
        });
        cheatActionsQueue.current.push(CheatAction.CTROL_CVX);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cheatActionsQueue.current.push(CheatAction.OUT_TAB);
        onConfirm({
          header: "Cảnh báo",
          icon: "pi pi-ban",
          message: "Vui lòng không chuyển tab khi làm bài!",
          onAccept: () => {},
        });
      }
    };

    if (currentExam && currentExam.blockMouseRight) {
      document.addEventListener("contextmenu", handleContextMenu);
    }

    if (currentExam && currentExam.blockControlCVX) {
      document.addEventListener("keydown", handleKeydown);
    }

    if (currentExam && currentExam.logOutTab) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    intervalRef.current = setInterval(() => {
      if (cheatActionsQueue.current.length > 0) {
        saveAction(currentExam.id, cheatActionsQueue.current);
        cheatActionsQueue.current = [];
      }
    }, 15000);

    return () => {
      if (currentExam && currentExam.blockMouseRight) {
        document.removeEventListener("contextmenu", handleContextMenu);
      }
      if (currentExam && currentExam.blockControlCVX) {
        document.removeEventListener("keydown", handleKeydown);
      }
      if (currentExam && currentExam.blockControlCVX) {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      }
      clearInterval(intervalRef.current);
    };
  }, [currentExam, showToast, onConfirm, saveAction]);

  const getJoinExam = async () => {
    const result = await joinExam(Number(id));
    if (!result.success) {
      showToast({
        severity: "danger",
        summary: "Thông báo",
        message: result.message,
        life: 3000,
      });
      navigate(pathNames.EXAM);
    }
  };

  const examQuestion = useMemo(() => {
    return currentExam && currentExam.examQuestions
      ? currentExam?.examQuestions[questionIndex]
      : null;
  }, [questionIndex, currentExam]);

  const handleFinishExam = () => {
    if (Object.keys(submissions).length !== currentExam.examQuestions.length) {
      showToast({
        severity: "danger",
        summary: "Cảnh báo",
        message: `Vui lòng làm hết các câu hỏi.`,
      });
      return;
    }
    onConfirm({
      message: "Bạn có chắc chắn muốn nộp bài?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      onAccept: async () => {
        const success = await submitExam(currentExam.id);
        if (success) {
          showToast({
            severity: "success",
            summary: "Thông báo",
            message: "Nộp bài thành công.",
          });
          navigate(pathNames.EXAM);
          return;
        }
        showToast({
          severity: "danger",
          summary: "Thông báo",
          message: "Nộp bài thất bại.",
        });
      },
    });
  };

  const unansweredQuestions = useMemo(() => {
    return (
      currentExam?.examQuestions
        ?.filter((ex) => !submissions[ex.id])
        .map((item) => item.id) || []
    );
  }, [currentExam, submissions]);

  return (
    <div
      className={` tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-4  ${
        currentExam?.blockControlCVX ? "tw-select-none" : ""
      }`}
    >
      <MyCard containerClassName={"tw-flex-1 tw-h-full"}>
        <MyLoading isLoading={!examQuestion || !currentExam}>
          {examQuestion && currentExam && (
            <>
              {examQuestion.question.type === QuestionType.MULTIPLE_CHOICE && (
                <MultiChoice
                  key={examQuestion.id}
                  examId={currentExam.id}
                  examQuestion={examQuestion}
                  index={questionIndex}
                />
              )}
              {examQuestion.question.type === QuestionType.CODE && (
                <MyLoading isLoading={languages.length == 0}>
                  <QuestionCode
                    examId={currentExam.id}
                    examQuestion={examQuestion}
                    index={questionIndex}
                    currentExam={currentExam}
                  />
                </MyLoading>
              )}
              {examQuestion.question.type === QuestionType.CODE_HTML && (
                <CodeHtml
                  examId={currentExam.id}
                  examQuestion={examQuestion}
                  index={questionIndex}
                  currentExam={currentExam}
                />
              )}
            </>
          )}
        </MyLoading>

        <div className={"tw-flex tw-mt-4 tw-justify-center tw-gap-2"}>
          <Button
            disabled={questionIndex == 0}
            onClick={() => setQuestionIndex(questionIndex - 1)}
            severity={"secondary"}
            iconPos={"left"}
            icon={"pi pi-angle-left"}
            label={"Câu trước"}
          ></Button>
          <Button
            disabled={questionIndex == currentExam?.examQuestions?.length - 1}
            onClick={() => setQuestionIndex(questionIndex + 1)}
            label={"Câu tiếp theo"}
            iconPos={"right"}
            icon={"pi pi-angle-right"}
          ></Button>
        </div>
      </MyCard>
      <MyCard containerClassName={"tw-w-full md:tw-w-[15%] tw-relative"}>
        <h3>Thời gian làm bài</h3>
        {currentExam.endTime && (
          <div>
            <Countdown
              className={"tw-font-bold tw-text-lg"}
              date={new Date(currentExam?.endTime).getTime()}
            />
          </div>
        )}
        <Button
          onClick={handleFinishExam}
          className={"tw-my-4"}
          severity={"info"}
          outlined={true}
        >
          Nộp bài
        </Button>
        <p className={"tw-italic"}>
          Chú ý: Bạn có thể click vào số thứ tự câu hỏi bên dưới để chuyển câu.
        </p>
        <div className={"tw-gap-1 tw-mt-4 tw-flex tw-flex-wrap"}>
          {currentExam?.examQuestions?.map((item, i) => (
            <div className={"tw-relative"} key={item.id}>
              <Button
                onClick={() => setQuestionIndex(i)}
                outlined={questionIndex !== i}
                size={"small"}
              >
                {i + 1}
              </Button>
              {unansweredQuestions.includes(item.id) && (
                <Badge
                  className={"tw-absolute tw-top-1 tw-right-1"}
                  severity="danger"
                ></Badge>
              )}
            </div>
          ))}
        </div>
      </MyCard>
    </div>
  );
};

export default JoinExam;
