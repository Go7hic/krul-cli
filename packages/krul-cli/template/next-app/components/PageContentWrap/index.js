import React from 'react';
import './style.less';

export default function PageContentWrap({ children, className }) {
  return (
    <div className="page-content-wrap">
      <div className={`page-content ${className}`}>
        {children}
      </div>
    </div>
  );
}
