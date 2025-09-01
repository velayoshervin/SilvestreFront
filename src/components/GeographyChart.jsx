import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../theme";
import geoFeatures  from "../data/philippines-geo.json";


const nearbyProvincesData = [
  // Pampanga municipalities
  { id: "PHL.18.1_1", value: 120 },    // Apalit
  { id: "PHL.18.4_1", value: 150 },    // Candaba
  { id: "PHL.18.6_1", value: 175 },    // San Fernando
  { id: "PHL.18.7_1", value: 130 },    // Angeles
  
  // Bulacan municipalities
  { id: "PHL.3.1_1", value: 110 },     // Malolos
  { id: "PHL.3.3_1", value: 85 },      // San Jose del Monte

  // Bataan municipalities
  { id: "PHL.2.1_1", value: 60 },      // Balanga
  
  // Tarlac municipalities
  { id: "PHL.72.1_1", value: 140 },    // Tarlac City

  // Nueva Ecija municipalities
  { id: "PHL.47.1_1", value: 125 },    // Cabanatuan

  // Zambales municipalities
  { id: "PHL.84.1_1", value: 80 },     // Olongapo
];

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(geoFeatures.features.length);
  console.log(geoFeatures.features[0].properties)
  return (
    <ResponsiveChoropleth
      data={[]}
      features={geoFeatures.features}
      featureId="properties.GID_2"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 200]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 2000 : 2500}
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;