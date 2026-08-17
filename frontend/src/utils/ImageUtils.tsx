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

export const getIconWidth = (pictogramCount: number, gap: number = 0) =>{
    if(pictogramCount < 3){
        return `100%`;
    }
    else if(pictogramCount <= 4){
        return `calc(50% - ((${gap}px) / 2))`;
    }
    else if(pictogramCount <= 9){
        return `calc(33.33% - ((2 * ${gap}px) / 3))`;
    }
    else{
        return `calc(25% - ((3 *${gap}px) / 4))`;
    }
};
export const getIconHeight = (pictogramCount: number, gap: number = 0) => {
    if(pictogramCount < 3){
        return 100/pictogramCount;
    }
    else if(pictogramCount < 7){
        return 50;
    }
    else if(pictogramCount < 10){
        return 33.33;
    }
    else{
        return 25;
    }
}
