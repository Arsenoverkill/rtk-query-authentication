import { NavLink } from "react-router-dom";
import { usePostRegistrationMutation } from "../../redux/api/auth/index";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./Registration.module.scss";
import user from "../../assets/user.svg";
import lock from "../../assets/lock.svg";

interface IFormInput {
  userName: string;
  email: string;
  password: string;
  photo: string;
}

function Registration() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [postRegisterMutation] = usePostRegistrationMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const userDataRest = {
      email: data.email,
      password: data.password,
      userName: data.userName,
      photo: data.photo,
    };
    try {
      let response = await postRegisterMutation(userDataRest);
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
      <p>
        Пожалуйста введите <span>Имя, Логин, Пароль и добавьте фото</span>
      </p>
      <div>
        <img src={user} alt="" />
        <input
          placeholder="Enter your name"
          {...register("userName", { required: true })}
        />
      </div>
      <div>
        <img src={user} alt="" />
        <input
          type="photo"
          placeholder="Enter your photo"
          {...register("photo", { required: true })}
        />
      </div>
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
        <span>У вас есть аккаунт?</span>
        <NavLink to="/auth/login">Вход !</NavLink>
      </div>
    </form>
  );
}
export default Registration;
