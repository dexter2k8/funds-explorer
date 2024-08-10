"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Table from "@/components/Table";
import Line from "./__components__/Charts/Line";
import { columns, data } from "./columns";
import InfiniteList from "./__components__/InfiniteList";
import { useSWR } from "@/hook/useSWR";
import { IGetIncomesFundResponse } from "@/app/api/get_incomes_fund/[fund]/types";
import { API } from "@/app/paths";

export default function Analytics() {
  const { analytics, charts, table, head, table_content } = styles;
  const [fund, setFund] = useState("");

  const { response: profits, isLoading: isLoadingProfits } = useSWR<IGetIncomesFundResponse[]>(
    API.GET_INCOMES_FUND + fund
  );

  console.log(profits);

  return (
    <div className={analytics}>
      <main>
        <section className={charts}>
          <Line onChangeFund={setFund} profits={profits} isLoading={isLoadingProfits} />
          <InfiniteList fund_alias={fund} />
        </section>

        <section className={table}>
          <div className={table_content}>
            <div style={{ minWidth: "600px" }}>
              <div className={head}>
                <h4>Incomes Table</h4>
              </div>
              <Table
                columns={columns}
                rows={data}
                pageSize={5} //default is 10
                // serverPagination
                // serverRowCount={10}
                // serverPage={serverPage}
                // serverPageChange={(page) => setServerPage(page)}
                // serverFiltered={({ field, text }) => console.log(field, text)}
                // serverSorted={({ field, sort }) => console.log(field, sort)}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
