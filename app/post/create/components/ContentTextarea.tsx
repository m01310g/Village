import SelectedImagesSection from "./SelectedImagesSection";

interface ContentTextareaProps {
  content: string;
  setContent: (content: string) => void;
  images?: string[];
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContentTextarea = ({
  content,
  setContent,
  images,
  setImages,
}: ContentTextareaProps) => {
  const handleImageRemove = (idx: number) => {
    if (setImages) {
      setImages((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <main className="flex h-full flex-col">
      <textarea
        name="content-textarea"
        placeholder="새로운 소식이 있나요?"
        className="text-body-4 placeholder:text-body-4 h-full resize-none text-text-primary placeholder:text-text-tertiary focus:outline-none"
        value={content}
        onChange={handleChange}
        maxLength={1000}
      />
      {images && setImages && images.length > 0 && (
        <SelectedImagesSection
          onRemoveImage={handleImageRemove}
          images={images}
        />
      )}
      <span className="text-caption-3 flex justify-end py-3 text-text-tertiary">
        {content.length}/1000
      </span>
    </main>
  );
};

export default ContentTextarea;
