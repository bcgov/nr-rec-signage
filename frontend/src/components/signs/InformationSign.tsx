import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
import logo from '../../assets/img/RST_logo-blue.svg';
import { ReactSVG } from 'react-svg';
import { getIconHeight, getIconWidth } from '@/utils/ImageUtils';
import { InlineSVG } from '@/utils/SvgUtils';
interface InformationSignProps {
  fields: Map<string, FieldDto>;
  metadata: Map<string, string>;
 isRealSize?: boolean;
}

const InformationSign: React.FC<InformationSignProps> = ({fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const pictogramCount = fields.get('main_pictogram')?.value ? fields.get('main_pictogram')?.value.split(";").length : 0;
  const partnershipLogoCount = fields.get('partnership_logos')?.value ? fields.get('partnership_logos')?.value.split(";").length : 0;
  const inch = isRealSize ? 40: useInchScale(bannerRef, metadata.get('width') ? parseFloat(metadata.get('width')!) : 16);
  const titleFontSize = metadata.get('title_font_size') ? parseFloat(metadata.get('title_font_size')!) : 104;
  const subtitleFontSize = metadata.get('subtitle_font_size') ? parseFloat(metadata.get('subtitle_font_size')!) : 44;
  const iconWidth = getIconWidth(pictogramCount);
  const iconHeight = getIconHeight(pictogramCount);
  const containerWidth = parseFloat(metadata.get('width') || "16");
  const partnershipLogoWidth = partnershipLogoCount > 2 ? `${100 / partnershipLogoCount - 5}%` : partnershipLogoCount === 2 ? '45%' : '100%';
  const width = metadata.get('width') ? parseFloat(metadata.get('width')!) : 16;
  const scale = (width: number, value: number) =>{
    return width * value / 16;
  }
  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-80
     d-flex flex-column align-items-center justify-content-center">
        <div className="exportable" style={{
            backgroundColor: '#FFFFFF',
            width: `${inch * parseFloat(metadata.get('width') || "16")}px`,
            borderRadius: `${inch * (width / 32)}px`,
            height: `${inch * parseFloat(metadata.get('height') || "16")}px`,
            aspectRatio: `${metadata.get('width')} / ${metadata.get('height')}`,
            color: '#2D2926'
        }}>
            <div style={{
                borderRadius: `${inch * scale(width, 0.5)}px`,
                marginTop: `${inch * (parseFloat(metadata.get('width') || "16") * 0.025)}px`,
                marginLeft: `${inch * (parseFloat(metadata.get('width') || "16") * 0.025)}px`,
                width: `${inch * (parseFloat(metadata.get('width') || "16") * 0.95)}px`,
                height: `${inch * (parseFloat(metadata.get('height') || "16") - (containerWidth * 0.025 * 2))}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1D252C'
            }}>
                <div style={{
                    backgroundColor: '#FFF',
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
                    color: '#1D252C',
                    gap: `${inch * scale(width, 0.5)}px`
                }}>
                    <p style={{
                        fontSize: `${inch * (titleFontSize / 72)}px`,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
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
                        position: 'relative',
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: `${inch * scale(width, 0.05)}px`
                    }}>
                        {fields.get('main_pictogram')?.value?.split(";").map((link: string, index: number) => {
                            return <InlineSVG key={`icon-information-${index}`} src={link} width={iconWidth} height={`${iconHeight}%`} />;
                        })}
                    </div>

                    {fields.get('header_sub_text')?.value && (
                        <p style={{
                            fontSize: `${inch * (subtitleFontSize / 72)}px`,
                            fontWeight: 'bold',
                            marginTop: `-${inch * scale(width, 0.25)}px`,
                            textAlign: 'center',
                            lineHeight: 1.3,
                            letterSpacing: 0
                        }}>
                            {fields.get('sub_text')?.value}
                        </p>
                    )}
                    <div style={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "space-between",
                        justifySelf: "end",
                    }}>
                        <div style={{
                            width: '40%',
                            display: 'flex',
                            gap: `${inch * scale(width, 0.05)}px`
                        }}>
                            {fields.get('partnership_logos')?.value?.split(";").map((link: string, index: number) => {
                                return <InlineSVG key={`icon-logos-${index}`} width={partnershipLogoWidth} src={link} height="auto" />;
                            })}
                        </div>
                        <div style={{
                            width: '30%',
                            marginBottom: `${inch * 0.2}px`,
                            alignSelf: 'end'
                        }}>
                            <InlineSVG src={logo} width="100%" height="100%"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InformationSign;
