import React from "react";
import { Bar } from "@nivo/bar";
import { iTimeline } from "./props";


export const Timeline: React.FC<iTimeline> = (props) => {
  return (
    <Bar
      width={900}
      height={400}
      data={props.data.map(x => { return { date: x.date, measurement: x.measurement, id: x.id } })}
      keys={["measurement"]}
      indexBy="date"
      colors={["#0095ff"]}
      enableLabel={false}
      borderRadius={2}
      layers={["grid", "axes", "bars", "markers", "legends"]}
      margin={{
        top: 15,
        right: 10,
        bottom: 36,
        left: 36
      }}
      onClick={el => {props.onClick(el.data.id)}}
    />
  );
};
