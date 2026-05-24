import AffiliateBanner from "@/components/AffiliateBanner";

const AFFILIATE_LINK =
  "https://px.a8.net/svt/ejp?a8mat=4B3Y3B+5MFEGI+4EZ2+BYLJL";

const BANNER_IMAGE =
  "https://www27.a8.net/svt/bgt?aid=260524631340&wid=001&eno=01&mid=s00000020603002009000&mc=1";

const TRACKING_PIXEL =
  "https://www12.a8.net/0.gif?a8mat=4B3Y3B+5MFEGI+4EZ2+BYLJL";

export default function AffiliateBanner1() {
  return (
    <AffiliateBanner
      href={AFFILIATE_LINK}
      imageSrc={BANNER_IMAGE}
      trackingPixel={TRACKING_PIXEL}
      imageWidth={728}
      imageHeight={90}
    />
  );
}
