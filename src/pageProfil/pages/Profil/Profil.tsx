import { useGetMeQuery } from "../../../redux/api/auth";
import scss from "./Profil.module.scss";

interface UserProfile {
  userName: string;
  id: number;
  email: string;
  photo: string;
}

const Profil = () => {
  const { data }: any = useGetMeQuery<UserProfile>();

  return (
    <div className={scss.profil}>
      Добро Пожаловать {data?.profile.userName} !
    </div>
  );
};

export default Profil;
