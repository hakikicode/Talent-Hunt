import Table from "../Table";
import Pagination from "../Pagination";
import Loader from "../../Shared/Loader";
import CreatedContestRow from "./CreatedContestRow";
import useContestByCreator from "../../../hooks/useContestByCreator";

const CreatedContestTable = () => {
  const { contests, count, isLoading, refetch } = useContestByCreator();

  if (isLoading) return <Loader />;

  return (
    <>
      <Table columns="3fr 0.6fr .4fr .5fr 1fr">
        <Table.Header>
          <div>Name</div>
          <div>Deadline</div>
          <div>Status</div>
          <div>Participants</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={contests}
          render={(item, idx) => (
            <CreatedContestRow key={idx} item={item} refetch={refetch} />
          )}
        />
        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </>
  );
};

export default CreatedContestTable;
