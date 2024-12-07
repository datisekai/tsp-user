import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useToast } from "../hooks/useToast";
import { useAuthStore, useCommonStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../constants";

const Login = () => {
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showToast } = useToast();
  const { login, token } = useAuthStore();
  const navigate = useNavigate();
  const { isLoadingApi } = useCommonStore();

  useEffect(() => {
    if (token) {
      return navigate(pathNames.HOME);
    }
  }, [token]);

  const schema = yup
    .object()
    .shape({
      code: yup.string().required("Mã sinh viên là bắt buộc"),
      password: yup.string().required("Mật khẩu là bắt buộc"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await login(data.code, data.password);
    if (!result) {
      return showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Sai tài khoản hoặc mật khẩu",
        life: 3000,
      });
    }

    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Đăng nhập thành công",
      life: 3000,
    });
  });

  return (
    <div className=" tw-min-h-screen tw-bg-[url('/images/slider2_1240x450-min.jpg')] tw-bg-cover tw-bg-center">
      <div className="tw-absolute tw-left-[2.5%] md:tw-left-[15%] tw-top-[6%] tw-w-[95%] md:tw-w-[70%] tw-h-[88vh] tw-flex tw-border tw-shadow-md tw-rounded-lg tw-bg-white">
        <div className="tw-hidden tw-w-1/2 tw-bg-cover tw-bg-[url('/images/background-login.png')] lg:tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-lg tw-bg-center">
          <p className="tw-text-3xl tw-font-bold tw-text-white">
            Đại học Sài Gòn
          </p>
          <Avatar
            image="/images/sgu-logo.jpeg"
            shape="circle"
            className="tw-w-40 tw-h-40 tw-my-4 tw-animate-jump-in tw-animate-once"
          />
          <p className="tw-text-2xl tw-font-bold tw-text-white">
            Hỗ trợ học tập cho sinh viên
          </p>

        </div>

        <div className="tw-w-full lg:tw-w-1/2 tw-bg-[url('/images/background-login.png')] tw-bg-cover tw-bg-center md:tw-bg-[url('')] md:tw-bg-white tw-flex tw-items-center tw-justify-center tw-rounded-lg">
          <div className="tw-w-full tw-max-w-md tw-p-8 tw-rounded-lg ">
            <div className="tw-mb-10 tw-text-center">
              <Avatar
                image="/images/logo.png"
                shape="circle"
                className="tw-w-40 tw-h-40 tw-animate-jump-in tw-animate-once"
              />
              <h2 className="tw-text-3xl tw-text-white md:tw-text-title tw-font-semibold tw-text-center tw-mb-2">
                Đăng nhập
              </h2>
            </div>
            <form onSubmit={onSubmit}>
              <div className="tw-mb-8">
                <div className="tw-flex tw-flex-wrap tw-align-items-center">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <FloatLabel>
                      <InputText
                        keyfilter="int"
                        {...register("code")}
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        invalid={!!errors.code}
                      />
                      <label htmlFor="code">Mã sinh viên</label>
                    </FloatLabel>
                  </div>
                </div>
                {errors.code && (
                  <p className="tw-text-red-500">{errors.code.message}</p>
                )}
              </div>

              <div className="relative tw-mb-8">
                <div className="tw-flex tw-flex-wrap tw-align-items-center">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <FloatLabel>
                      <InputText
                        id="password"
                        {...register("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        invalid={!!errors.password}
                        className="tw-pr-10"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                          }
                        }}

                      />
                      <label htmlFor="password">Mật khẩu</label>
                    </FloatLabel>
                  </div>
                </div>
                {errors.password && (
                  <p className="tw-text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="tw-mb-4 ">
                <Button
                  loading={isLoadingApi}
                  label="Đăng nhập"
                  type="submit"
                  className="tw-border-white tw-w-full"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
