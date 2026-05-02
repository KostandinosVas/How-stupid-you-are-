import styles from './ResultsTable.module.css';
import { Score } from '@/types';

interface ResultsTableProps {
  scores: Score[];
}

export default function ResultsTable({ scores }: ResultsTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Dimension</th>
          <th>Score</th>
          <th>Percentile</th>
          <th>Interpretation</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <tr key={score.dimension}>
            <td>{score.dimension}</td>
            <td>{score.normalizedScore}</td>
            <td>{score.percentile !== undefined ? `${score.percentile}%` : '—'}</td>
            <td>{score.interpretation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}