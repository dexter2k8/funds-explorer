"use client";
import { useState } from "react";
import styles from "../../styles.module.scss";
import Table from "@/components/Table";
import { getColumns } from "./columns";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import { CiSquarePlus } from "react-icons/ci";
import type { IGetFunds } from "@/app/api/get_funds/types";
import type { IActionsProps } from "@/components/TableActions/types";

export function ManageFunds() {
  const [action, setAction] = useState<IActionsProps>();
  const { head } = styles;
  const columns = getColumns({ onAction: setAction });

  const { response: fundList, isLoading } = useSWR<IGetFunds[]>(API.GET_SELF_FUNDS);

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
    </div>
  );
}
