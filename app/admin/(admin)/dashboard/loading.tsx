
const AdminSkeleton = ({ rows = 3 }: { rows?: number }) => {
  return (
    <div className="space-y-4 p-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-muted" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded bg-muted" />
      ))}
    </div>
  );
}


export default AdminSkeleton;