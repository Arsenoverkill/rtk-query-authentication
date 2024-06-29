import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { usePatchResetPasswordMutation } from "../../redux/api/auth";
import lockEmail from "../../assets/lock.svg";
import scss from "./ResetPasswordPage.module.scss";

interface IFormInput {
  newPassword: string;
  confirmPassword: string;
}

const PasswordField = ({ name, control, rules, placeholder, errors }: any) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <Input.Password
        status={errors[name] ? "error" : ""}
        className={scss.input}
        size="large"
        placeholder={placeholder}
        {...field}
      />
    )}
  />
);

const ResetPasswordForm = ({
  handleSubmit,
  control,
  errors,
  password,
  onSubmit,
}: any) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <img src={lockEmail} />
      <PasswordField
        name="newPassword"
        control={control}
        rules={{ required: true, minLength: 6 }}
        placeholder="Новый пароль"
        errors={errors}
      />
    </div>
    <div>
      <img src={lockEmail} />
      <PasswordField
        name="confirmPassword"
        control={control}
        rules={{
          required: true,
          minLength: 6,
          validate: (value: string) =>
            value === password || "Пароли не совпадают",
        }}
        placeholder="Повторите новый пароль"
        errors={errors}
      />
    </div>
    <Button
      className={scss.resetBtn}
      type="primary"
      size="large"
      block
      htmlType="submit"
    >
      Сбросить пароль
    </Button>
  </form>
);

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();
  const [patchResetPasswordMutation] = usePatchResetPasswordMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (userData) => {
    if (!token) {
      alert("Токен не найден");
      return;
    }

    try {
      const response = await patchResetPasswordMutation({
        token,
        newPassword: userData.newPassword,
      });
      if (response.data?.message) {
        alert(response.data.message);
        navigate("/auth/login");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const password = watch("newPassword");

  return token ? (
    <div className={scss.resetPassword}>
      <h1>Сбрось пароля</h1>
      <p>Напишите новый пароль</p>
      <ResetPasswordForm
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        password={password}
        onSubmit={onSubmit}
      />
    </div>
  ) : (
    <img className={scss.resetPageNone} src="https://cdn-icons-png.flaticon.com/512/7958/7958357.png" alt="" />
  );
};

export default ResetPasswordPage;
