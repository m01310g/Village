export interface CommentProfile {
  id: number;
  profileImage: string;
  nickname: string;
  name: string;
}

export interface CommentType {
  id: number;
  content: string;
  writtenAt: string;
  writtenBy: CommentProfile;
}
