import styled from 'styled-components';

const TimerContainer = styled.div<{ $isWarning: boolean }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 1.25rem;
  font-family: monospace;
  color: ${(props) => (props.$isWarning ? '#EF4444' : '#1F2937')};
  background-color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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