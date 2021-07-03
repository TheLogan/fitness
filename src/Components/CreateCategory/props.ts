export interface iCreateCategory {
  open: boolean;
  onClose: () => void;
  createCategory: (categoryName: string) => void;
}