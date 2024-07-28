// import React, { memo } from "react";
// import {
//   ZoomableGroup,
//   ComposableMap,
//   Geographies,
//   Geography
// } from "react-simple-maps";

// const MapChart = () => {
//   return (
//     <div data-tip="">
//       <ComposableMap>
//           <Geographies geography="/features.json">
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   onMouseEnter={() => {
//                   }}
//                   onMouseLeave={() => {
//                   }}
//                   style={{
//                     default: {
//                       fill: "#D6D6DA",
//                       outline: "none"
//                     },
//                     hover: {
//                       fill: "#F53",
//                       outline: "none"
//                     },
//                     pressed: {
//                       fill: "#E42",
//                       outline: "none"
//                     }
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//       </ComposableMap>
//     </div>
//   );
// };

// export default memo(MapChart);


import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);
  const [countryInfo, setCountryInfo] = useState(undefined);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>


<div>
            {countryInfo && (
                <>
                    <h1>{countryInfo.name}</h1>
                    {countryInfo.info?.map((item, index) => (
                        <div key={index}>
                            <p>{item.description}</p>
                            <ul>
                                {item.links?.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  onMouseDown={
                    () => {
                      setCountryInfo(geo.properties)
                    }
                  }
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#3CB371", // Change hover fill color to blue
                      outline: "none"
                    },
                    pressed: {
                      fill: "#2E8B57", // Change pressed fill color to a different shade of blue
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
    </>
  );
};

export default MapChart;
