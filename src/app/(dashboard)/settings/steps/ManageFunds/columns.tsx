import { GridColDef } from "@/components/Table/types";

export function getColumns() {
  const columns: GridColDef[] = [
    {
      field: "name",
      label: "Name",
    },
  ];

  return columns;
}
