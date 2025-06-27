export interface CareerData {
  id: string;
  workplace: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface CareerCardProps extends CareerData {
  onEdit: (updatedCareer: CareerData) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
