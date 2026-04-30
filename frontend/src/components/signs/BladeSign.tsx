import React, { useRef, useState, useLayoutEffect } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import { useInchScale } from '../../utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
interface BladeSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const BladeSign: React.FC<BladeSignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize? 40 : useInchScale(bannerRef, 48);
  const blade1Ref = useRef<HTMLDivElement>(null);
  const initialFontSize = inch * 3;
  const [fontSize, setFontSize] = useState(initialFontSize);


  return (
    <div ref={bannerRef} className="blade-sign w-100 d-flex flex-column align-items-center justify-content-center">
        <div data-prefix="Blade 1" className='exportable'  style={{height: `${inch * 5.5}px`,width: `${inch * 48}px`
        }}
        >
            <div style={{backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,width: '100%',height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p  ref={blade1Ref} style={{lineHeight: 1,textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`,fontSize: `${initialFontSize}px`,color: 'white', textAlign: 'center'}}>{fields.get('blade_1_text')?.value || 'Not set'}</p>
            </div>
        </div>
        <div data-prefix="Blade 2" className='exportable' style={{aspectRatio: `48 / 5.5`,width: `${inch * 48}px`, backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            marginTop: `${inch * 0.5}px`, marginBottom: `${inch * 2}px`, fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`
        }}
        >
            <p style={{textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`,fontSize: `${inch * 3}px`,color: 'white', textAlign: 'center'}}>{fields.get('blade_2_text')?.value || 'Not set'}</p>
        </div>
        <div data-prefix="Blade 3" className='exportable' style={{height: `${inch * 9}px`,width: `${inch * 36}px`, backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            padding: `${inch * 1}px`, fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`
        }}
        >
            <InlineSVG src={logo} width={`${inch * 30}px`} height="auto" />
        </div>
    </div>
  );
};

export default BladeSign;
