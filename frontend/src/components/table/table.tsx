import { PropsWithChildren } from 'react';

export const Table = (props: PropsWithChildren) => {
  return <table>{props.children}</table>;
};
