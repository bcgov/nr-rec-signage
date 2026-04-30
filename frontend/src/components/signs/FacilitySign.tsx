import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
import logo from '../../assets/img/RST_logo-white.svg';
import { ReactSVG } from 'react-svg';
import { InlineSVG } from '@/utils/SvgUtils';
import { getIconHeight, getIconWidth } from '@/utils/ImageUtils';
interface FacilitySignProps {
  fields: Map<string, FieldDto>;
  metadata: Map<string, string>;
 isRealSize?: boolean;
}

const FacilitySign: React.FC<FacilitySignProps> = ({fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const pictogramCount = fields.get('icon')?.value ? fields.get('icon')?.value.split(";").length : 0;
  const inch = isRealSize ? 300: useInchScale(bannerRef, metadata.get('width') ? parseFloat(metadata.get('width')!) : 16);
  const titleFontSize = metadata.get('title_font_size') ? parseFloat(metadata.get('title_font_size')!) : 104;
  const subtitleFontSize = metadata.get('subtitle_font_size') ? parseFloat(metadata.get('subtitle_font_size')!) : 44;
  const regulationFontSize = metadata.get('regulation_font_size') ? parseFloat(metadata.get('regulation_font_size')!) : 26;
  const iconWidth = getIconWidth(pictogramCount);
  const iconHeight = getIconHeight(pictogramCount);
  const width = metadata.get('width') ? parseFloat(metadata.get('width')!) : 16;
  const containerWidth = parseFloat(metadata.get('width') || "16");
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
        }}>
            <div style={{
                backgroundColor: '#FFF',
                borderRadius: `${inch * scale(width, 0.5)}px`,
                marginTop: `${inch * (parseFloat(metadata.get('width') || "16") * 0.025)}px`,
                marginLeft: `${inch * (parseFloat(metadata.get('width') || "16") * 0.025)}px`,
                width: `${inch * (parseFloat(metadata.get('width') || "16") * 0.95)}px`,
                height: `${inch * (parseFloat(metadata.get('height') || "16") - (containerWidth * 0.025 * 2))}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    backgroundColor: '#4E3629',
                    borderRadius: `${inch * scale(width, 0.5)}px`,
                    width: `${inch * (parseFloat(metadata.get('width') || "16")*0.95 - (parseFloat(metadata.get('border-width') || "0.42")*2))}px`,
                    height: `${inch * (parseFloat(metadata.get('height') || "16") - (containerWidth * 0.025 * 2) - (parseFloat(metadata.get('border-width') || "0.42")*2))}px`,
                    display: 'flex',
                    paddingTop: `${inch * scale(width, 0.75)}px`,
                    paddingBottom: `${inch * scale(width, 0.2)}px`,
                    paddingLeft: `${inch * scale(width, 0.2)}px`,
                    paddingRight: `${inch * scale(width, 0.2)}px`,
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: '#FFF',
                    gap: `${inch * scale(width, 0.5)}px`
                }}>
                    <p style={{
                        fontSize: `${inch * (titleFontSize / 72)}px`,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        lineHeight: 1,
                        color: '#FFF',
                        letterSpacing: 0
                    }}>
                        {fields.get('title')?.value}
                    </p>
                    {fields.get('header_sub_text')?.value && (
                        <p style={{
                            fontSize: `${inch * (subtitleFontSize / 72)}px`,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
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
                            return <InlineSVG key={`icon-regulatory-${index}`} src={link} width={iconWidth} height={`${iconHeight}%`} />;
                        })}
                    </div>

                    {fields.get('sub_text')?.value && (
                        <p style={{
                            fontSize: `${inch * (subtitleFontSize / 72)}px`,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            marginTop: `-${inch * scale(width, 0.25)}px`,
                            textAlign: 'center',
                            lineHeight: 1.3,
                            letterSpacing: 0
                        }}>
                            {fields.get('sub_text')?.value}
                        </p>
                    )}
                    <div style={{
                        display: "flex",
                        width: '100%',
                        justifyContent: "end",
                        alignItems: "end",
                        justifySelf: "end",
                    }}>
                        <div style={{
                            width: '30%',
                            marginBottom: `${inch * 0.2}px`,
                            alignSelf: 'end'
                        }}>
                            <InlineSVG src={logo} width={'100%'} height="auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FacilitySign;
