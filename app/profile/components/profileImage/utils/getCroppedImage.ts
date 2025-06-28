import { Area } from "react-easy-crop";

export const getCroppedImage = async (
  imageUrl: string,
  croppedArea: Area,
): Promise<File | null> => {
  const image = document.createElement("img");
  image.src = imageUrl;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = croppedArea.width;
  canvas.height = croppedArea.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(
    image,
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height,
    0,
    0,
    croppedArea.width,
    croppedArea.height,
  );

  return new Promise((resolve) =>
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null);
      resolve(new File([blob], "cropped.jpeg", { type: "image/jpeg" }));
    }, "image/jpeg"),
  );
};
