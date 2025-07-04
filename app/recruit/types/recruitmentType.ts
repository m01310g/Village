export interface RecruitmentType {
  id: number;
  city: string;
  centerName: string;
  location: string;
  workType: string[];
  workTime: string[];
}

export interface RecruitmentList {
  webRecruitmentList: RecruitmentType[];
  totalWebRecruitments: number;
  totalPages: number;
  currentPage: number;
}

export interface RecruitmentById extends RecruitmentType {
  salary: string[];
  maxClassFee: number;
  weekendDuty: string;
  address: string;
  map: string;
  gender: string;
  qualification: string[];
  preference: string[];
  site: string;
  date: string;
}
