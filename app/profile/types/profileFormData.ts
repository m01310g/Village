import { WebCareer } from "./webCareer";

export interface ProfileFormData {
  profileImage?: string;
  name: string;
  nickname: string;
  webCareers: WebCareer[];
  introduction?: string;
  location: { [key: string]: string[] };
  status: number;
  phone: string;
  phoneOpened: number;
}
