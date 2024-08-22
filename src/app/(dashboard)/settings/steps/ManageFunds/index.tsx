"use client";
import { useState } from "react";
import Table from "@/components/Table";
import { getColumns } from "./columns";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import type { IGetFunds } from "@/app/api/get_funds/types";
import type { IActionsProps } from "@/components/TableActions/types";

export function ManageFunds() {
  const [action, setAction] = useState<IActionsProps>();
  const columns = getColumns({ onAction: setAction });

  const { response: fundList, isLoading } = useSWR<IGetFunds[]>(API.GET_SELF_FUNDS);

  return (
    <div>
      <Table isLoading={isLoading} columns={columns} rows={fundList || []} pageSize={12} />
    </div>
  );
}
