import Table from "../Table";
import UsersRow from "./UsersRow";
import Pagination from "../Pagination";
import useUsers from "../../../hooks/useUsers";
import Loader from "../../Shared/Loader";

const UsersTable = () => {
  const { users, count, isLoading } = useUsers();

  if (isLoading) return <Loader />;

  return (
    <>
      <Table columns="0.2fr 0.4fr 1fr 1.2fr .6fr">
        <Table.Header>
          <div>No</div>
          <div>Image</div>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(item, idx) => <UsersRow key={idx} item={item} idx={idx} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
};

export default UsersTable;
