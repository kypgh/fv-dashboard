import TableSkeleton from "@/components/Skeleton/TableSkeleton";

export default function Loading() {
  return (
    <TableSkeleton
      headers={["Username", "Email", "Client Id"]}
      title="Crm Users"
    />
  );
}
