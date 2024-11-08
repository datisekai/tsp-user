import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

export function exportToExcel(data, fileName = 'data.xlsx') {
    // Tạo worksheet từ dữ liệu
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Tạo workbook và thêm worksheet vào
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Ghi dữ liệu ra một blob và lưu file
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const dataBlob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    saveAs(dataBlob, fileName);
}
