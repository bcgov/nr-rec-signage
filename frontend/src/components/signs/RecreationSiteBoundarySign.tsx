import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import logo from '../../assets/img/BC_Logo.svg';
import { useInchScale } from '@/utils/SignUtils';
import { InlineSVG } from '@/utils/SvgUtils';
interface RecreationSiteBoundarySignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const RecreationSiteBoundarySign: React.FC<RecreationSiteBoundarySignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize? 40 : useInchScale(bannerRef, 12);

  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-50
     d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{
            backgroundColor: '#4E3629',
            height: `${inch * 16}px`,
            width: `${inch * 12}px`,
            borderRadius: `${inch * 0.5}px`,
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
                <InlineSVG src={logo} width="auto" height={`${inch * 7}px`} />
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
