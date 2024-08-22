"use client";
import Table from "@/components/Table";
import { getColumns } from "./columns";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import type { IGetFunds } from "@/app/api/get_funds/types";

export function ManageFunds() {
  const columns = getColumns();
  const { response: fundList, isLoading } = useSWR<IGetFunds[]>(API.GET_SELF_FUNDS);

  return (
    <div>
      <Table isLoading={isLoading} columns={columns} rows={fundList || []} pageSize={12} />
    </div>
  );
}
