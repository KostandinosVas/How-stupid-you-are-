import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import questionsData from '@/data/questions.json';

export default function Home() {
  const router = useRouter();
  const dimensionCount = questionsData.dimensions.length;
  const totalQuestions = questionsData.dimensions.reduce(
    (acc, d) => acc + d.questions.length,
    0
  );

  const handleStart = () => {
    localStorage.removeItem('cpa-answers');
    router.push(`/test/${questionsData.dimensions[0].id}`);
  };

  return (
    <MainLayout title="Cognitive Profile App">
      <Head>
        <meta name="description" content="Measure your cognitive profile across 8 dimensions" />
      </Head>
      <Card>
        <h1>Cognitive Profile Test</h1>
        <p>
          This test measures {dimensionCount} cognitive dimensions across {totalQuestions} questions.
          It takes approximately 15–20 minutes.
        </p>
        <br />
        <Button onClick={handleStart}>Start Test</Button>
      </Card>
    </MainLayout>
  );
}