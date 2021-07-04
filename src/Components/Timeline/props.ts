import { iMeasurement } from "../../Utils/dbMock";

export interface iTimeline {
  data: iMeasurement[];
  onClick: (id: number) => void
}