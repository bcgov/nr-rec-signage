import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/RST_logo-BQZ01OOE.svg';
import { useInchScale } from '@/utils/SignUtils';
interface RecreationSiteBoundarySignProps {
  fields: Map<string, FieldDto>;
}

const RecreationSiteBoundarySign: React.FC<RecreationSiteBoundarySignProps> = ({ fields }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = useInchScale(bannerRef, 12);

  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-50
     d-flex flex-column align-items-center justify-content-center">
        <div style={{
            backgroundColor: '#4E3629',
            width: '100%',
            borderRadius: `${inch * 0.5}px`,
            aspectRatio: `12 / 16`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <div style={{
                border: `${inch * 0.4}px solid white`,
                width: '95%',
                borderRadius: `${inch * 0.8}px`,
                aspectRatio: `12 / 16`,
                display: 'flex',
                paddingTop: `${inch * 1}px`,
                paddingBottom: `${inch * 1}px`,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                gap: `${inch * 0.5}px`
            }}>
                <p style={{
                    fontSize: `${inch * (104 / 72)}px`,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1,
                    letterSpacing: 0
                }}>
                    RECREATION SITE
                </p>
                <p style={{
                    fontSize: `${inch * (104 / 72)}px`,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1,
                    letterSpacing: 0
                }}>
                    Boundary
                </p>
            </div>
        </div>
    </div>
  );
};

export default RecreationSiteBoundarySign;
