import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import { useInchScale } from '../../utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
import { PlotHoleCenter, PlotHoleVertical } from './PlotHole';
interface BladeSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const NumberPost: React.FC<BladeSignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const width = metadata?.get('width') ? parseFloat(metadata.get('width')!) : 4;
  const height = metadata?.get('height') ? parseFloat(metadata.get('height')!) : 6;
  const inch = isRealSize? 72 : useInchScale(bannerRef,width);

  return (
    <div ref={bannerRef} className="blade-sign w-60 d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{
            width: `${inch * width}px`,
            height: `${inch * height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4E3629',
            position: 'relative',
        }}>
            <p style={{
              fontSize: `${inch * parseFloat(fields.get('resizer_number')?.value || '100')/100 * parseFloat(metadata?.get('font-size') ??(width * 0.6).toString())/72}px`,
              color: 'white'
            }}>{fields.get('camp_number')?.value || '1'}</p>
            {fields.get('pilot_holes') && fields.get('pilot_holes')?.value === 'center' &&
              <PlotHoleCenter inch={inch} width={5/16} color='#FFF'/>}
              {fields.get('pilot_holes') && fields.get('pilot_holes')?.value === 'top/bottom' &&
              <PlotHoleVertical inch={inch} containerWidth={width} width={1/4} color='#FFF'/>}
        </div>
    </div>
  );
};

export default NumberPost;
