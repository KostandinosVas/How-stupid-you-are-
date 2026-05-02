import styled from 'styled-components';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Score } from '@/types';

interface CognitiveRadarChartProps {
  scores: Score[];
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
`;

export default function CognitiveRadarChart({ scores }: CognitiveRadarChartProps) {
  const data = scores.map((s) => ({
    subject: s.dimension,
    score: s.normalizedScore,
    fullMark: 100,
  }));

  return (
    <ChartContainer>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}