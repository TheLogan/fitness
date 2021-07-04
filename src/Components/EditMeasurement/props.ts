import { iMeasurement } from "../../Utils/dbMock";

export interface iEditMeasurement {
  selectedMeasurement: iMeasurement | undefined;
  onClose: () => void;
  saveChanges: (changedMeasurement: iMeasurement) => void;
}