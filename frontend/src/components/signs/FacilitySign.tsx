import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
import logo from '../../assets/img/RST_logo-White.svg';
import { ReactSVG } from 'react-svg';
import { InlineSVG } from '@/utils/SvgUtils';
interface FacilitySignProps {
  fields: Map<string, FieldDto>;
  metadata: Map<string, string>;
 isRealSize?: boolean;
}

const FacilitySign: React.FC<FacilitySignProps> = ({fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const pictogramCount = fields.get('icon')?.value ? fields.get('icon')?.value.split(";").length : 0;
  const inch = isRealSize ? 40: useInchScale(bannerRef, metadata.get('width') ? parseFloat(metadata.get('width')!) : 16);
  const titleFontSize = metadata.get('title_font_size') ? parseFloat(metadata.get('title_font_size')!) : 104;
  const subtitleFontSize = metadata.get('subtitle_font_size') ? parseFloat(metadata.get('subtitle_font_size')!) : 44;
  const regulationFontSize = metadata.get('regulation_font_size') ? parseFloat(metadata.get('regulation_font_size')!) : 26;
  const iconWidth = pictogramCount > 1 ? `48%` : '100%';
  const width = metadata.get('width') ? parseFloat(metadata.get('width')!) : 16;
  const scale = (width: number, value: number) =>{
    return width * value / 16;
  }
  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-80
     d-flex flex-column align-items-center justify-content-center">
        <div className="exportable" style={{
            backgroundColor: '#4E3629',
            width: `${inch * parseFloat(metadata.get('width') || "16")}px`,
            borderRadius: `${inch * (width / 32)}px`,
            height: `${inch * parseFloat(metadata.get('height') || "16")}px`,
            aspectRatio: `${metadata.get('width')} / ${metadata.get('height')}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
        }}>
            <div style={{
                border: `${inch * (width / 36)}px solid #FFFFFF`,
                width: '95%',
                height: '95%',
                borderRadius: `${inch * (width / 22)}px`,

                display: 'flex',
                paddingTop: `${inch * scale(width, 0.75)}px`,
                paddingBottom: `${inch * scale(width, 0.2)}px`,
                paddingLeft: `${inch * scale(width, 0.2)}px`,
                paddingRight: `${inch * scale(width, 0.2)}px`,
                flexDirection: 'column',
                alignItems: 'center',
                color: '#FFFFFF',
                gap: `${inch * scale(width, 0.5)}px`
            }}>
                <p style={{
                    fontSize: `${inch * (titleFontSize / 72)}px`,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1,
                    letterSpacing: 0
                }}>
                    {fields.get('title')?.value}
                </p>
                {fields.get('header_sub_text')?.value && (
                    <p style={{
                        fontSize: `${inch * (subtitleFontSize / 72)}px`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        marginTop: `-${inch * scale(width, 0.25)}px`,
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
                    gap: `${inch * scale(width, 0.05)}px`
                }}>
                    {fields.get('icon')?.value?.split(";").map((link: string, index: number) => {
                        return <InlineSVG key={`icon-cautionary-${index}`} src={link} width={iconWidth} height="100%" />;
                    })}
                </div>

                {fields.get('sub_text')?.value && (
                    <p style={{
                        fontSize: `${inch * (subtitleFontSize / 72)}px`,
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
                    alignItems: "center",
                    justifySelf: "end",
                    lineHeight: 1.1,
                }}>
                    <div style={{
                        fontSize: `${inch * (regulationFontSize / 72)}px`,
                        width: '40%'
                    }}>
                    Forest and Range Practices Act Forest Recreation Regulation Section {fields.get("regulations")?.value || 'XX(XX)'}
                    </div>
                    <div style={{
                        width: '40%'
                    }}>
                        <InlineSVG src={logo} width={'100%'} height="auto" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FacilitySign;
