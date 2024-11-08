import {ProgressSpinner} from "primereact/progressspinner";
import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import MyFooterAction from "../components/UI/MyFooterAction";
import MyHeader from "../components/UI/MyHeader";
import MySideBar from "../components/UI/MySideBar";
import {ModalName, pathNames} from "../constants";
import {useAuthStore, useModalStore} from "../stores";
import {useSocketStore} from "../stores/socketStore";
import {useUserStore} from "../stores/userStore";
import {useExamStore} from "../stores/examStore";
import {useLanguageStore} from "../stores/languageStore.ts";

const AuthLayout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(
        window.innerWidth >= 768
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const {user, getMe} = useUserStore();
    const {token} = useAuthStore();
    const navigate = useNavigate();
    const {connectSocket, disconnectSocket} = useSocketStore();
    const getExam = useExamStore(state => state.getAll)
    const getLanguage = useLanguageStore(state => state.getAll)
    const onToggle = useModalStore(state => state.onToggle)

    useEffect(() => {
        if (!token) {
            return navigate(pathNames.LOGIN);
        }
        const handleResize = () => {
            setIsSidebarVisible(window.innerWidth >= 768);
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        getMe();

        connectSocket();

        initData()

        return () => {
            window.removeEventListener("resize", handleResize);
            disconnectSocket();
        };
    }, []);


    useEffect(() => {
        if (user && Object.keys(user).length > 0 && !user?.name) {
            onToggle(ModalName.UPDATE_PROFILE, {
                    header: "Cập nhật hồ sơ",
                    content: {
                        closeable: user?.name ? true : false
                    },
                style:"!tw-w-[30rem]",
                }
            );
        }

    }, [user])

    const initData = () => {
        Promise.allSettled([getExam(), getLanguage()])

    }

    const handleCloseSidebar = () => {
        setIsSidebarVisible(false);
    };
    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    if (!user || Object.keys(user).length == 0) {
        return (
            <div className="tw-fixed tw-inset-0  tw-flex tw-justify-center tw-items-center">
                <ProgressSpinner/>
            </div>
        );
    }


    return (
        <div className="tw-flex tw-min-h-screen">
            <MySideBar
                handleCloseSidebar={handleCloseSidebar}
                isMobile={isMobile}
                isSidebarVisible={isSidebarVisible}
            />
            <div className="tw-flex-1 tw-flex tw-flex-col tw-transition-all tw-duration-300">
                <MyHeader
                    isSidebarVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                />
                <main
                    className={`tw-flex-1 tw-p-4 tw-pt-24 tw-pb-24 tw-transition-all tw-duration-300 ${isSidebarVisible ? "md:tw-ml-80" : "md:tw-ml-0"
                    }`}
                >
                    <Outlet/>
                </main>
                <MyFooterAction isSidebarVisible={isSidebarVisible}/>
            </div>
        </div>
    );
};

export default AuthLayout;
