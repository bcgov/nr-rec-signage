import ImageTracer from 'imagetracerjs';

export const convertImageFileToSvg = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const tracer = ImageTracer as any;
        try {
          const svg = tracer.imagedataToSVG(imageData, {
            ltres: 1,
            qtres: 1,
            pathomit: 8,
            numberofcolors: 16,
            scale: 1,
            viewbox: true,
            blurradius: 0,
            roundcoords: 1,
          });
          resolve(svg);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Unable to load image for conversion'));
      img.src = dataUrl;
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
