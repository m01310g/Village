interface ContentTextareaProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentTextarea = ({ content, onChange }: ContentTextareaProps) => {
  return (
    <main className="flex h-full flex-col">
      <textarea
        name="content-textarea"
        placeholder="새로운 소식이 있나요?"
        className="placeholder:text-body-3 h-full resize-none text-text-primary placeholder:text-text-tertiary focus:outline-none"
        value={content}
        onChange={onChange}
        maxLength={1000}
      />
      <span className="text-caption-3 flex justify-end py-3 text-text-tertiary">
        {content.length}/1000
      </span>
    </main>
  );
};

export default ContentTextarea;
