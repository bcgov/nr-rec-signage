import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSignService } from '../service/signService';
import { toDictionaryMap } from '../utils/SignUtils';
import FieldConfiguration from '../components/signs/FieldConfiguration';
import RefreshPage from '../components/RefreshPage';
import SignDto from '../interfaces/SignDto';
import FieldDto from '../interfaces/FieldDto';
import BladeSign from '@/components/signs/BladeSign';
import CautionarySign from '@/components/signs/CautionarySign';
import RecreationSiteBoundarySign from '@/components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '@/components/signs/WelcomeSign';
import RegulatorySign from '@/components/signs/RegulatorySign';
import InformationSign from '@/components/signs/InformationSign';
import NumberPost from '@/components/signs/NumberPost';

const SignConfiguration: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [signDetails, setSignDetails] = useState<SignDto | null>(null);
  const [fields, setFields] = useState<Map<string, FieldDto>>(new Map());
  const [metadata, setMetadata] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const { getSign } = useSignService();

  useEffect(() => {
    const fetchSign = async () => {
      try {
        const sign = await getSign(Number(id));
        setSignDetails(sign);
        const fieldMap = toDictionaryMap(sign.fields);
        setFields(fieldMap);

        const metadataMap = new Map<string, string>();
        sign.category.metadata.forEach((meta) => {
          metadataMap.set(meta.meta_key, meta.meta_value);
        });
        setMetadata(metadataMap);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching sign:', err);
        if (err instanceof Error && err.message.includes('404')) {
          setError('This Sign does not exist');
        } else {
          setError('Failed to load sign');
        }
        setLoading(false);
      }
    };
    fetchSign();
  }, [id]);

  const update = (fieldName: string, value: any) => {
    setFields((prevFields) => {
      const newFields = new Map(prevFields);
      const field = newFields.get(fieldName);
      if (field) {
        field.value = value;
      }
      return newFields;
    });
  };

  const renderPreview = () => {
    if (!signDetails) return null;
    const slug = signDetails.category.slug?.toLowerCase();

    if(slug?.includes('camp-sign-number-post')) {
      return <NumberPost fields={fields} metadata={metadata} />;
    }

    if(slug?.includes('regulatory')) {
      return <RegulatorySign fields={fields} metadata={metadata} />;
    }

    if(slug?.includes('information')) {
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

    return <div>Preview not available for this sign type</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error === 'This Sign does not exist') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>This Sign does not exist</p>
        <button>Go Back</button>
      </div>
    );
  }

  if (error) {
    return <RefreshPage />;
  }

  return (
    <div className='centered-l-container d-flex gx-120 '>
      <div style={{ flex: 1 }}>
        {signDetails && (
          <FieldConfiguration
            update={update}
            fields={fields}
            category={signDetails.category}
            signId={id}
            idOptions={signDetails.id_options}
          />
        )}
      </div>
      <div style={{ flex: 1 }} className="d-flex flex-column align-items-center justify-content-center">
        <p className="mb-3">Preview</p>
        {renderPreview()}
      </div>
    </div>
  );
};

export default SignConfiguration;
