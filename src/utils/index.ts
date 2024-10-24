export * from "./upload-file";
export * from "./local-store";
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
