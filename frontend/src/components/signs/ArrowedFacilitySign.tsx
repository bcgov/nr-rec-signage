import React, { useRef, useState, useLayoutEffect } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import arrowIcon from '../../assets/img/left-arrow.svg';
import { useInchScale } from '../../utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
interface ArrowedFacilitySignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const ArrowedFacilitySign: React.FC<ArrowedFacilitySignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize? 40 : useInchScale(bannerRef, 24);
  const initialFontSize = inch * 2.5;


  return (
    <div ref={bannerRef} className="w-100 d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{height: `${inch * 5.5}px`,width: `${inch * 24}px`, backgroundColor: '#4E3629',
            padding: `${inch * 1}px`, gap: `${inch * 0.5}px`, fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', textAlign: 'center'
        }}
        >   <InlineSVG src={arrowIcon} width={`${inch * 3}px`} height="auto" />
            <p  style={{lineHeight: 1,fontSize: `${initialFontSize *  parseFloat(fields.get('resizer_text')?.value || '100')/100 }px`,color: 'white', textAlign: 'center', flex: 1}}>{fields.get('title')?.value || ''}</p>
            <div style={{width: `${inch * 4}px`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                {fields.get('icon')?.value && <InlineSVG src={fields.get('icon')?.value} width={`100%`} height="100%" />}
            </div>
        </div>
    </div>
  );
};

export default ArrowedFacilitySign;
