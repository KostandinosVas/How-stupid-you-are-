import { useRouter } from 'next/router';
import MainLayout from '@/components/Layout/MainLayout';
import CognitiveRadarChart from '@/components/Results/RadarChart';
import ResultsTable from '@/components/Results/ResultsTable';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import questionsData from '@/data/questions.json';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { buildScore } from '@/utils/scoring';
import { UserAnswer, Score, Question } from '@/types';

export default function ResultsPage() {
  const router = useRouter();
  const [answers] = useLocalStorage<UserAnswer[]>('cpa-answers', []);

  const scores: Score[] = questionsData.dimensions.map((dimension) =>
    buildScore(dimension.name, dimension.questions as unknown as Question[], answers)
  );

  const handleRetake = () => {
    localStorage.removeItem('cpa-answers');
    router.push('/');
  };

  return (
    <MainLayout title="Your Results" progress={100}>
      <Card>
        <h1>Your Cognitive Profile</h1>
        <CognitiveRadarChart scores={scores} />
        <ResultsTable scores={scores} />
        <br />
        <Button variant="secondary" onClick={handleRetake}>
          Retake Test
        </Button>
      </Card>
    </MainLayout>
  );
}