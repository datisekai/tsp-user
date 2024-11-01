import React, {useEffect, useMemo, useState} from "react";
import {IExamQuestion} from "../../../types/exam.ts";
import Editor from '@monaco-editor/react';
import {useLanguageStore} from "../../../stores/languageStore.ts";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {zeroPad} from "../../../utils";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useConfirm} from "../../../hooks";
import {Tag} from "primereact/tag";
import {examService} from "../../../services/examService.ts";

interface Props {
    examQuestion: IExamQuestion,
    index: number
}
const QuestionCode:React.FC<Props> = ({examQuestion, index}) => {
    const {question } = examQuestion;
    const {title, content, acceptedLanguages, initCode, testCases} = question;
    const languages = useLanguageStore(state => state.languages);
    const [defaultLanguage, setDefaultLanguage] = useState<{id: number, name: string}>({name:'', id:0})
    const [editorValue, setEditorValue] = useState("//some code")
    const {onConfirm} = useConfirm()
    const [runCode, setRunCode] = useState({})
    const [loadingRunCode, setLoadingRunCode] = useState(false)

    const languageOptions = useMemo(() => {
            return acceptedLanguages?.map(item => {
                const language = languages.find(language => +language.id === +item)
                return language;
            }).filter(item => item) || []
    },[languages, acceptedLanguages])

    const editorLanguageName = useMemo(() => {
        if(defaultLanguage && defaultLanguage.name) return defaultLanguage.name.split(" ")[0].toLowerCase();
        return ''
    },[defaultLanguage])

    useEffect(() => {
        if(defaultLanguage && defaultLanguage.id && initCode){
            setEditorValue(initCode[defaultLanguage.id] || '//some code')
        }
    },[initCode, defaultLanguage])

    useEffect(() => {
        if(initCode && Object.keys(initCode).length > 0){
            const firstKey = Object.keys(initCode)[0]
            setDefaultLanguage({id: +firstKey, name: languages.find(item => item.id === +firstKey)?.name || ''})
        }
    },[])

    const handleRunCode = async() => {
        setLoadingRunCode(true);
        Promise.allSettled(testCases?.map(testcase => {
            return examService.runTestCode({
                language_id: defaultLanguage.id,
                expected_output: testcase.expectedOutput,
                stdin: testcase.input,
                source_code: editorValue
            })
        })).then(result => {
            console.log('result', result)
        }).finally(() => {
            setLoadingRunCode(false)
        })
    }

    const handleSubmit = () => {
        onConfirm({
            header: "Xác nhận",
            message: "Bạn có chắc chắn muốn submit?",
            onAccept: async () => {
            }

        })
    }

    return <div className={"tw-animate-fade-right tw-animate-once tw-flex tw-flex-col xl:tw-flex-row tw-gap-2"}>
        <div className={"tw-w-full xl:tw-w-[30%]"}>
            <h2 className={"tw-font-bold"}>Câu hỏi {index + 1}</h2>
            <p className={"tw-mt-2"}>{title}</p>
            <div className={"tw-mt-1"} dangerouslySetInnerHTML={{__html: content}}></div>
            <div className={"tw-space-y-4 tw-mt-4"}>
                {testCases?.map((testcase, index) => <div>
                    <div className={'tw-flex tw-gap-2 tw-mb-2 tw-items-center'} key={index}>
                        <div className={"bg-primary tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border tw-size-[30px]"}>{zeroPad(index + 1, 2)}</div>
                        <div className={"tw-font-bold"}>Test {zeroPad(index + 1, 2)}</div>
                    </div>
                    <div className={"tw-flex tw-gap-2"}>
                        <div className={"tw-flex-1"}>
                            <div>Đầu vào</div>
                            <InputTextarea readOnly={true} value={testcase.input}  rows={3} cols={15} className={"tw-w-full tw-bg-gray-50"} />
                        </div>
                        <div className={"tw-flex-1"}>
                            <div>Kết quả mong đợi</div>
                            <InputTextarea readOnly={true} value={testcase.expectedOutput}  rows={3} cols={15} className={"tw-w-full tw-bg-gray-50"} />
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <div className={"tw-flex-1 tw-border-l-2 tw-px-4 overflow-x-auto"}>
            <div className={"tw-mb-8 tw-flex tw-justify-between tw-items-center"}>
                <Dropdown value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.value)}
                          options={languageOptions} optionLabel="name"
                          placeholder="Chọn ngôn ngữ"/>
                <div className={"tw-flex tw-items-center tw-gap-2"}>
                    <Button severity={"warning"} onClick={handleRunCode} icon={"pi pi-caret-right"} iconPos={"right"}
                            label={"Run"}></Button>
                    <Button onClick={handleSubmit} icon={"pi pi-bolt"} iconPos={"right"} label={"Submit"}></Button>
                </div>
            </div>
            <Editor height="40vh" defaultLanguage={editorLanguageName} value={editorValue}/>
            <div>
                <div className={"tw-font-bold"}>Kết quả run code:</div>
                <div className={'tw-bg-gray-50 tw-space-y-1 tw-mt-4 p-4'}>
                    {testCases?.map((testcase, index) => <div key={index} className={"tw-flex tw-gap-2"}>
                        <div>Testcase {zeroPad(index + 1, 2)}:</div>
                        <div>
                            <Tag severity={'success'} value={"Passed"}/>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>

    </div>
}

export default React.memo(QuestionCode)