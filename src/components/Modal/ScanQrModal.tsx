import React, { useEffect, useState } from 'react'

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useToast } from '../../hooks';
import { Button } from 'primereact/button';
import { useAttendanceStore, useCommonStore, useModalStore, useSocketStore, useUserStore } from '../../stores';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathNames } from '../../constants';


const ScanQrModal = () => {
    const [paused, setPaused] = useState(false)
    const { socket } = useSocketStore()

    const { showToast } = useToast();
    const navigate = useNavigate();
    const { onDismiss } = useModalStore()
    const { user } = useUserStore()
    const { location } = useCommonStore()
    const { getAll } = useAttendanceStore()

    const handleScan = (result: IDetectedBarcode[]) => {
        if (!socket) return showToast({ severity: "danger", summary: "Thông báo", message: "Không thể kết nối tới máy chủ", life: 3000 });
        const qrCode = result[0].rawValue;
        if (qrCode) {
            socket.emit('checkQRCode', { code: user.code, qrCode, location }, (response: any) => {
                const { message, success } = response;
                const severity = success ? 'success' : 'info';
                showToast({ summary: "Thông báo", message, life: 300000, severity });

                if (success) {
                    setPaused(true);
                    getAll()
                    onDismiss()
                    setTimeout(() => {
                        navigate(pathNames.ATTENDANCE);
                    }, 2000);
                }
            })
        }
    }

    return (
        <div>
            <div className='tw-mb-4'>
                <h3 className='tw-font-bold'>Hướng dẫn sử dụng:</h3>
                <p>Bước 1: Đưa camera quét QR được giảng viên trình chiếu.</p>
                <p>Bước 2: Đợi hệ thống báo điểm danh thành công</p>
            </div>
            <div className='tw-flex tw-justify-center'>
                <div className='tw-size-[300px]'>
                    <Scanner styles={{
                        container: {
                            width: 300
                        }

                    }} paused={paused} onScan={handleScan} components={{
                        onOff: true,
                        torch: true,
                        zoom: true,
                        finder: true,


                    }} />
                </div>
            </div>
        </div>
    )
}

export default ScanQrModal