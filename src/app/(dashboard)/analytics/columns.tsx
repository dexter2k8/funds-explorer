import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { GridColDef } from "@/components/Table/types";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

export const columns: GridColDef<IGetIncomesFundResponse>[] = [
  { field: "updated_at", label: "DATE", sortable: true },
  { field: "price", label: "PRICE" },
  { field: "quantity", label: "QUANTITY" },
  { field: "patrimony", label: "PATRIMONY" },
  {
    field: "variation",
    label: "VARIATION",
    render: (value) => {
      const color = Number(value) > 0 ? "var(--green)" : "var(--red)";
      const arrow =
        Number(value) >= 0 ? (
          <MdOutlineArrowDropUp size="1.25rem" />
        ) : (
          <MdOutlineArrowDropDown size="1.25rem" />
        );
      return (
        <div style={{ color, display: "flex", alignItems: "center" }}>
          {value}
          {value && arrow}
        </div>
      );
    },
  },
  { field: "income", label: "INCOME" },
  {
    field: "pvp",
    label: "P/VP",
    render: (value) => {
      return <div>{Number(value).toFixed(4)}%</div>;
    },
  },
];
