import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewPostForm from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <Link href="/community" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-base font-bold text-gray-900">新規投稿</h1>
      </div>
      <NewPostForm />
    </div>
  );
}
