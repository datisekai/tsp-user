import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useExamStore} from "../../stores/examStore.ts";
import {useConfirm, useToast} from "../../hooks";
import MyCard from "../../components/UI/MyCard.tsx";
import {Button} from "primereact/button";
import MyLoading from "../../components/UI/MyLoading.tsx";
import {pathNames} from "../../constants";
import {useLanguageStore} from "../../stores/languageStore.ts";
import PreviewMultiChoice from "./components/PreviewMultiChoice.tsx";

const HistoryExam = () => {
    const {id} = useParams()
    const {getHistory, getTakeOrder, history} = useExamStore()
    const {showToast} = useToast()
    const [questionIndex, setQuestionIndex] = useState(0)
    const {onConfirm} = useConfirm()
    const navigate = useNavigate()
    const {languages} = useLanguageStore()

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        if (id) {
            await Promise.all([getHistory(+id), getTakeOrder(+id)]).catch(() => {
                showToast({
                    severity: "danger",
                    message: "Có lỗi xảy ra, vui lòng thử lại sau",
                })
                navigate(pathNames.EXAM)
            })
        }
    }

    const currentExam = useMemo(() => {
        if (!history.takeOrder || !history.takeOrder[questionIndex] || !history.submissions || Object.keys(history.submissions).length == 0) return null
        const examQuestionId = history.takeOrder[questionIndex]
        return history.submissions[examQuestionId]
    }, [history, questionIndex])

    console.log('history', history)


    return <div className={"tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-4"}>
        <MyCard containerClassName={"tw-w-full md:tw-w-[70%] tw-h-full"}>
            <MyLoading isLoading={!currentExam}>
                {currentExam?.questionTemp?.type === "multiple_choice" ?
                    <PreviewMultiChoice showResult={history.showResult} index={questionIndex}
                                        data={currentExam}/> : null}
            </MyLoading>

            <div className={"tw-flex tw-mt-4 tw-justify-center tw-gap-2"}>
                <Button disabled={questionIndex == 0} onClick={() => setQuestionIndex(questionIndex - 1)}
                        severity={"secondary"} iconPos={"left"} icon={"pi pi-angle-left"} label={"Câu trước"}></Button>
                <Button disabled={questionIndex == history?.takeOrder?.length - 1}
                        onClick={() => setQuestionIndex(questionIndex + 1)} label={"Câu tiếp theo"} iconPos={"right"}
                        icon={"pi pi-angle-right"}></Button>
            </div>
        </MyCard>
        <MyCard containerClassName={"tw-w-full md:tw-w-[30%]"}>
            <h3>Thời gian làm bài</h3>
            <div>
                Đã kết thúc
            </div>
            <p className={"tw-italic"}>Chú ý: Bạn có thể click vào số thứ tự câu hỏi bên dưới để chuyển câu.</p>
            <div className={"tw-gap-1 tw-mt-4 tw-flex tw-flex-wrap"}>
                {history?.takeOrder?.map((item, i) => <div className={"tw-relative"} key={item}>
                    <Button onClick={() => setQuestionIndex(i)} outlined={questionIndex !== i}
                            size={"small"}>{i + 1}</Button>
                </div>)}
            </div>
        </MyCard>
    </div>
}

export default HistoryExam