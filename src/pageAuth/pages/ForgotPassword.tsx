import { NavLink } from "react-router-dom";
import { usePostForgotPasswordMutation } from "../../redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./ForgotPage.module.scss";
import userEmail from "../../assets/user.svg";

interface IFormInput {
  email: string;
}

const ForgotPassword = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [postForgotPasswordMutation] = usePostForgotPasswordMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const forgotData = {
        email: data.email,
        frontEndUrl: window.location.href,
      };
      console.log(forgotData);

      const response = await postForgotPasswordMutation(forgotData);
      if (response.data?.message) {
        alert(response.data.message);
        reset();
      }
    } catch (e) {
      alert("Почта не найдено");
    }
  };

  return (
    <form className={scss.forgot} onSubmit={handleSubmit(onSubmit)}>
      <h1>Отправка email</h1>
      <p>Напишите ваш email, чтобы мы отправили вам сообщение</p>
      <div>
        <img src={userEmail} />

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </div>
      <button className={scss.forgotBtn} type="submit">
        Отправить
      </button>
      <div className={scss.login}>
        <span>Вспомнили пароль?</span>
        <NavLink to="/auth/login">Вход !</NavLink>
      </div>
    </form>
  );
};

export default ForgotPassword;
