import {useEffect, useMemo, useState} from "react";
import MyTable from "../components/UI/MyTable";
import {attendanceSchemas} from "../dataTable/attendanceTable";
import {useAttendanceStore, useCommonStore} from "../stores";
import MyCalendar from "../components/UI/MyCalendar.tsx";
import {Card} from "primereact/card";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useClassStore} from "../stores/classStore.ts";
import {getPastDate} from "../utils";


const Attendance = () => {
    const {resetActions, setHeaderTitle, isLoadingApi} = useCommonStore();
    const {getAll, attendances, total} = useAttendanceStore();
    const [dates, setDates] = useState<any>(null)
    const [selectedClass, setSelectedClass] = useState(null);
    const {getMe, classes} = useClassStore()

    useEffect(() => {
        setHeaderTitle("Lịch sử điểm danh");
        getMe()
        return () => {
            resetActions();
        };
    }, []);

    const classOptions = useMemo(() => {
        return classes.map(item => ({
            name: item.name,
            value: item.id
        }))
    }, [classes])

    const applyFilter = () => {
        console.log('selectedmajor', selectedClass);
        console.log('date', dates)
        const query: any = {}
        if (selectedClass) {
            query.classId = selectedClass
        }
        if (dates) {
            query.from = dates[0].toISOString();
            query.to = dates[1].toISOString();
        }

        getAll(query)
    }

    const resetFilter = () => {

    }

    return (
        <div className={'tw-space-y-4'}>
            <Card title={'Tìm kiếm'}>
                <div className={"tw-flex tw-items-end tw-gap-4"}>
                    <div>
                        <div className={"mb-1"}>Lọc theo môn</div>
                        <Dropdown
                            value={selectedClass} onChange={(e) => setSelectedClass(e.value)} options={classOptions}
                            optionLabel="name"
                            loading={isLoadingApi}
                            placeholder="Chọn lớp học" className="w-full"/>
                    </div>
                    <div>
                        <div className={"mb-1"}>Lọc theo ngày</div>
                        <MyCalendar initToday={getPastDate(30)} spaceDate={30} dates={dates} setDates={setDates}/>
                    </div>
                    <div>
                        <div className={"mb-1"}>Thao tác</div>
                        <div className={"tw-flex tw-gap-2"}>
                            <Button onClick={applyFilter} icon={'pi pi-play'} iconPos={"right"}
                                    label={"Áp dụng"}></Button>
                            <Button onClick={resetFilter} severity={"contrast"} icon={"pi pi-refresh"} iconPos={'right'}
                                    label={"Reset"}></Button>
                        </div>
                    </div>

                </div>
            </Card>
            <MyTable
                schemas={attendanceSchemas}
                data={attendances}
                totalRecords={total}
                onChange={(query) => getAll(query)}
            />
        </div>
    );
};

export default Attendance;
