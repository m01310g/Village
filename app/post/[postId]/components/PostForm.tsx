import FilteringButton from "@/app/components/feed/FilteringButton";
import ContentTextarea from "../../create/components/ContentTextarea";
import PostCreateFooter from "../../create/components/PostCreateFooter";
import { Dispatch, SetStateAction } from "react";

interface PostFormProps {
  isActive: string;
  setIsActive: Dispatch<SetStateAction<"업계이야기" | "채용" | "교육">>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

type PostType = "업계이야기" | "채용" | "교육";

const PostForm = ({
  isActive,
  setIsActive,
  content,
  setContent,
  images,
  setImages,
}: PostFormProps) => {
  const types = ["업계이야기", "채용", "교육"];

  return (
    <div className="flex h-full max-w-[500px] flex-col overflow-hidden">
      <div className="flex flex-grow flex-col gap-5 px-4 py-3">
        <div className="border-b-[1px] border-border-primary pb-3">
          {types.map((type, i) => (
            <FilteringButton
              key={i}
              content={type}
              onClick={() => {
                setIsActive(type as PostType);
              }}
              isActive={isActive === type}
            />
          ))}
        </div>
        <ContentTextarea
          content={content}
          setContent={setContent}
          images={images}
          setImages={setImages}
        />
      </div>
      <PostCreateFooter setImages={setImages} imageCount={images.length} />
    </div>
  );
};

export default PostForm;
