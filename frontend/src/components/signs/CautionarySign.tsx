import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
import logo from '../../assets/img/RST_logo-Yellow.svg';
import { ReactSVG } from 'react-svg';
interface CautionarySignProps {
  fields: Map<string, FieldDto>;
  metadata: Map<string, string>;
 isRealSize?: boolean;
}

const CautionarySign: React.FC<CautionarySignProps> = ({fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const pictogramCount = fields.get('icon')?.value ? fields.get('icon')?.value.split(";").length : 0;
  const inch = isRealSize ? 300: useInchScale(bannerRef, metadata.get('width') ? parseFloat(metadata.get('width')!) : 16);
  const iconWidth = pictogramCount > 1 ? `48%` : '100%';
  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-50
     d-flex flex-column align-items-center justify-content-center">
        <div className="exportable" style={{
            backgroundColor: '#FFD100',
            width: `${inch * parseFloat(metadata.get('width') || "16")}px`,
            borderRadius: `${inch * 0.5}px`,
            height: `${inch * parseFloat(metadata.get('height') || "16")}px`,
            aspectRatio: `${metadata.get('width')} / ${metadata.get('height')}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2D2926'
        }}>
            <div style={{
                border: `${inch * 0.4}px solid #2D2926`,
                width: '95%',
                height: '95%',
                borderRadius: `${inch * 0.8}px`,

                display: 'flex',
                paddingTop: `${inch * 1}px`,
                paddingBottom: `${inch * 0.2}px`,
                paddingLeft: `${inch * 0.2}px`,
                paddingRight: `${inch * 0.2}px`,
                flexDirection: 'column',
                alignItems: 'center',
                color: '#2D2926',
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
                    {fields.get('title')?.value || 'Caution'}
                </p>
                {fields.get('header_sub_text')?.value && (
                    <p style={{
                        fontSize: `${inch * (44 / 72)}px`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        marginTop: `-${inch * 0.25}px`,
                        textAlign: 'center',
                        lineHeight: 1.3,
                        letterSpacing: 0
                    }}>
                        {fields.get('header_sub_text')?.value}
                    </p>
                )}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flex: "1 1 0",
                    minWidth: 0,
                    height: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    gap: `${inch * 0.15}px`
                }}>
                    {fields.get('icon')?.value?.split(";").map((link: string, index: number) => {
                        return <ReactSVG wrapper='span' key={`icon-cautionary-${index}`} style={{ width: iconWidth, height: "100%" }} src={link} beforeInjection={(svg) => {
                            svg.setAttribute("width", iconWidth);
                            svg.setAttribute("height", "100%");
                        }} />;
                    })}
                </div>

                {fields.get('sub_text')?.value && (
                    <p style={{
                        fontSize: `${inch * (44 / 72)}px`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        marginTop: `-${inch * 0.25}px`,
                        textAlign: 'center',
                        lineHeight: 1.3,
                        letterSpacing: 0
                    }}>
                        {fields.get('sub_text')?.value}
                    </p>
                )}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    justifySelf: "end",
                    lineHeight: 1.1,
                }}>
                    <div style={{
                        fontSize: `${inch * (26/72)}px`,
                        width: '40%'
                    }}>
                    Forest and Range Practices Act Forest Recreation Regulation Section {fields.get("regulations")?.value || 'XX(XX)'}
                    </div>
                    <div style={{
                        width: '40%'
                    }}>
                        <ReactSVG src={logo} beforeInjection={(svg) => {
                            svg.setAttribute("width", "100%");
                            svg.setAttribute("height", "auto");
                        }} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CautionarySign;
