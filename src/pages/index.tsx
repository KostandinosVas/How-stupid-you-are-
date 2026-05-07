import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainLayout from '@/components/Layout/MainLayout';
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

const Hero = styled.div`
  text-align: center;
  padding: 2rem 0 1.5rem;
  animation: fadeInUp 0.4s ease both;
`;

const HeroIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  background: var(--color-primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  font-size: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.75rem;
  letter-spacing: -0.03em;
`;

const HeroSub = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 30rem;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const DimensionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;
  margin-bottom: 2rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const DimensionChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text);
`;

const DimDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-top: 0.125rem;
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background: var(--color-primary);
  color: white;
  font-size: 1.0625rem;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: background var(--transition-base), transform var(--transition-fast), box-shadow var(--transition-base);
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  letter-spacing: -0.01em;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Disclaimer = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 1rem;
`;

const Card = styled.div`
  background: var(--color-surface);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  padding: 2rem 1.75rem;
`;

const DIMENSIONS = [
  { name: 'Logical Reasoning', color: '#4f46e5' },
  { name: 'Numerical Ability', color: '#0ea5e9' },
  { name: 'Verbal Intelligence', color: '#10b981' },
  { name: 'Spatial Intelligence', color: '#f59e0b' },
  { name: 'Memory', color: '#8b5cf6' },
  { name: 'Processing Speed', color: '#ef4444' },
  { name: 'Emotional Intelligence', color: '#ec4899' },
  { name: 'Creativity', color: '#f97316' },
];

export default function Home() {
  const router = useRouter();
  const pool = allQuestions as unknown as Question[];

  const handleStart = () => {
    const session = pickRandom(pool, Math.min(SESSION_SIZE, pool.length));
    localStorage.setItem('cpa-session', JSON.stringify(session));
    localStorage.removeItem('cpa-answers');
    router.push('/test');
  };

  return (
    <MainLayout title="CogniTest">
      <Head>
        <meta name="description" content="Measure your cognitive profile across 8 dimensions" />
      </Head>
      <Hero>
        <HeroIcon>🧠</HeroIcon>
        <HeroTitle>Cognitive Profile Test</HeroTitle>
        <HeroSub>
          Discover your strengths across 8 mental dimensions in {SESSION_SIZE} questions. Takes about 15–20 minutes.
        </HeroSub>

        <StatsRow>
          <Stat>
            <StatValue>{pool.length}</StatValue>
            <StatLabel>Questions in pool</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{SESSION_SIZE}</StatValue>
            <StatLabel>Per session</StatLabel>
          </Stat>
          <Stat>
            <StatValue>8</StatValue>
            <StatLabel>Dimensions</StatLabel>
          </Stat>
        </StatsRow>

        <Card>
          <DimensionGrid>
            {DIMENSIONS.map(d => (
              <DimensionChip key={d.name}>
                <DimDot $color={d.color} />
                {d.name}
              </DimensionChip>
            ))}
          </DimensionGrid>
          <StartButton onClick={handleStart}>
            Start Test →
          </StartButton>
          <Disclaimer>Questions are randomly selected each session</Disclaimer>
        </Card>
      </Hero>
    </MainLayout>
  );
}