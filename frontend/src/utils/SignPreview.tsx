import React from 'react';
import FieldDto from '../interfaces/FieldDto';
import SignDto from '../interfaces/SignDto';
import BladeSign from '../components/signs/BladeSign';
import CautionarySign from '../components/signs/CautionarySign';
import RecreationSiteBoundarySign from '../components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '../components/signs/WelcomeSign';
import InformationSign from '../components/signs/InformationSign';
import NumberPost from '../components/signs/NumberPost';
import RegulatorySign from '../components/signs/RegulatorySign';

export const renderSignPreview = (
  sign: SignDto,
  fields: Map<string, FieldDto>,
  metadata: Map<string, string>
): React.ReactNode => {
  if (!sign) return <div>Unsupported sign type</div>;
  const slug = sign.category.slug.toLowerCase();

  if (slug?.includes('camp-sign-number-post')) {
    return <NumberPost fields={fields} metadata={metadata} />;
  }

  if (slug.includes('regulatory')) {
    return <RegulatorySign fields={fields} metadata={metadata} />;
  }

  if (slug.includes('information')) {
    return <InformationSign fields={fields} metadata={metadata} />;
  }
  if (slug.includes('blade')) {
    return <BladeSign fields={fields} metadata={metadata} />;
  }
  if (slug.includes('cautionary')) {
    return <CautionarySign fields={fields} metadata={metadata} />;
  }
  if (slug.includes('boundary')) {
    return <RecreationSiteBoundarySign fields={fields} metadata={metadata} />;
  }
  if (slug.includes('welcome')) {
    return <WelcomeSign fields={fields} metadata={metadata} />;
  }

  return <div>Unsupported sign type</div>;
};
