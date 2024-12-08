import { IExamQuestion } from "../../../types/exam.ts";
import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useExamStore } from "../../../stores/examStore.ts";

interface Props {
  examQuestion: IExamQuestion;
  index: number;
  examId: number;
}
const MultiChoice: React.FC<Props> = ({ examQuestion, index, examId }) => {
  const [choose, setChoose] = useState<any>(null);
  const { content, choices, title } = examQuestion.question;
  const { id } = examQuestion;

  const { submitMultipleChoice, submissions } = useExamStore();

  useEffect(() => {
    if (choose) {
      submitMultipleChoice({
        examQuestionId: id,
        answer: choices[choose - 1].text,
        examId,
      });
    }
  }, [choose]);

  useEffect(() => {
    if (submissions && Object.keys(submissions).length > 0) {
      const submission = submissions[id];
      if (submission) {
        const submissionIndex = choices.findIndex(
          (choice) => choice.text === submission.answer
        );
        setChoose(submissionIndex + 1);
      }
    }
  }, [submissions, choices]);

  return (
    <div className={"tw-animate-fade"}>
      <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
      <p className={"tw-mt-4"}>{title}</p>
      <div
        className={"tw-mt-1"}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className={"tw-mt-4 tw-space-y-2"}>
        {choices.map((choice, index) => (
          <div key={`choice-${index}-${id}`}>
            <RadioButton
              inputId={`choice-${index}-${id}`}
              name="choice"
              value={index + 1}
              onChange={(e) => setChoose(e.value)}
              checked={choose == index + 1}
            />
            <label htmlFor={`choice-${index}-${id}`} className="ml-2">
              {choice.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MultiChoice);
