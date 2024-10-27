import {IQuestion} from "../../../types/exam.ts";
import React, {useEffect, useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {useExamStore} from "../../../stores/examStore.ts";

interface Props {
    question: IQuestion,
    index: number,
    examId: number
}
const MultiChoice:React.FC<Props> = ({question, index, examId}) => {
    const [choose, setChoose] = useState(null)
    const {content,choices,id,title} = question;

    const {submitMultipleChoice} = useExamStore()

    useEffect(() => {
        if(choose){
            submitMultipleChoice({questionId: id, answer: choices[choose - 1].text, examId})
        }
    }, [choose]);


    return <div className={"tw-animate-fade-right tw-animate-once"}>
        <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
        <p className={"tw-mt-4"}>{title}</p>
        <div className={"tw-mt-1"} dangerouslySetInnerHTML={{__html:content}}></div>
        <div className={"tw-mt-4 tw-space-y-2"}>
            {choices.map((choice, index) => (
                <div key={`choice-${index}-${id}`}>
                    <RadioButton inputId={`choice-${index}-${id}`} name="choice" value={index + 1} onChange={(e) => setChoose(e.value)} checked={choose == index + 1} />
                    <label htmlFor={`choice-${index}`} className="ml-2">{choice.text}</label>
                </div>
            ))}
        </div>
    </div>
}

export default React.memo(MultiChoice)