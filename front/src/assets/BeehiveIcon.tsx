interface Props {
  style?: React.CSSProperties
  className?: string
}

export default function BeeHiveIcon({ style, className }: Props) {
  return <svg viewBox="0 0 53.5 53.5" style={style} className={className}>
    <path d="M53.5,12.8l-3-12.1C50.4,0.3,50,0,49.5,0H3.6c-0.5,0-0.9,0.3-1,0.8L0,13.3c-0.1,0.6,0.3,1.2,1,1.2h4.3 c0.6,0,1,0.4,1,1V37L4.4,50.9c-0.1,0.6,0.4,1.1,1,1.1l39.2,1.4c0.6,0,1.1-0.5,1-1.1l-1.8-15.2c0-0.1,0-0.2,0-0.3l2.9-21.6 c0.1-0.5,0.4-0.8,0.9-0.9l5-0.4C53.2,14,53.6,13.4,53.5,12.8z M39.6,48.5L11,47.5c-0.6,0-1.1-0.6-0.9-1.2l1.1-5.5 c0.1-0.5,0.5-0.8,1-0.8h26.8c0.5,0,0.9,0.4,1,0.9l0.7,6.5C40.7,48,40.2,48.5,39.6,48.5z M11.3,35V28c0-0.6,0.5-1,1.1-1l26.6,2.4 c0.5,0,0.9,0.5,0.9,1V36c0,0.6-0.5,1-1,1L12.2,36C11.7,36,11.3,35.6,11.3,35z M42.2,16.5L40,26c-0.1,0.5-0.6,0.8-1.1,0.8l-26.8-2.2 c-0.5,0-0.9-0.5-0.9-1v-6.1c0-0.5,0.4-1,1-1l28.9-1.2C41.8,15.2,42.3,15.8,42.2,16.5z M47,9.5L5.5,11c-0.6,0-1.1-0.6-1-1.2l1.1-5.5 c0.1-0.5,0.5-0.8,1-0.8H46c0.5,0,0.9,0.3,1,0.8l1,4C48.1,8.9,47.7,9.5,47,9.5z"/>
    <path d="M26.3,21.7c3.5,0.5,4.3,1.1,4.5,2.6l-10.5-0.6C20.6,22.1,22.8,21.2,26.3,21.7z"/>
    <path d="M26.2,32.6c3,0.3,4.4,1.1,4.7,2.6l-10-0.2C21,33.5,23.1,32.3,26.2,32.6z"/>
    <path d="M26.4,43.5c3.5,0.2,4.3,1.3,4.3,2.8l-9.5-0.6C21.6,44.2,22.9,43.3,26.4,43.5z"/>
  </svg>
}
