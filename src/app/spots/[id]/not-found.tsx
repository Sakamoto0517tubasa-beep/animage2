import Link from "next/link";

export default function SpotNotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-5xl font-bold text-[#E53935]/30">404</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900">スポットが見つかりません</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        このスポットは存在しないか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#E53935] px-4 py-2 text-sm font-medium text-white hover:bg-[#D32F2F]"
      >
        トップへ戻る
      </Link>
    </div>
  );
}
