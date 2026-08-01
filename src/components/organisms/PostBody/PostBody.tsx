import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PostBody({ children, className }: Props) {
  return (
    <div
      className={clsx(
        'prose mx-auto transition-colors dark:prose-invert',
        className
      )}
    >
      {children}
    </div>
  );
}
