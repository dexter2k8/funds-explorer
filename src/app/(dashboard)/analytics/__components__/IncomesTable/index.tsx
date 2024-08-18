"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { CiSquarePlus } from "react-icons/ci";
import Table from "@/components/Table";
import IncomeModal from "./__components__/IncomeModal";
import { getColumns } from "./columns";
import type { IActionsProps, IIncomesTableProps } from "./types";

export default function IncomesTable({ fundList, profits, isLoadingProfits }: IIncomesTableProps) {
  const [action, setAction] = useState<IActionsProps>();
  const { table_container, head, table_content } = styles;
  const columns = getColumns({ onAction: setAction });

  return (
    <div className={table_container}>
      <div className={table_content}>
        <div className={head}>
          <h4>Incomes Table</h4>
          <CiSquarePlus
            size="2rem"
            onClick={() => setAction({ action: "add", id: undefined })}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Table isLoading={isLoadingProfits} columns={columns} rows={profits || []} pageSize={12} />
      </div>
      <IncomeModal
        action={action}
        fundList={fundList}
        open={action !== undefined}
        onClose={() => setAction(undefined)}
      />
    </div>
  );
}
