import clsx from 'clsx';

interface Props {
  iconClassName?: string | null
  children: React.ReactElement
}

export default function InputWrap({ iconClassName = null, children }: Props) {
  if (iconClassName === null) {
    return children;
  }

  return <div className={clsx('input-wrap', iconClassName)}>
    {children}
  </div>;
}
