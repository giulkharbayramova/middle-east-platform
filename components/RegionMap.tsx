import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const middleEastCountries = [
  "784", "682", "634", "414", "512", "887",
  "368", "760", "400", "376", "422", "364",
  "792", "818", "275", "48",
];

export default function RegionMap() {
  const router = useRouter();
  const [hoverCountry, setHoverCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  return (
    <section style={{ maxWidth: "1100px", margin: "80px auto 0", position: "relative" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "12px", color: "#1d1d1d" }}>
        Карта региона
      </h2>

      <p style={{ marginBottom: "26px", fontSize: "15px", color: "#555", lineHeight: "1.6", maxWidth: "700px" }}>
        Нажми на страну, чтобы узнать подробнее.
      </p>

      <div style={{
        borderRadius: "28px",
        background: "rgba(255,255,255,0.8)",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden",
        padding: "24px",
        position: "relative",
      }}>
        {/* Восточный акцент */}
        <div style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(180, 140, 90, 0.12)",
          filter: "blur(35px)",
        }}/>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 420, center: [45, 27] }}
          style={{ width: "100%", height: "clamp(300px, 60vw, 600px)" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const isMiddleEast = geo.id ? middleEastCountries.includes(geo.id.toString()) : false;
                const geoName = geo.properties.name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isMiddleEast) {
                        router.push(`/ru/countries?country=${encodeURIComponent(geoName)}`);
                      }
                    }}
                    onMouseEnter={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                      if (isMiddleEast) {
                        setHoverCountry(geoName);
                        setTooltipPosition({ x: e.clientX, y: e.clientY });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoverCountry(null);
                      setTooltipPosition(null);
                    }}
                    style={{
                      default: {
                        fill: isMiddleEast ? "rgba(180, 140, 90, 0.30)" : "rgba(0,0,0,0.03)",
                        stroke: "rgba(0,0,0,0.20)",
                        strokeWidth: 0.6,
                        outline: "none",
                        cursor: isMiddleEast ? "pointer" : "default",
                      },
                      hover: {
                        fill: isMiddleEast ? "rgba(180, 140, 90,0.55)" : "rgba(0,0,0,0.03)",
                        stroke: "rgba(0,0,0,0.35)",
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: isMiddleEast ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isMiddleEast ? "rgba(180, 140, 90,0.70)" : "rgba(0,0,0,0.03)",
                        stroke: "rgba(0,0,0,0.40)",
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Подсказка при hover */}
        {hoverCountry && tooltipPosition && (
          <div style={{
            position: "fixed",
            top: tooltipPosition.y + 12,
            left: tooltipPosition.x + 12,
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "6px 12px",
            fontSize: "13px",
            color: "#1d1d1d",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            pointerEvents: "none",
            transition: "all 0.15s ease",
            zIndex: 999,
            whiteSpace: "nowrap",
          }}>
            {hoverCountry}
          </div>
        )}
      </div>
    </section>
  );
}
