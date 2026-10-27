import React from 'react';

interface SignatureBarProps {
  className?: string;
  isLight?: boolean;
}

export const SignatureBar: React.FC<SignatureBarProps> = ({ className = '', isLight = false }) => {
  return (
    <div
      className={`h-[3px] rounded-xs ${isLight ? 'signature-bar-light' : 'signature-bar'} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
};
