import { Ring } from '@uiball/loaders';

interface LoadingProps {
  text?: string;
}

export const Loading = (props: LoadingProps) => {
  const { text } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        gap: '0.5rem',
      }}
    >
      <Ring size={40} lineWeight={5} speed={2} color={'var(--nc-lk-1)'} />
      <small>{text || 'Loading…'}</small>
    </div>
  );
};
