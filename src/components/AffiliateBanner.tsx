type AffiliateBannerProps = {
  href: string;
  imageSrc: string;
  trackingPixel: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
};

export default function AffiliateBanner({
  href,
  imageSrc,
  trackingPixel,
  imageWidth,
  imageHeight,
  imageAlt = "",
}: AffiliateBannerProps) {
  return (
    <aside
      className="flex flex-col items-center gap-2 py-8"
      aria-label="広告"
    >
      <p className="text-xs tracking-widest text-white/40">広告</p>
      <a
        href={href}
        rel="nofollow"
        target="_blank"
        referrerPolicy="no-referrer-when-downgrade"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="mx-auto max-w-full"
        />
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
