import { NavLink } from "react-router-dom";
import { usePostLoginMutation } from "../../redux/api/auth/index";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./LogIn.module.scss";
import user from "../../assets/user.svg";
import lock from "../../assets/lock.svg";

interface IFormInput {
  email: string;
  password: string;
}

function LogIn() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [postLoginMutation] = usePostLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let response = await postLoginMutation(data);
      console.log(response);

      if (response.data?.accessToken) {
        localStorage.setItem(
          "Token",
          JSON.stringify(response.data.accessToken)
        );
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={scss.login} onSubmit={handleSubmit(onSubmit)}>
      <h1>Вход</h1>
      <p>Пожалуйста введите ваш логин и пароль</p>
      <div>
        <img src={user} alt="" />
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
      <div>
        <img src={lock} alt="" />
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
      </div>
      <NavLink className={scss.resetPassword} to="/auth/forgot">
        Забыли пароль?
      </NavLink>

      <button type="submit" className={scss.loginBtn}>
        Вход
      </button>
      <div className={scss.register}>
        <span>У вас нету аккаунта?</span>
        <NavLink to="/auth/registration">Регистрация !</NavLink>
      </div>
    </form>
  );
}
export default LogIn;
