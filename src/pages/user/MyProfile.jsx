import UpdateUserDataForm from "../../components/Form/UpdateUserDataForm";
import useRole from "../../hooks/useRole";
import UserStats from "./UserStats";

const MyProfile = () => {
  const { role } = useRole();

  return (
    <div>
      {role === "user" && <UserStats />}
      <UpdateUserDataForm />
    </div>
  );
};

export default MyProfile;
