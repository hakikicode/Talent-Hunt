import Table from "../Table";
import Pagination from "../Pagination";
import Loader from "../../Shared/Loader";
import useContestForAdmin from "../../../hooks/useContestsForAdmin";
import ContestRow from "./ContestRow";

const ContestTable = () => {
  const { contests, count, isLoading, refetch } = useContestForAdmin();

  if (isLoading) return <Loader />;

  return (
    <>
      <Table columns="2fr 0.6fr .6fr .4fr 2fr">
        <Table.Header>
          <div>Name</div>
          <div>Deadline</div>
          <div>Creator</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={contests}
          render={(item, idx) => (
            <ContestRow key={idx} item={item} refetch={refetch} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
};

export default ContestTable;
