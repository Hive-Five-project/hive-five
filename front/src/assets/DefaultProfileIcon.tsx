interface Props {
  style?: React.CSSProperties
  className?: string
}

<<<<<<< HEAD
export default function LogoPlain({ style, className }: Props) {
  return <svg viewBox="0 0 104 105" fill="none" style={style} className={className}>
=======
export default function LogoPlain(props: Props) {
  return <svg viewBox="0 0 104 105" fill="none" style={props.style} className={props.className}>
>>>>>>> bb86e329af1e40c9175aacf3504b008ffde56f06
    <path d="M5.125 23.125H16.375M98.875 23.125H87.625M25.75 23.125C25.75 16.0938 33.25 4.375 52 4.375C70.75 4.375 78.25 16.0938 78.25 23.125M25.75 23.125H16.375M25.75 23.125H33.25M78.25 23.125H87.625M78.25 23.125H70.75M16.375 23.125V51.25C16.375 51.25 19.3768 71.875 52 71.875M87.625 23.125V51.25C87.625 51.25 84.6232 71.875 52 71.875M18.25 100C18.25 87.3438 19.3768 71.875 52 71.875M52 71.875C84.6232 71.875 85.75 87.3438 85.75 100M52 71.875V100M33.25 23.125V51.25C33.25 51.25 40.75 56.875 52 56.875C63.25 56.875 70.75 51.25 70.75 51.25V23.125M33.25 23.125H70.75" stroke="black" strokeWidth="8.4375" strokeLinecap="round"/>
  </svg>
}
