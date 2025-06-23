import CameraIcon from "@/public/icons/icn_camera-01.svg";
import ImageIcon from "@/public/icons/icn_image-03.svg";

const PostCreateFooter = () => {
  return (
    <footer className="w-full py-1">
      <button className="p-1.5">
        <CameraIcon width="24px" height="24px" color="#737373" />
      </button>
      <button className="p-1.5">
        <ImageIcon width="24px" height="24px" color="#737373" />
      </button>
    </footer>
  );
};

export default PostCreateFooter;
