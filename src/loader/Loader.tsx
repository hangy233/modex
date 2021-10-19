import React from 'react';

type LoaderProps = {
  value: any;
  fallback: React.ReactNode;
  children: React.ReactNode;
};

const Loader = ({value, fallback, children}: LoaderProps): JSX.Element => {
  if (value === undefined || value.length === 0) return <>{fallback}</>;

  return <>{children}</>;
}

export default Loader;
