import { Link } from 'react-router-dom';
import { Table } from '../table';

export const Links = () => {
  return (
    <>
      <Link to={'/websites '}>⬅️ Go back</Link>
      <Table></Table>
    </>
  );
};
