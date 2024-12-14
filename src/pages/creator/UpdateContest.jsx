import { useParams } from "react-router-dom";
import UpdateContestForm from "../../components/Form/UpdateContestForm";
import useContestById from "../../hooks/useContestById";
import Loader from "../../components/Shared/Loader";

const UpdateContest = () => {
  const { id } = useParams();
  const { contest, isLoading, refetch } = useContestById(id);

  if (isLoading) return <Loader />;

  return (
    <div>
      <UpdateContestForm contest={contest} refetch={refetch} />
    </div>
  );
};

export default UpdateContest;
