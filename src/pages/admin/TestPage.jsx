import Empty from "../../components/Shared/Empty";
import Table from "../../components/Table/Table";

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "jona#josdfjdso",
  },
  {
    id: 2,
    name: "John Doe",
    email: "jona#josdfjdso",
  },
  {
    id: 3,
    name: "John Doe",
    email: "jona#josdfjdso",
  },
];

const TestPage = () => {

  return (
    <div>
      <Table columns="1fr 1fr">
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
        </Table.Header>

        <Table.Body
          data={data}
          render={(item) => (
            <Table.Row key={item.id}>
              <div>{item.name}</div>
              <div>{item.email}</div>
            </Table.Row>
          )}
        />
      </Table>
    </div>
  );
};

export default TestPage;
