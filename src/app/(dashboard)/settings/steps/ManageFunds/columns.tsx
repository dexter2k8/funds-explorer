import { IGetFunds } from "@/app/api/get_funds/types";
import { GridColDef } from "@/components/Table/types";
import { Tooltip } from "react-tooltip";
import type { IActions } from "@/components/TableActions/types";
import TableActions from "@/components/TableActions";

export function getColumns({ onAction }: IActions) {
  const columns: GridColDef<IGetFunds>[] = [
    {
      field: "alias",
      label: "Alias",
    },
    {
      field: "name",
      label: "Name",
    },
    {
      field: "type",
      label: "Type",
    },
    {
      field: "sector",
      label: "Sector",
    },
    {
      field: "description",
      label: "Description",
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
      field: "actions" as keyof IGetFunds,
      label: "Actions",
      render: (value) => <TableActions id={value} onAction={onAction} />,
    },
  ];

  return columns;
}
