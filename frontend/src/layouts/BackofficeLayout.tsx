import React from 'react';

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

const BackofficeLayout: React.FC<BackofficeLayoutProps> = ({ children }) => {
  return (
    <div className="backoffice-layout">
      <aside className="sidebar">
        <div className="logo">Logo</div>
        <nav>
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            {/* Add more menu items */}
          </ul>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default BackofficeLayout;
