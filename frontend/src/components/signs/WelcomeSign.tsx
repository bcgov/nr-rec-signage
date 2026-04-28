import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
import logo from '../../assets/img/RST_logo-White.svg';
import { InlineSVG } from '@/utils/SvgUtils';
import { T } from '~/vitest/dist/chunks/traces.d.402V_yFI';
interface WelcomeSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const WelcomeSign: React.FC<WelcomeSignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize ? 40 : useInchScale(bannerRef, 32);

  const BulletItem = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: `${inch * 0.3}px`,
        marginBottom: `${inch * 0.25}px`,
      }}
    >
      <div
        style={{
          width: `${inch * 0.3}px`,
          height: `${inch * 0.3}px`,
          backgroundColor: 'white',
          marginTop: `${inch * 0.4}px`,
        }}
      />
      <p style={{ width: `calc(100% - ${inch * 0.6}px)`, fontWeight: 'normal', fontSize: `${inch * (66/72)}px`,margin: 0, lineHeight: 1.2 }}>{children}</p>
    </div>
  );

  return (
    <div ref={bannerRef} className="recreation-site-boundary-sign w-50
     d-flex flex-column align-items-center justify-content-center">
        <div className='exportable' style={{
            backgroundColor: '#4E3629',
            width: `${inch * 32}px`,
            height: `${inch * 44}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            paddingTop: `${inch * 1.5}px`,
        }}>
            <p style={{
                width: '50%',
                fontSize: `${inch * (132/72)}px`,
                fontWeight: 'bold',
                lineHeight: 1,
                textAlign: 'center',
                marginBottom: `${inch * 0.75}px`,
            }}>Welcome to your Recreation Site
            </p>
            <div style={{
                height: `${inch * 0.01}px`,
                width: '60%',
                backgroundColor: 'white',
                marginBottom: `${inch * 1}px`,
            }}></div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                 gap: `${inch * 0.5}px`,
                 marginBottom: `${inch * 0.3}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Please Select A Campsite</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        A camping permit fee is required for overnight use
                        of this facility and will be collected by an attendant
                        at your campsite. All applicable taxes are included.
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0.5}px`,
                marginBottom: `${inch * 0.6}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Daily Camping Fee</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.4}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        ${fields.get("daily_camping_fee")?.value} /party
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                 gap: `${inch * 0.5}px`,
                 marginBottom: `${inch * 0.3}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Maximum Party Size</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.4}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        Individuals who together form a group of not more than six persons, or
                      </BulletItem>
                      <BulletItem>
                        Parents or guardians and their unmarried children or wards who are under the age of 19.
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0.5}px`,
                marginBottom: `${inch * 0.3}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Vehicle Policy</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.4}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        Maximum one vehicle per party, unless vehicle is towed.
                      </BulletItem>
                      <BulletItem>
                        Additional vehicles require a payment - 50% of the "Daily Camping Fee."
                      </BulletItem>
                      <BulletItem>
                        All vehicles must be kept on existing roads, parking areas or campsites.
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0.5}px`,
                marginBottom: `${inch * 0.6}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Check Out and Maximum Stay</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.3}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        Check out time is 12 noon.
                      </BulletItem>
                      <BulletItem>
                        Maximum length of stay is 14 consecutive days.
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0.5}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Rules and Quiet Hours</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.4}px`,
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <BulletItem>
                        Rules of conduct are posted or available from campsite attendant.
                      </BulletItem>
                      <BulletItem>
                        Designated quiet time is from 11pm to 7am.
                      </BulletItem>
                    </div>
                </div>
            </div>
            <div style={{
                width: `${inch * 20}px`,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: `${inch * 0.6}px`,
                lineHeight: 0.8
            }}>
                <p style={{
                fontSize: `${inch * (132/72)}px`,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 0.8
            }}>Enjoy Your Stay</p>
            </div>
            <div style={{
                marginTop: `${inch * 1}px`,
                width: `${inch * 12}px`,
            }}>
                <InlineSVG src={logo} width={`${inch * 12}px`} height="auto" />
            </div>
        </div>
    </div>
  );
};

export default WelcomeSign;
