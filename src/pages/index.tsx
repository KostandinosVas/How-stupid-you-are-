import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import allQuestions from '@/data/questions.json';
import { Question } from '@/types';

const SESSION_SIZE = 90;

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function Home() {
  const router = useRouter();
  const pool = allQuestions as unknown as Question[];
  const totalInPool = pool.length;

  const handleStart = () => {
    const session = pickRandom(pool, Math.min(SESSION_SIZE, totalInPool));
    localStorage.setItem('cpa-session', JSON.stringify(session));
    localStorage.removeItem('cpa-answers');
    router.push('/test');
  };

  return (
    <MainLayout title="Cognitive Profile App">
      <Head>
        <meta name="description" content="Measure your cognitive profile across 8 dimensions" />
      </Head>
      <Card>
        <h1>Cognitive Profile Test</h1>
        <p>
          This test measures 8 cognitive dimensions across {SESSION_SIZE} randomly selected questions.
          It takes approximately 15–20 minutes.
        </p>
        <br />
        <Button onClick={handleStart}>Start Test</Button>
      </Card>
    </MainLayout>
  );
}