import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import { useInchScale } from '../../utils/SignUtils';
interface BladeSignProps {
  fields: Map<string, FieldDto>;
}

const BladeSign: React.FC<BladeSignProps> = ({ fields }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = useInchScale(bannerRef, 48);

  return (
    <div ref={bannerRef} className="blade-sign w-100 d-flex flex-column align-items-center justify-content-center">
        <div style={{aspectRatio: `48 / 5.5`,width: '100%', backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`
        }}
        >
            {fields.get('blade_1_text')?.value || 'Not set'}
        </div>
        <div style={{aspectRatio: `48 / 5.5`,width: '100%', backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            marginTop: `${inch * 0.5}px`, marginBottom: `${inch * 2}px`, fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`
        }}
        >
            {fields.get('blade_2_text')?.value || 'Not set'}
        </div>
        <div style={{aspectRatio: `36 / 9`,width: `${inch * 36}px`, backgroundColor: '#4E3629', borderRadius: `${inch * 0.5}px`,
            padding: `${inch * 1}px`, fontSize: `${inch * 3}px`,display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', textTransform: 'uppercase',letterSpacing: `${inch * 0.5}px`
        }}
        >
            <img height={`${inch * 6}px`} src={logo} alt="RST Logo" />
        </div>
    </div>
  );
};

export default BladeSign;
