import {useEffect} from "react";
import MyTable from "../../components/UI/MyTable.tsx";
import {pathNames} from "../../constants";
import {examSchemas} from "../../dataTable/examTable.tsx";
import {useCommonStore} from "../../stores";
import {useExamStore} from "../../stores/examStore.ts";
import {useNavigate} from "react-router-dom";


const Index = () => {
    const {resetActions, setHeaderTitle} = useCommonStore();
    const {getAll, exams, total} = useExamStore();
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderTitle("Bài kiểm tra");
        return () => {
            resetActions();
        };
    }, []);
    return (
        <MyTable
            schemas={examSchemas}
            data={exams}
            totalRecords={total}
            actions={[
                {
                    icon: "pi-sign-in",
                    tooltip: "Tham gia",
                    severity: 'info',
                    isHidden: (record) => record.status != "active",
                    onClick: (data) => {
                        navigate(pathNames.JOIN_EXAM.replace(":id", data.id));
                    },
                },
                {
                    icon: "pi-info-circle",
                    tooltip: "Chi tiết",
                    isHidden: (record) => record.status == "active" || !record?.showResult,
                    onClick: (data) => {
                        navigate(pathNames.HISTORY_EXAM.replace(":id", data.id));
                    },
                },
            ]}
            onChange={(query) => getAll(query)}
        />
    );
};

export default Index;
