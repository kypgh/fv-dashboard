import TableSkeleton from "@/components/Skeleton/TableSkeleton";

export default function Loading() {
  return (
    <TableSkeleton
      title="Users"
      headers={["Username", "Email", "Posts", "Followers", "Client Id"]}
    />
  );
}
