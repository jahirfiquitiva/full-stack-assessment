import type { PropsWithChildren } from 'react';
import styles from './table.module.css';

export const Table = (props: PropsWithChildren) => {
  return (
    <div className={styles.tableContainer}>
      <table>{props.children}</table>
    </div>
  );
};
