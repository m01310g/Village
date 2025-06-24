import { Board } from "@/app/profile/hooks/useUserProfile";

export interface PostType extends Board {
  comments: CommentType[];
}
