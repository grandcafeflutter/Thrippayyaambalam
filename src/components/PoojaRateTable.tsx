import type { PoojaRate } from '@/data/poojaRates';

type PoojaRateTableProps = {
  rates: PoojaRate[];
};

const rateFormatter = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function PoojaRateTable({ rates }: PoojaRateTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-md">
      <table className="w-full text-left text-sm sm:text-base">
        <thead className="bg-primary-700 text-neutral-50">
          <tr>
            <th scope="col" className="w-16 px-4 py-3 font-semibold">No.</th>
            <th scope="col" className="px-4 py-3 font-semibold">Offering</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Rate (₹)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {rates.map((item) => (
            <tr key={item.no} className="transition-colors hover:bg-primary-50">
              <td className="px-4 py-3 font-semibold text-primary-700">{item.no}</td>
              <td className="px-4 py-3 text-neutral-800">{item.name}</td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums text-accent-700">
                {rateFormatter.format(item.rate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
