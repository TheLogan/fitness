export interface iEditMeasurement {
  open: boolean;
  onClose: () => void;
  saveChanges: (categoryName: string) => void;
}