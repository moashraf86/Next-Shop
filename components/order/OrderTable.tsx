export default function OrderTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <table className="min-w-full sm:divide-y divide-gray-200 mt-6">
      <thead className="hidden sm:table-header-group">
        <tr>
          <th
            scope="col"
            className="py-3 pe-6 text-start text-xs font-medium uppercase tracking-wider"
          >
            Product
          </th>
          <th
            scope="col"
            className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
          >
            Price
          </th>
          <th
            scope="col"
            className="py-3 pe-6 text-center text-xs font-medium uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="py-3 text-end text-xs font-medium uppercase tracking-wider"
          >
            info
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">{children}</tbody>
    </table>
  );
}
