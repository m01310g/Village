import { Board } from "@/app/profile/hooks/useUserProfile";
import { CommentType } from "../[postId]/components/comments/types/commentType";

export interface PostType extends Board {
  comments: CommentType[];
}
