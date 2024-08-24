import { IFunds } from "@/app/api/get_funds/types";
import { GridColDef } from "@/components/Table/types";
import { Tooltip } from "react-tooltip";
import type { IActions } from "@/components/TableActions/types";
import TableActions from "@/components/TableActions";

export function getColumns({ onAction }: IActions) {
  const columns: GridColDef<IFunds>[] = [
    {
      field: "alias",
      label: "ALIAS",
    },
    {
      field: "name",
      label: "NAME",
    },
    {
      field: "type",
      label: "TYPE",
    },
    {
      field: "sector",
      label: "SECTOR",
    },
    {
      field: "description",
      label: "DESCRIPTION",
      render(value) {
        return (
          <>
            <p
              data-tooltip-id="description-tooltip"
              data-tooltip-content={value}
              style={{ maxWidth: "18rem", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {value || "N/A"}
            </p>
            <Tooltip id="description-tooltip" style={{ maxWidth: "18rem", textWrap: "wrap" }} />
          </>
        );
      },
    },
    {
      field: "actions" as keyof IFunds,
      label: "ACTIONS",
      valueGetter: (row) => row.alias,
      render: (value) => <TableActions id={value as string} onAction={onAction} />,
    },
  ];

  return columns;
}
