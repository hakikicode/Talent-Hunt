import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <div className="border overflow-x-auto min-w-[1000px] max-w-[1400px] border-gray-200 rounded">
      <TableContext.Provider value={{ columns }}>
        <div role="table">{children}</div>
      </TableContext.Provider>
    </div>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className="grid  gap-6 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600 uppercase"
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className="grid gap-6 p-3 border-b bg-white border-gray-100"
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-center text-lg font-semibold m-4">
        No data to show at the moment
      </p>
    );

  return <div>{data.map(render)}</div>;
}

function Footer({ children }) {
  return <div className="p-4 bg-gray-50  border-gray-100 ">{children}</div>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
