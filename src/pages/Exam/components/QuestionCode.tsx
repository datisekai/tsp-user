import {IQuestion} from "../../../types/exam.ts";
import React from "react";

interface Props {
    question: IQuestion,
    index: number
}
const QuestionCode:React.FC<Props> = ({question, index}) => {
    const {content,acceptedLanguages,choices,id,createdAt,title,type,initCode,isPublic,updatedAt} = question;
    return <div className={"tw-animate-fade-right tw-animate-once"}>
        <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
        <p className={"tw-mt-2"}>{title}</p>
        <div className={"tw-mt-2"} dangerouslySetInnerHTML={{__html:content}}></div>
    </div>
}

export default React.memo(QuestionCode)