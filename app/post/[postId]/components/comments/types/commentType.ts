interface CommentProfile {
  id: number;
  profileImage: string;
  nickname: string;
  name: string;
}

interface CommentType {
  id: number;
  content: string;
  writtenAt: string;
  writtenBy: CommentProfile;
}
