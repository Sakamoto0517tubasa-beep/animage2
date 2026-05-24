import AffiliateBanner from "@/components/AffiliateBanner";

const AFFILIATE_LINK =
  "https://rpx.a8.net/svt/ejp?a8mat=4B3Y3B+4W8BUA+2HOM+686ZL&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26052417125_4B3Y3B_4W8BUA_2HOM_686ZL%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F";

const BANNER_IMAGE =
  "http://hbb.afl.rakuten.co.jp/hsb/0eb4bbc0.254a14a3.0eb4bbaa.95151395/";

const TRACKING_PIXEL =
  "https://www15.a8.net/0.gif?a8mat=4B3Y3B+4W8BUA+2HOM+686ZL";

export default function RakutenAffiliateBanner() {
  return (
    <AffiliateBanner
      href={AFFILIATE_LINK}
      imageSrc={BANNER_IMAGE}
      trackingPixel={TRACKING_PIXEL}
      imageAlt="楽天"
    />
  );
}
