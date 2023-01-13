import Head from 'next/head';
import { ReactNode } from 'react';
type headerProps = {
  title: string;
  description: string;
  canonicalUrl?: string;
  children?: ReactNode;
};
const HeadSeo: React.FC<headerProps> = ({
  title,
  description,
  canonicalUrl,
  children,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {children}
    </Head>
  );
};

export default HeadSeo;
