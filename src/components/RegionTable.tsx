import Image from "next/image";
import {
  regionComparisonData,
  regionImageAlt,
  regionImages,
} from "@/data/simulationData";

export default function RegionTable() {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="bg-navy">
            <th className="px-6 py-4 font-semibold tracking-wide text-white">
              地域
            </th>
            <th className="px-6 py-4 font-semibold tracking-wide text-white">
              家賃目安
            </th>
            <th className="px-6 py-4 font-semibold tracking-wide text-white">
              生活費
            </th>
            <th className="px-6 py-4 font-semibold tracking-wide text-white">
              仕事の多さ
            </th>
            <th className="px-6 py-4 font-semibold tracking-wide text-white">
              住みやすさ
            </th>
          </tr>
        </thead>
        <tbody>
          {regionComparisonData.map((row) => (
            <tr key={row.region} className="border-t border-navy/5">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={regionImages[row.region]}
                      alt={regionImageAlt[row.region]}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <span className="font-bold text-navy">{row.region}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-navy-muted">{row.rent}</td>
              <td className="px-6 py-4 text-navy-muted">{row.livingCost}</td>
              <td className="px-6 py-4 text-navy-muted">{row.jobAvailability}</td>
              <td className="px-6 py-4 text-navy-muted">{row.livability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
