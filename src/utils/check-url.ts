import { validate } from 'uuid';

interface checkURLProps {
  URL: string;
  correctPattern: string[];
  id: boolean;
}

export const checkURL = ({ URL, correctPattern, id }: checkURLProps) => {
  const ArrayWithPath = URL.split('/').filter((item) => item !== '');
  const comparison = JSON.stringify(ArrayWithPath) === JSON.stringify(correctPattern);
  if (id) {
    const comparisonID = validate(ArrayWithPath.slice(-1)[0]);
    const URLWithoutID = ArrayWithPath.slice(0, -1);
    const comparison = JSON.stringify(URLWithoutID) === JSON.stringify(correctPattern);
    return comparison && comparisonID;
  }
  return comparison;
};
