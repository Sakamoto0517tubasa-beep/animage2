import AffiliateBanner from "@/components/AffiliateBanner";

const AFFILIATE_LINK =
  "https://px.a8.net/svt/ejp?a8mat=4B3Y3B%205LTYUQ%2041A0%2061RIA";

const BANNER_IMAGE =
  "https://www20.a8.net/svt/bgt?aid=&wid=&eno=01&mid=&mc=1";

const TRACKING_PIXEL =
  "https://www10.a8.net/0.gif?a8mat=4B3Y3B%205LTYUQ%2041A0%2061RIA";

export default function AffiliateBanner2() {
  return (
    <AffiliateBanner
      href={AFFILIATE_LINK}
      imageSrc={BANNER_IMAGE}
      trackingPixel={TRACKING_PIXEL}
      imageWidth={300}
      imageHeight={250}
    />
  );
}
