import Head from 'next/head';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  progress?: number; // 0-100, omit to hide the bar
}

export default function MainLayout({
  children,
  title = 'Cognitive Profile App',
  progress,
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {progress !== undefined && <ProgressBar progress={progress} />}
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  );
}