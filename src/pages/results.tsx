import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import CognitiveRadarChart from '@/components/Results/RadarChart';
import ResultsTable from '@/components/Results/ResultsTable';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { buildScore } from '@/utils/scoring';
import { UserAnswer, Score, Question } from '@/types';

const DIM_ORDER = [
  'logical-reasoning',
  'numerical-ability',
  'verbal-intelligence',
  'spatial-intelligence',
  'memory',
  'processing-speed',
  'emotional-intelligence',
  'creativity',
];

export default function ResultsPage() {
  const router = useRouter();
  const [answers] = useLocalStorage<UserAnswer[]>('cpa-answers', []);
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cpa-session');
    if (!raw) { router.replace('/'); return; }
    const session = JSON.parse(raw) as Question[];

    const computed = DIM_ORDER.map(dimId => {
      const dimQuestions = session.filter(q => q.dimension === dimId);
      const dimName = dimQuestions[0]?.dimensionName ?? dimId;
      return buildScore(dimName, dimQuestions, answers);
    }).filter(s => s.rawScore >= 0);

    setScores(computed);
  }, [answers, router]);

  const handleRetake = () => {
    localStorage.removeItem('cpa-answers');
    localStorage.removeItem('cpa-session');
    router.push('/');
  };

  return (
    <MainLayout title="Your Results" progress={100}>
      <Card>
        <h1>Your Cognitive Profile</h1>
        {scores.length > 0 && (
          <>
            <CognitiveRadarChart scores={scores} />
            <ResultsTable scores={scores} />
          </>
        )}
        <br />
        <Button variant="secondary" onClick={handleRetake}>
          Retake Test
        </Button>
      </Card>
    </MainLayout>
  );
}