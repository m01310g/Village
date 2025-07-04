import { useKakaoLoader } from "@/app/lib/hooks/useKakaoLoader";
import { useEffect, useRef } from "react";

interface KakaoMapProps {
  address?: string;
  centerName: string;
}

const KakaoMap = ({ address, centerName }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isLoaded = useKakaoLoader();

  useEffect(() => {
    const kakao = window.kakao;
    if (!isLoaded || !mapRef.current) return;

    new Promise<void>((resolve) => {
      kakao.maps.load(() => {
        resolve();
      });
    }).then(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      const rawAddress = address ?? "";
      const cleanAddress =
        rawAddress.includes("층") || rawAddress.includes("지하")
          ? rawAddress.split(" ").slice(0, -1).join(" ")
          : rawAddress;
      const query = cleanAddress || centerName;

      geocoder.addressSearch(
        query,
        (result: { x: string; y: string }[], status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const map = new kakao.maps.Map(mapRef.current!, {
              center: coords,
              level: 3,
            });

            new kakao.maps.Marker({
              map,
              position: coords,
            });
          }
        },
      );
    });
  }, [isLoaded, address ?? "", centerName]);

  return <div ref={mapRef} className="h-[200px] w-full rounded-[8px]" />;
};

export default KakaoMap;
