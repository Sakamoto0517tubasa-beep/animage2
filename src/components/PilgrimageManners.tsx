import { HandHeart, Ban, Camera, Volume2, Trash2, TriangleAlert } from "lucide-react";

// 全スポット共通の聖地巡礼マナー
const MANNERS: { icon: typeof Ban; text: string }[] = [
  { icon: Ban,           text: "私有地・立入禁止の場所には入らない" },
  { icon: Camera,        text: "撮影は周囲に配慮（住居・表札・人の顔などを写さない）" },
  { icon: TriangleAlert, text: "道路や線路での撮影・長時間の滞在はしない（危険・通行の妨げ）" },
  { icon: Volume2,       text: "大きな声を出さず、静かに楽しむ" },
  { icon: Trash2,        text: "ゴミは必ず持ち帰る" },
];

type PilgrimageMannersProps = {
  // スポット個別の注意書き（撮影禁止・立入禁止など）。あれば最上部に強調表示
  caution?: string | null;
};

export default function PilgrimageManners({ caution }: PilgrimageMannersProps) {
  return (
    <section className="px-4 mt-8">
      <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
        <div className="flex items-center gap-2">
          <HandHeart className="size-5 text-amber-600" />
          <h3 className="text-sm font-bold text-gray-900">聖地巡礼のマナー</h3>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
          地元の方の暮らしがある場所です。一人ひとりの配慮が、この聖地を未来に残します。
        </p>

        {/* スポット個別の注意（データがある場合のみ） */}
        {caution && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
            <p className="text-xs font-semibold leading-relaxed text-red-700">{caution}</p>
          </div>
        )}

        <ul className="mt-3 space-y-2">
          {MANNERS.map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
                <Icon className="size-3.5" />
              </span>
              <span className="text-xs leading-relaxed text-gray-700">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
