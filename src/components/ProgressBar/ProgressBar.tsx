import styled from 'styled-components';

interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #E5E7EB;
  z-index: 1000;
`;

const ProgressBarFill = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #3B82F6;
  transition: width 0.3s ease;
`;

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
    </ProgressBarContainer>
  );
}