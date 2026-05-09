import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainLayout from '@/components/Layout/MainLayout';
import TextQuestion from '@/components/Question/TextQuestion';
import Timer from '@/components/Timer/Timer';
import { useTimer } from '@/hooks/useTimer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Question, UserAnswer } from '@/types';

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DimBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--border-radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const CounterText = styled.span`
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-weight: 500;
`;

export default function TestPage() {
  const router = useRouter();
  const [session, setSession] = useState<Question[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage<UserAnswer[]>('cpa-answers', []);

  useEffect(() => {
    const raw = localStorage.getItem('cpa-session');
    if (!raw) {
      router.replace('/');
      return;
    }
    setSession(JSON.parse(raw) as Question[]);
  }, [router]);

  const currentQuestion = session?.[currentIndex] ?? null;
  const timeLimit = currentQuestion?.timeLimit ?? 0;
  const total = session?.length ?? 0;
  const remaining = total - currentIndex - 1;
  const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < (session?.length ?? 0)) {
      setCurrentIndex(nextIndex);
    } else {
      router.push('/results');
    }
  };

  const { timeLeft, start, pause, reset } = useTimer(timeLimit, handleNext);

  useEffect(() => {
    if (!session) return;
    if (timeLimit > 0) {
      reset(timeLimit);
      start();
    } else {
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, session]);

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;
    const timeTaken = timeLimit > 0 ? (timeLimit - timeLeft) * 1000 : 0;
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, answer: answerId, timeTaken },
    ]);
    setTimeout(handleNext, 600);
  };

  if (!session || !currentQuestion) {
    return <MainLayout title="Loading…"><p>Loading…</p></MainLayout>;
  }

  return (
    <MainLayout title={currentQuestion.dimensionName} progress={progress}>
      {timeLimit > 0 && <Timer timeLeft={timeLeft} totalTime={timeLimit} />}
      <MetaBar>
        <DimBadge>{currentQuestion.dimensionName}</DimBadge>
        <CounterText>
          {currentIndex + 1} / {total} &nbsp;·&nbsp; {remaining} left
        </CounterText>
      </MetaBar>
      <TextQuestion
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </MainLayout>
  );
}
