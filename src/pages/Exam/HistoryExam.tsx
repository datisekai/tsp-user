import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useExamStore } from "../../stores/examStore.ts";
import { useConfirm, useToast } from "../../hooks";
import MyCard from "../../components/UI/MyCard.tsx";
import { Button } from "primereact/button";
import MyLoading from "../../components/UI/MyLoading.tsx";
import { pathNames, QuestionType } from "../../constants";
import { useLanguageStore } from "../../stores/languageStore.ts";
import PreviewMultiChoice from "./components/PreviewMultiChoice.tsx";
import PreviewQuestionCode from "./components/PreviewQuestionCode.tsx";
import { useCommonStore } from "../../stores/commonStore.ts";
import PreviewCodeHtml from "./components/PreviewCodeHtml.tsx";

const HistoryExam = () => {
  const { id } = useParams();
  const { getHistory, getTakeOrder, history } = useExamStore();
  const { showToast } = useToast();
  const [questionIndex, setQuestionIndex] = useState(0);
  const { onConfirm } = useConfirm();
  const navigate = useNavigate();
  const { languages } = useLanguageStore();
  const { setHeaderTitle } = useCommonStore();

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    setHeaderTitle("Làm bài thi");
  }, []);
  const getData = async () => {
    if (id) {
      await Promise.all([getHistory(+id), getTakeOrder(+id)]).catch(() => {
        showToast({
          severity: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại sau",
        });
        navigate(pathNames.EXAM);
      });
    }
  };

  const currentExam = useMemo(() => {
    if (
      !history.takeOrder ||
      !history.takeOrder[questionIndex] ||
      !history.submissions ||
      Object.keys(history.submissions).length == 0
    )
      return null;
    const examQuestionId = history.takeOrder[questionIndex];
    return history.submissions[examQuestionId];
  }, [history, questionIndex]);

  const examResult = useMemo(() => {
    let count = 0;
    let grades = 0;
    if (
      history &&
      history.submissions &&
      Object.keys(history.submissions).length > 0
    ) {
      for (const s of Object.values(history.submissions)) {
        if ((s as any)?.grade) {
          count += 1;
          grades += (s as any)?.grade;
        }
      }
    }

    return {
      count,
      grades,
    };
  }, [history]);

  return (
    <div className={"tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-4"}>
      <MyCard containerClassName={"tw-flex-1 tw-h-full"}>
        <MyLoading isLoading={!currentExam}>
          {currentExam?.questionTemp?.type === QuestionType.MULTIPLE_CHOICE && (
            <PreviewMultiChoice
              showResult={history.showResult}
              index={questionIndex}
              data={currentExam}
            />
          )}
          {currentExam?.questionTemp?.type === QuestionType.CODE && (
            <PreviewQuestionCode
              showResult={history.showResult}
              index={questionIndex}
              data={currentExam}
            />
          )}
          {currentExam?.questionTemp.type === QuestionType.CODE_HTML && (
            <PreviewCodeHtml data={currentExam} index={questionIndex} />
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
            disabled={questionIndex == history?.takeOrder?.length - 1}
            onClick={() => setQuestionIndex(questionIndex + 1)}
            label={"Câu tiếp theo"}
            iconPos={"right"}
            icon={"pi pi-angle-right"}
          ></Button>
        </div>
      </MyCard>
      <MyCard containerClassName={"tw-w-full md:tw-w-[15%]"}>
        {history.showResult && (
          <div className="tw-mb-2 tw-font-bold bg-primary tw-px-4 tw-py-2">
            <p>
              Số câu đúng: {examResult?.count}/{history?.takeOrder?.length}
            </p>
            <p>Điểm số: {examResult.grades}</p>
          </div>
        )}
        <h3>Thời gian làm bài</h3>
        <div className="tw-font-bold tw-mb-2">Đã kết thúc</div>

        <p className={"tw-italic"}>
          Chú ý: Bạn có thể click vào số thứ tự câu hỏi bên dưới để chuyển câu.
        </p>
        <div className={"tw-gap-1 tw-mt-4 tw-flex tw-flex-wrap"}>
          {history?.takeOrder?.map((item, i) => (
            <div className={"tw-relative"} key={item}>
              <Button
                onClick={() => setQuestionIndex(i)}
                outlined={questionIndex !== i}
                size={"small"}
              >
                {i + 1}
              </Button>
            </div>
          ))}
        </div>
      </MyCard>
    </div>
  );
};

export default HistoryExam;
