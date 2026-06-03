"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronUp, CornerDownRight, Send } from "lucide-react";
import { formatDistanceToNow } from "@/lib/time-utils";
import type { PostComment } from "@/lib/posts";

const LS_NICK_KEY = "community_nickname";
const LS_VOTED_KEY = "comment_voted";

function getVotedIds(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LS_VOTED_KEY) ?? "[]"); } catch { return []; }
}
function markVoted(id: string) {
  const ids = getVotedIds();
  if (!ids.includes(id)) { ids.push(id); localStorage.setItem(LS_VOTED_KEY, JSON.stringify(ids)); }
}

// ── アバター ──
function Avatar({ name }: { name: string }) {
  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-xs font-bold text-gray-600">
      {name[0]}
    </div>
  );
}

// ── コメントいいねボタン ──
function CommentUpvote({ commentId, initialUpvotes }: { commentId: string; initialUpvotes: number }) {
  const [count, setCount] = useState(initialUpvotes);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setVoted(getVotedIds().includes(commentId));
  }, [commentId]);

  async function handleClick() {
    if (voted) return;
    setCount((n) => n + 1);
    setVoted(true);
    markVoted(commentId);
    await fetch("/api/comments/upvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={voted}
      className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
        voted ? "bg-[#E53935]/10 text-[#E53935]" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <ChevronUp className="size-3" />
      {count > 0 && count}
    </button>
  );
}

// ── コメントノード ──
function CommentNode({
  comment,
  comments,
  depth,
  onReply,
}: {
  comment: PostComment;
  comments: PostComment[];
  depth: number;
  onReply: (parentId: string, parentNick: string) => void;
}) {
  const children = comments.filter((c) => c.parent_id === comment.id);

  return (
    <div className={depth > 0 ? "mt-2 border-l-2 border-gray-100 pl-3" : ""}>
      <div className={`${depth === 0 ? "rounded-xl bg-gray-50 p-3" : "pt-1.5"}`}>
        <div className="flex items-center gap-2">
          <Avatar name={comment.nickname ?? "匿名"} />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-gray-800">{comment.nickname ?? "匿名"}</span>
            <span className="ml-1.5 text-[10px] text-gray-400">{formatDistanceToNow(comment.created_at)}</span>
          </div>
          <CommentUpvote commentId={comment.id} initialUpvotes={comment.upvotes} />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{comment.body}</p>
        <button
          type="button"
          onClick={() => onReply(comment.id, comment.nickname ?? "匿名")}
          className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-[#E53935]"
        >
          <CornerDownRight className="size-2.5" />
          返信する
        </button>
      </div>
      {children.map((child) => (
        <CommentNode
          key={child.id}
          comment={child}
          comments={comments}
          depth={depth + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

// ── コメントフォーム ──
function CommentForm({
  postId,
  replyTo,
  onClearReply,
  onSubmit,
}: {
  postId: string;
  replyTo: { parentId: string; parentNick: string } | null;
  onClearReply: () => void;
  onSubmit: (comment: PostComment) => void;
}) {
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_NICK_KEY);
    if (saved) setNickname(saved);
  }, []);

  useEffect(() => {
    if (replyTo) textareaRef.current?.focus();
  }, [replyTo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    localStorage.setItem(LS_NICK_KEY, nickname);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: postId,
          parent_id: replyTo?.parentId ?? null,
          body: body.trim(),
          nickname: nickname.trim() || "匿名",
        }),
      });
      if (res.ok) {
        const newComment = await res.json() as PostComment;
        onSubmit(newComment);
        setBody("");
        onClearReply();
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      {/* 返信先バナー */}
      {replyTo && (
        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
          <span className="text-xs text-blue-600">
            <CornerDownRight className="inline size-3 mr-1" />
            <span className="font-semibold">{replyTo.parentNick}</span> さんへの返信
          </span>
          <button type="button" onClick={onClearReply} className="text-blue-400 hover:text-blue-600 text-xs">✕</button>
        </div>
      )}
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
        placeholder="ニックネーム（任意）"
        maxLength={30}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[#E53935] focus:bg-white focus:outline-none"
      />
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          maxLength={1000}
          placeholder={replyTo ? `${replyTo.parentNick}さんへの返信...` : "コメントを入力..."}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 pr-12 text-sm focus:border-[#E53935] focus:bg-white focus:outline-none resize-none"
        />
        <button
          type="submit"
          disabled={!body.trim() || sending}
          className="absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-lg bg-[#E53935] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          aria-label="送信"
        >
          {sending ? (
            <div className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="size-3.5" />
          )}
        </button>
      </div>
      <p className="text-right text-[10px] text-gray-400">{body.length}/1000</p>
    </form>
  );
}

// ── メイン ──
export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: PostComment[];
}) {
  const [comments, setComments] = useState<PostComment[]>(initialComments);
  const [replyTo, setReplyTo] = useState<{ parentId: string; parentNick: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function handleReply(parentId: string, parentNick: string) {
    setReplyTo({ parentId, parentNick });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleNewComment(comment: PostComment) {
    setComments((prev) => [...prev, comment]);
  }

  const topLevel = comments.filter((c) => c.parent_id === null);

  return (
    <>
      {/* コメント一覧 */}
      <div className="mx-3 mt-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-gray-900">
          コメント
          {comments.length > 0 && (
            <span className="ml-1.5 text-xs font-normal text-gray-400">{comments.length}件</span>
          )}
        </h3>
        {topLevel.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400">まだコメントがありません。最初のコメントを書いてみよう！</p>
        ) : (
          <div className="space-y-3">
            {topLevel.map((comment) => (
              <CommentNode
                key={comment.id}
                comment={comment}
                comments={comments}
                depth={0}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </div>

      {/* コメント投稿フォーム */}
      <div ref={formRef} className="mx-3 mt-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-gray-900">コメントを書く</h3>
        <CommentForm
          postId={postId}
          replyTo={replyTo}
          onClearReply={() => setReplyTo(null)}
          onSubmit={handleNewComment}
        />
      </div>
    </>
  );
}
