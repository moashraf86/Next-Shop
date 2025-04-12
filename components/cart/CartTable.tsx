export default function CartTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="p-6 text-start text-xs font-semibold uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="p-6 text-center text-xs font-semibold uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="p-6 text-center text-xs font-semibold uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="p-6 text-end text-xs font-medium uppercase"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
