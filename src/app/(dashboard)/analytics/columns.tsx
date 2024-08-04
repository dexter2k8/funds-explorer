import { GridColDef } from "@/components/Table/types";

interface IDataProps {
  id: number;
  firstName: string | null;
  lastName: string;
  age: number | null;
}

export const columns: GridColDef<IDataProps>[] = [
  { field: "id", label: "ID" },
  { field: "firstName", label: "FIRST NAME", sortable: true, filterable: true },
  { field: "lastName", label: "LAST NAME", filterable: true },
  {
    field: "age",
    label: "AGE",
    align: "center",
    sortable: true,
    renderHeader: (value) => (
      <div style={{ backgroundColor: "lightblue", cursor: "help" }}>{value}</div>
    ),
    render: (value) => {
      return (
        <div style={{ backgroundColor: "bisque" }}>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    field: "fullName",
    label: "FULL NAME",
    align: "right",
    valueGetter: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
    render: (value) => {
      return <div style={{ backgroundColor: "lightblue" }}>{value}</div>;
    },
  },
];

export const data: IDataProps[] = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
