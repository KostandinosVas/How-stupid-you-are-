import styled from 'styled-components';

const TimerContainer = styled.div<{ $isWarning: boolean }>`
  position: fixed;
  top: calc(var(--header-height, 4rem) + 0.75rem);
  right: 1rem;
  font-size: 0.875rem;
  font-family: var(--font-family);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${(props) => (props.$isWarning ? '#ef4444' : 'var(--color-text)')};
  background: ${(props) => (props.$isWarning ? '#fef2f2' : 'var(--color-surface)')};
  border: 1.5px solid ${(props) => (props.$isWarning ? '#fca5a5' : 'var(--color-border)')};
  padding: 0.3rem 0.7rem;
  border-radius: var(--border-radius-full);
  box-shadow: var(--shadow-sm);
  z-index: 300;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
`;

export default function Timer({ timeLeft }: { timeLeft: number }) {
  const isWarning = timeLeft < 10;
  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

  return (
    <TimerContainer $isWarning={isWarning}>
      {formattedTime}
    </TimerContainer>
  );
}