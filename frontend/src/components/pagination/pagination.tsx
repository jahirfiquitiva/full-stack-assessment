import styles from './pagination.module.css';

interface PaginationProps {
  pagesCount: number;
  currentPage: number;
  setCurrentPage?: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { pagesCount, currentPage, setCurrentPage } = props;
  if (pagesCount <= 1) return null;
  return (
    <div className={styles.paginationButtonsContainer}>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage?.(currentPage - 1);
        }}
      >
        Previous
      </button>
      {Array.from(Array(pagesCount).keys()).map((_, index) => {
        return (
          <button
            className={currentPage === index + 1 ? styles.active : undefined}
            disabled={currentPage === index + 1}
            onClick={() => {
              setCurrentPage?.(index + 1);
            }}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        disabled={currentPage === pagesCount}
        onClick={() => {
          setCurrentPage?.(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
