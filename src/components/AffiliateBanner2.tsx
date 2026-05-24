import AffiliateTextLink from "@/components/AffiliateTextLink";

const AFFILIATE_LINK =
  "https://px.a8.net/svt/ejp?a8mat=4B3Y3B+5LTYUQ+41A0+61RIA";

const LINK_LABEL = "日本で働くなら登録無料の求人サービスへ";

const TRACKING_PIXEL =
  "https://www12.a8.net/0.gif?a8mat=4B3Y3B+5LTYUQ+41A0+61RIA";

export default function AffiliateBanner2() {
  return (
    <AffiliateTextLink
      href={AFFILIATE_LINK}
      label={LINK_LABEL}
      trackingPixel={TRACKING_PIXEL}
    />
  );
}
