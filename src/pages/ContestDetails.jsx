import { useParams } from "react-router-dom";
import useContestById from "../hooks/useContestById";
import Loader from "../components/Shared/Loader";
import DetailsHeader from "../components/Contest/DetailsHeader";
import DetailsBody from "../components/Contest/DetailsBody";
import Title from "../components/Shared/Title";

const ContestDetails = () => {
  const { id } = useParams();
  const { contest, isLoading } = useContestById(id);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Title title={`${contest.title} | Kwara Talent Harvest`} />
      <DetailsHeader contest={contest} />
      <DetailsBody contest={contest} />
    </div>
  );
};

export default ContestDetails;
