export const resizeImage = (file: File, maxWidth = 500): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return;

      image.src = e.target.result as string;
      image.onload = () => {
        const aspectRatio = image.height / image.width;
        const canvas = document.createElement("canvas");

        const targetWidth = Math.min(image.width, maxWidth);
        const targetHeight = targetWidth * aspectRatio;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context not found"));

        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Blob 생성 실패"));
          }
        }, file.type);
      };
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
