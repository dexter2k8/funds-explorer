"use client";
import Table from "@/components/Table";
import Line from "./__components__/Charts/Line";
import { columns, data } from "./columns";
import styles from "./styles.module.scss";

export default function Analytics() {
  const { analytics, charts } = styles;
  return (
    <div className={analytics}>
      <main>
        <section className={charts}>
          <Line />
          <Line />
        </section>
        <section>
          <div style={{ overflow: "auto" }}>
            <div style={{ minWidth: "600px" }}>
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
