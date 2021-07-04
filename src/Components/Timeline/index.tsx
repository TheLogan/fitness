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
        return { date: x.date.getTime(), measurement: x.measurement, id: x.id.toString() }
      }).sort((x, y) => (x.date > y.date) ? 1 : -1)
      }
      keys={["measurement"]}
      indexBy="date"
      colors={["#0095ff"]}
      enableLabel={false}
      margin={{
        top: 15,
        right: 10,
        bottom: 36,
        left: 36
      }}
      axisBottom={{
        format: value => {
          console.log(`value`, value)
          return format(new Date(value), 'dd/MM yyyy')
        }
      }}
      onClick={el => props.onClick(Number(el.data.id))}
      //@ts-ignore
      onMouseEnter={(data, e) => (e.target.style as CSSProperties).cursor = 'pointer'}
      //@ts-ignore
      onMouseLeave={(data, e) => (e.target.style as CSSProperties).cursor = 'default'}
    />
  );
};
