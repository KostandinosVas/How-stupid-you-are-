import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import VisualQuestion from '@/components/Question/VisualQuestion';
import TextQuestion from '@/components/Question/TextQuestion';
import Timer from '@/components/Timer/Timer';
import questionsData from '@/data/questions.json';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTimer } from '@/hooks/useTimer';
import { UserAnswer, Question } from '@/types';

export default function TestPage() {
  const router = useRouter();
  const { dimension } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage<UserAnswer[]>('cpa-answers', []);

  const dimensionData = questionsData.dimensions.find((d) => d.id === dimension);
  const allDimensions = questionsData.dimensions.map((d) => d.id);

  const currentQuestion = dimensionData?.questions[currentIndex];
  const timeLimit = currentQuestion?.timeLimit ?? 0;

  const handleNext = () => {
    if (!dimensionData) return;
    const nextIndex = currentIndex + 1;

    if (nextIndex < dimensionData.questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      const currentPos = allDimensions.indexOf(dimensionData.id);
      const nextDimension = allDimensions[currentPos + 1];
      if (nextDimension) {
        router.push(`/test/${nextDimension}`);
      } else {
        router.push('/results');
      }
    }
  };

  const { timeLeft, start, reset } = useTimer(timeLimit, handleNext);

  useEffect(() => {
    if (timeLimit > 0) {
      reset(timeLimit);
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, dimension]);

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;
    const startTime = Date.now();
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        answer: answerId,
        timeTaken: Date.now() - startTime,
      },
    ]);
    setTimeout(handleNext, 500);
  };

  if (!dimensionData || !currentQuestion) {
    return <MainLayout title="Loading..."><p>Loading...</p></MainLayout>;
  }

  const totalQuestions = questionsData.dimensions.reduce((a, d) => a + d.questions.length, 0);
  const answeredSoFar = answers.length;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  return (
    <MainLayout title={dimensionData.name} progress={progress}>
      {timeLimit > 0 && <Timer timeLeft={timeLeft} />}
      {currentQuestion.type === 'visual-multiple-choice' ? (
        <VisualQuestion question={currentQuestion as unknown as Question} onAnswer={handleAnswer} />
      ) : (
        <TextQuestion question={currentQuestion as unknown as Question} onAnswer={handleAnswer} />
      )}
    </MainLayout>
  );
}