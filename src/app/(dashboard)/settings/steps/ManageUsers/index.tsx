import Table from "@/components/Table";
import { getColumns } from "./columns";

export default function ManageUsers() {
  const columns = getColumns();
  return (
    <div>
      <Table columns={columns} rows={[]} pageSize={12} />
    </div>
  );
}
