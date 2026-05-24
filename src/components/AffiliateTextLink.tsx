type AffiliateTextLinkProps = {
  href: string;
  label: string;
  trackingPixel: string;
};

export default function AffiliateTextLink({
  href,
  label,
  trackingPixel,
}: AffiliateTextLinkProps) {
  return (
    <aside
      className="flex flex-col items-center gap-2 py-5"
      aria-label="広告"
    >
      <p className="text-xs tracking-widest text-white/40">広告</p>
      <a
        href={href}
        rel="nofollow"
        target="_blank"
        referrerPolicy="no-referrer-when-downgrade"
        className="text-lg font-bold tracking-wide text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light"
      >
        {label}
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={trackingPixel}
        width={1}
        height={1}
        alt=""
        aria-hidden="true"
        className="sr-only"
      />
    </aside>
  );
}
