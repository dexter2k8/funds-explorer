import Table from "@/components/Table";
import { getColumns } from "./columns";

export function ManageFunds() {
  const columns = getColumns();
  return (
    <div>
      <Table columns={columns} rows={[]} pageSize={12} />
    </div>
  );
}
