import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import { useInchScale } from '../../utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
interface BladeSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const NumberPost: React.FC<BladeSignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const width = metadata?.get('width') ? parseFloat(metadata.get('width')!) : 4;
  const height = metadata?.get('height') ? parseFloat(metadata.get('height')!) : 6;
  const inch = isRealSize? 40 : useInchScale(bannerRef,width);

  return (
    <div ref={bannerRef} className="blade-sign w-50 d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{
            width: `${inch * width}px`,
            height: `${inch * height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4E3629',
        }}>
            <p style={{
              fontSize: `${inch * ((width)*0.60)}px`,
              color: 'white'
            }}>{fields.get('camp_number')?.value || '1'}</p>
        </div>
    </div>
  );
};

export default NumberPost;
