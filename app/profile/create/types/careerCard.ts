export interface CareerData {
  id: string;
  workplace: string;
  startDate: string;
  endDate: string;
}

export interface CareerCardProps extends CareerData {
  onEdit: (updatedCareer: CareerData) => void;
  onDelete: () => void;
}
