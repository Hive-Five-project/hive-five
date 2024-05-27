interface Props {
  style?: React.CSSProperties
  className?: string
}

export default function AddIcon({ style, className }: Props) {
  return <svg viewBox="0 0 101 100" style={style} className={className}>
    <path d="M26 50H76" strokeWidth="8" strokeLinecap="round"/>
    <path d="M51 25L51 75" strokeWidth="8" strokeLinecap="round"/>
  </svg>
}
  