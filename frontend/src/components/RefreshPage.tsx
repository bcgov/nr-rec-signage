import React from 'react';

const RefreshPage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>Something went wrong. Please refresh the page. If the problem persists, contact your administrator.</p>
      <button onClick={handleRefresh}>Refresh page</button>
    </div>
  );
};

export default RefreshPage;
