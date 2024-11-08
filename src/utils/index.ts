export * from "./upload-file";
export * from "./local-store";
export * from './export-excel'
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function randomString(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function getRandomAvatar(name?: string) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${name || "SGU"}`;
}

export const getDeviceId = async () => {
    return new Promise((resolve, reject) => {
        return FingerprintJS.load()
            .then((fp) => fp.get())
            .then((res) => resolve(res.visitorId))
            .catch(() => reject(""));
    });
};

export function generateCharacter(index: number) {
    return String.fromCharCode(65 + index);
}


export function zeroPad(n, width, z?: string) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const getPastDate = (space?: number) => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - (space || 0))
    return currentDate;
}