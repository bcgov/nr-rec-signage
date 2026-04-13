import React, { useRef } from 'react';
import FieldDto from '../../interfaces/FieldDto';
import { useInchScale } from '@/utils/SignUtils';
interface WelcomeSignProps {
  fields: Map<string, FieldDto>;
  metadata?: Map<string, string>;
  isRealSize?: boolean;
}

const WelcomeSign: React.FC<WelcomeSignProps> = ({ fields, metadata, isRealSize }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inch = isRealSize ? 40 : useInchScale(bannerRef, 32);

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
                gap: `${inch * 0}px`,
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
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >A camping permit fee is required for overnight use
                        of this facility and will be collected by an attendant
                        at your campsite. All applicable taxes are included.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Daily Camping Fee</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >${fields.get("daily_camping_fee")?.value} /party or</li>
                        <li>${fields.get("daily_camping_fee")?.value} /party for seniors 65+ and persons with disabilities.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Maximum Party Size</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >Individuals who together form a group of not more than six persons, or</li>
                        <li>Parents or guardians and their unmarried children or wards who are under the age of 19.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Vehicle Policy</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >Maximum one vehicle per party, unless vehicle is towed.</li>
                        <li>Additional vehicles require a payment - 50% of the "Daily Camping Fee."</li>
                        <li>All vehicles must be kept on existing roads, parking areas or campsites.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Check Out and Maximum Stay</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >Check out time is 12 noon.</li>
                        <li>Maximum length of stay is 14 consecutive days.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                letterSpacing: `-5`,
                lineHeight: 1,
                gap: `${inch * 0}px`,
            }}>
                <p style={{
                    fontSize: `${inch * (72/72)}px`,
                    fontWeight: 'bold',
                    width: '23%'
                }}>Rules and Quiet Hours</p>
                <div style={{
                    width: '77%',
                    fontSize: `${inch * (66/72)}px`,
                    marginBottom: `${inch * 0.25}px`,
                    }}>
                    <ul
                    style={{listStyleType: "square"}}>
                        <li
                        >Rules of conduct are posted or available from campsite attendant.</li>
                        <li>Designated quiet time is from 11pm to 7am.</li>
                    </ul>
                </div>
            </div>
            <div style={{
                width: `${inch * 20}px`,
                fontSize: `${inch * (72/72)}px`,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 0.8
            }}>
                <p>Enjoy Your Stay</p>
            </div>
        </div>
    </div>
  );
};

export default WelcomeSign;
