"use client";
import { useState } from "react";
import styles from "../../styles.module.scss";
import Table from "@/components/Table";
import { getColumns } from "./columns";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import { CiSquarePlus } from "react-icons/ci";
import type { IFunds } from "@/app/api/get_funds/types";
import type { IActionsProps } from "@/components/TableActions/types";
import FundModal from "./__components__/FundModal";

export function ManageFunds() {
  const [action, setAction] = useState<IActionsProps>();
  const { head } = styles;
  const columns = getColumns({ onAction: setAction });

  const { response: fundList, isLoading, mutate } = useSWR<IFunds[]>(API.GET_SELF_FUNDS);

  return (
    <div>
      <div className={head}>
        <h4>Funds</h4>
        <CiSquarePlus
          size="2rem"
          onClick={() => setAction({ action: "add", id: undefined })}
          style={{ cursor: "pointer" }}
        />
      </div>
      <Table isLoading={isLoading} columns={columns} rows={fundList || []} />
      <FundModal
        open={action !== undefined && action?.action !== "delete"}
        onClose={() => setAction(undefined)}
        fundData={fundList?.find((t) => t.alias === action?.id)}
        mutateFund={mutate}
        action={action?.action}
      />
    </div>
  );
}
