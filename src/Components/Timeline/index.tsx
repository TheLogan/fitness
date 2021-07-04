import React from "react";
import { Bar } from "@nivo/bar";
import { iTimeline } from "./props";
import { format } from "date-fns";
import { CSSProperties } from "@material-ui/core/styles/withStyles";


export const Timeline: React.FC<iTimeline> = (props) => {
  return (
    <Bar
      width={900}
      height={400}
      data={props.data.map(x => {
        return { date: format(x.date, 'dd/MM/yyyy'), measurement: x.measurement, id: x.id }
      }
      ).reverse()}
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
      onClick={el => { props.onClick(el.data.id) }}
      //@ts-ignore
      onMouseEnter={(data, e) => (e.target.style as CSSProperties).cursor = 'pointer' }
      //@ts-ignore
      onMouseLeave={(data, e) => (e.target.style as CSSProperties).cursor = 'default' }
    />
  );
};
