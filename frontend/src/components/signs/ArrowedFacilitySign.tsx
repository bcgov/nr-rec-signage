import React, { useEffect, useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import leftArrow from '../../assets/img/left-arrow.svg';
import rightArrow from '../../assets/img/right-arrow.svg';
import upArrow from '../../assets/img/up-arrow.svg';
import downArrow from '../../assets/img/down-arrow.svg';
import { useInchScale } from '../../utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
import { PlotHoleCenter, PlotHoleCorners, PlotHoleOffset, PlotHoleVertical } from './PlotHole';
interface ArrowedFacilitySignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const ArrowedFacilitySign: React.FC<ArrowedFacilitySignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize? 40 : useInchScale(bannerRef, 24);
  const initialFontSize = inch * 2.5;

  const getIcon = (arrowDirection: string | undefined) => {
    switch (arrowDirection) {
      case 'Left':
        return leftArrow;
      case 'Right':
        return rightArrow;
      case 'Up':
        return upArrow;
      case 'Down':
        return downArrow;
      default:
        return leftArrow;
    }
  };

  const getFlexDirection = (swapSide: boolean) => {
    return swapSide ? 'row-reverse' : 'row';
  };

  useEffect(() => {
    console.log('ArrowedFacilitySign fields:', fields);
  }, [fields]);
  return (
    <div ref={bannerRef} className="w-100 d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{height: `${inch * 5.5}px`,width: `${inch * 24}px`,
            position: 'relative',
            backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            padding: `${inch * 1}px`, gap: `${inch * 0.5}px`, fontSize: `${inch * 3}px`,display: 'flex', flexDirection: getFlexDirection(fields.get('swap_side')?.value === 'true'),
             alignItems: 'center', justifyContent: 'space-between', color: 'white', textAlign: 'center'
        }}
        >   <InlineSVG src={getIcon(fields.get('arrow_direction')?.value)} width={`${inch * 3}px`} height="auto" />
            <p  style={{lineHeight: 1,fontSize: `${initialFontSize *  parseFloat(fields.get('resizer_text')?.value || '100')/100 }px`,color: 'white', textAlign: 'center', flex: 1}}>{fields.get('title')?.value || ''}</p>
            <div style={{width: `${inch * 4}px`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                {fields.get('icon')?.value && <InlineSVG src={fields.get('icon')?.value} width={`100%`} height="100%" />}
            </div>
            {fields.get('pilot_holes') && fields.get('pilot_holes')?.value === 'Center' &&
            <PlotHoleCenter inch={inch} width={5/16} color='#000'/>}
            {fields.get('pilot_holes') && fields.get('pilot_holes')?.value === 'Top/Bottom' &&
            <PlotHoleVertical inch={inch} containerWidth={24} width={5/16} color='#000'/>}
            {fields.get('pilot_holes') && fields.get('pilot_holes')?.value === 'Offset' &&
            <PlotHoleOffset inch={inch} containerWidth={24} width={5/16} color='#000'/>}
        </div>
    </div>
  );
};

export default ArrowedFacilitySign;
