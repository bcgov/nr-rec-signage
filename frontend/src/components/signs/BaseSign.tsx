import React, { useRef } from 'react';
import { useInchScale } from '../../utils/SignUtils';
import FieldDto from '../../interfaces/FieldDto';

interface BaseSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
  children: (inch: number) => React.ReactNode;
}

const BaseSign: React.FC<BaseSignProps> = ({ fields, metadata, isRealSize = false, children }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const widthValue = metadata?.get('width');
  const defaultWidth = widthValue ? Number.parseFloat(widthValue) : 48;
  const inchScale = useInchScale(bannerRef, defaultWidth);
  const inch = isRealSize ? 300 : inchScale;

  return (
    <div ref={bannerRef} className="w-100 d-flex flex-column align-items-center justify-content-center">
      {children(inch)}
    </div>
  );
};

export default BaseSign;
