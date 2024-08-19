"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { CiSquarePlus } from "react-icons/ci";
import Table from "@/components/Table";
import IncomeModal from "./__components__/IncomeModal";
import { getColumns } from "./columns";
import Modal from "@/components/Modal";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { IActionsProps, IIncomesTableProps } from "./types";
import api from "@/services/api";

export default function IncomesTable({
  fundList,
  profits,
  isLoadingProfits,
  onMutate,
}: IIncomesTableProps) {
  const [action, setAction] = useState<IActionsProps>();
  const [loading, setLoading] = useState(false);
  const { table_container, head, table_content } = styles;
  const columns = getColumns({ onAction: setAction });

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.client.delete(`/api/delete_income/${action?.id}`);
      toast.success("Income deleted successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      }
    }
    onMutate();
    setAction(undefined);
    setLoading(false);
  };

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
        action={action?.action}
        incomeData={profits?.find((t) => t.id === action?.id)}
        fundList={fundList}
        open={action !== undefined && action?.action !== "delete"}
        onClose={() => setAction(undefined)}
        onMutate={onMutate}
      />
      <Modal
        title="Delete Income"
        description="Are you sure you want to delete this income?"
        open={action?.action === "delete"}
        onClose={() => setAction(undefined)}
        okText="Delete"
        onOk={handleDelete}
        okLoading={loading}
      />
    </div>
  );
}
