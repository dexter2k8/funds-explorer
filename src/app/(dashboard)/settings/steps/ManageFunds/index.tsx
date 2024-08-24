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
import api from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Modal from "@/components/Modal";

export function ManageFunds() {
  const [action, setAction] = useState<IActionsProps>();
  const [loading, setLoading] = useState(false);
  const { head } = styles;
  const columns = getColumns({ onAction: setAction });

  const { response: fundList, isLoading, mutate } = useSWR<IFunds[]>(API.GET_SELF_FUNDS);

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
    mutate();
    setAction(undefined);
    setLoading(false);
  };

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
        action={action?.action}
        fundData={fundList?.find((t) => t.alias === action?.id)}
        open={action !== undefined && action?.action !== "delete"}
        onClose={() => setAction(undefined)}
        onMutate={mutate}
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
