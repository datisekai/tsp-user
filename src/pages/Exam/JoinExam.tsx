import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useExamStore} from "../../stores/examStore.ts";
import {useConfirm, useToast} from "../../hooks";
import MyCard from "../../components/UI/MyCard.tsx";
import {Button} from "primereact/button";
import Countdown from "react-countdown";
import QuestionCode from "./components/QuestionCode.tsx";
import {QuestionType} from "../../types/exam.ts";
import MultiChoice from "./components/MultiChoice.tsx";
import {Badge} from "primereact/badge";
import MyLoading from "../../components/UI/MyLoading.tsx";

const JoinExam = () => {
    const {id} = useParams()
    const {joinExam, currentExam,submissions} = useExamStore()
    const {showToast} = useToast()
    const [questionIndex, setQuestionIndex] = useState(0)
    const {onConfirm} = useConfirm()

    useEffect(() => {
        getJoinExam();
    }, [id]);

    const getJoinExam = async () => {
        const success = await joinExam(Number(id))
        if (!success) {
            showToast({
                severity: "danger",
                summary: "Thông báo",
                message: "Bài kiểm tra không tồn tại.",
                life: 3000,
            })
        }
    }

    const question = useMemo(() => {
        return currentExam && currentExam.questions ? currentExam?.questions[questionIndex] : null
    },[questionIndex, currentExam])

    const handleFinishExam = () => {
        if(Object.keys(submissions).length !== currentExam.questions.length) {

            showToast(
                {
                    severity: "danger",
                    summary: "Cảnh báo",
                    message: `Vui lòng làm hết các câu hỏi.`,
                }
            )
            return
        }
            onConfirm({
                message: "Bạn có chắc chắn muốn nộp bài?",
                header: "Xác nhận",
                icon: "pi pi-exclamation-triangle",
                onAccept: () => {
                    console.log('finish exam')
                }
            })
    }

    const unansweredQuestions = useMemo(() => {
        return currentExam?.questions?.filter(
            (question) => !submissions[question.id]
        ).map(item => item.id) || [];
    },[currentExam, submissions])



    return <div className={"tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-4"}>
        <MyCard containerClassName={"tw-flex-1 tw-h-full"}>
           <MyLoading isLoading={!question || !currentExam}>
               {question && currentExam && <>
                   {question.type === QuestionType.MULTIPLE_CHOICE ? <MultiChoice key={question.id} examId={currentExam.id} question={question} index={questionIndex}/> : <QuestionCode question={question} index={questionIndex}/>}
               </>}
           </MyLoading>

            <div className={"tw-flex tw-mt-4 tw-justify-center tw-gap-2"}>
                <Button disabled={questionIndex == 0} onClick={() => setQuestionIndex(questionIndex - 1)} severity={"secondary"} iconPos={"left"} icon={"pi pi-angle-left"} label={"Câu trước"}></Button>
                <Button disabled={questionIndex == currentExam?.questions?.length - 1} onClick={() => setQuestionIndex(questionIndex + 1)} label={"Câu tiếp theo"} iconPos={"right"} icon={"pi pi-angle-right"}></Button>
            </div>
        </MyCard>
        <MyCard containerClassName={"tw-w-full md:tw-w-[30%]"}>
            <h3>Thời gian làm bài</h3>
            {currentExam.endTime && <div><Countdown className={"tw-font-bold tw-text-lg"} date={new Date(currentExam?.endTime).getTime()}/></div>}
            <Button onClick={handleFinishExam} className={"tw-my-4"} severity={"info"} outlined={true}>Nộp bài</Button>
            <p className={"tw-italic"}>Chú ý: Bạn có thể click vào số thứ tự câu hỏi bên dưới để chuyển câu.</p>
            <div className={"tw-gap-1 tw-mt-4 tw-flex tw-flex-wrap"}>
                {currentExam?.questions?.map((item,i) => <div className={"tw-relative"} key={item.id}>
                    <Button onClick={() => setQuestionIndex(i)} outlined={questionIndex !== i}  size={"small"}>{i + 1}</Button>
                    {unansweredQuestions.includes(item.id) &&   <Badge className={"tw-absolute tw-top-1 tw-right-1"} severity="danger"></Badge>}
                </div> )}
            </div>
        </MyCard>
    </div>
}

export default JoinExam