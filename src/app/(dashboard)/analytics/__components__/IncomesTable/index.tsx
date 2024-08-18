"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { CiSquarePlus } from "react-icons/ci";
import { columns } from "./columns";
import Table from "@/components/Table";
import IncomeModal from "./__components__/IncomeModal";
import type { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import type { ISelectOptions } from "@/components/Select/types";

interface IIncomesTableProps {
  fundList: ISelectOptions[];
  isLoadingProfits: boolean;
  profits: IGetIncomesFundResponse[];
}

export default function IncomesTable({ fundList, profits, isLoadingProfits }: IIncomesTableProps) {
  const [openModal, setOpenModal] = useState(false);
  const { table_container, head, table_content } = styles;

  return (
    <div className={table_container}>
      <div className={table_content}>
        <div className={head}>
          <h4>Incomes Table</h4>
          <CiSquarePlus
            size="2rem"
            onClick={() => setOpenModal(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Table isLoading={isLoadingProfits} columns={columns} rows={profits || []} pageSize={12} />
      </div>
      <IncomeModal fundList={fundList} open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
