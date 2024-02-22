interface Props {
  style?: React.CSSProperties
  className?: string
}

<<<<<<< HEAD
export default function LogoPlain({ style, className }: Props) {
  return <svg viewBox="0 0 549 755" style={style} className={className}>
=======
export default function LogoPlain(props: Props) {
  return <svg viewBox="0 0 549 755" style={props.style} className={props.className}>
>>>>>>> bb86e329af1e40c9175aacf3504b008ffde56f06
    <image transform="matrix(0.7654 0 0 0.7654 -88 -49)">
    </image>
    <path d="M404,179c-12.5-22.4-70-45.2-105-38c-33.8,7-60.1,63.8-63,110c-1,16,6,23,17,31c31.2,22.7,53.5,15.7,71,4c30-20,35-42,53-55
        C396.8,216.7,418,204,404,179z"/>
    <g>
      <path d="M469.3,201.2c2.2-5.8,5.6-10.8,9.9-15.1c1.1-1.1,2.1-2.1,3.3-3.1l1.8-1.4c0.6-0.5,1.2-0.9,1.9-1.3l1.9-1.3l2-1.2 c0.7-0.4,1.3-0.8,2-1.1c0.7-0.3,1.4-0.6,2.1-1c5.6-2.6,11.7-4.1,17.8-4.6c6.1-0.5,12.3,0.4,17.6,3.5c2.5,1.4,3.3,4.6,1.9,7.1 c-0.7,1.3-1.9,2.1-3.2,2.4l-0.8,0.2c-2.7,0.6-5.1,0.4-7.5,0.7c-2.4,0-4.7,0.1-7.1,0c-4.7,0.3-9.3,1.1-13.7,2.7l-1.7,0.6 c-0.5,0.2-1.1,0.5-1.6,0.7l-1.6,0.7l-1.6,0.8c-0.5,0.3-1.1,0.6-1.6,0.9l-1.5,1c-1,0.6-2,1.3-3,2c-1.9,1.4-3.7,3.1-5.4,4.8 c-1.7,1.7-3.2,3.6-4.6,5.5l-0.2,0.2c-1.3,1.8-3.8,2.3-5.7,1C469.3,204.9,468.7,202.9,469.3,201.2z"/>
    </g>
    <g>
      <path d="M490.2,217.7c5.5-2.2,11.5-3,17.5-2.7c6,0.3,11.9,1.8,17.5,4.4c5.6,2.6,10.6,6.2,15,10.5c1,1.1,2.1,2.2,3,3.4 c0.5,0.6,0.9,1.2,1.3,1.8c0.4,0.6,0.8,1.3,1.2,1.9c0.4,0.7,0.7,1.3,1,2c0.3,0.7,0.5,1.4,0.8,2.1c0.4,1.4,0.8,2.9,0.9,4.5 c0.2,3-2,5.5-5,5.7c-1.1,0.1-2.2-0.2-3.1-0.7l-0.7-0.4c-2.5-1.4-4-3.3-5.8-4.9c-0.4-0.4-0.8-0.9-1.2-1.3c-0.2-0.2-0.4-0.4-0.6-0.7 c-0.2-0.2-0.4-0.4-0.6-0.6c-0.8-0.9-1.5-1.7-2.2-2.7c-3.1-3.4-6.5-6.4-10.4-8.8c-3.9-2.4-8.2-4.2-12.8-5.5c-2.3-0.6-4.7-1-7.1-1.3 c-2.4-0.3-4.8-0.3-7.3-0.3l-0.2,0c-1.9,0.1-3.5-1.4-3.5-3.3C488,219.5,488.9,218.2,490.2,217.7z"/>
    </g>
    <path d="M180,156C82,184-17.4,277.5,44,390c18,33,52-38.6,83-74c28-32,51.7-32.7,70-46s29.4-73.1,32.4-96 C232.6,149.1,214.1,146.3,180,156z"/>
    <path d="M447.8,216.1c-20.8-1.8-70.8,22.7-74.4,56.7c-3.2,29.6,17.1,80.4,41.5,83.9c31.7,4.5,57-45.8,64.7-70.3 C490.5,251.2,474.6,218.4,447.8,216.1z"/>
    <path d="M319,115C326,101,154.9-0.4,126.5-0.2S88,30,93,44s113,79,134,80S313.9,125.2,319,115z"/>
    <path d="M187,129c0,6-66,33-88,42c-17.1,7-79,0-88-8s-21-50,5-63S187,121.7,187,129z"/>
    <g>
      <path d="M160.3,307.4c1.2,0.5,2.1,0.9,3,1.5c1,0.5,1.8,1.1,2.8,1.6c1.8,1.2,3.5,2.4,5.1,3.9c3.3,2.8,6.2,6.2,8.7,10.2 c2.4,4,4.2,8.7,4.6,13.9c0.1,0.7,0.1,1.3,0.1,1.9c0,0.6,0,1.2,0,1.7c0,1.1-0.1,2.2-0.2,3.3c-0.2,2.1-0.5,4.2-0.9,6.2 c-0.7,4-1.6,7.9-2.5,11.7c-0.9,3.8-1.9,7.7-2.9,11.4c-2,7.6-4.3,15-6.8,22.4c-0.6,1.8-2.5,2.7-4.3,2.1c-1.6-0.5-2.5-2.1-2.2-3.7 l0,0c1.1-7.6,2.2-15.2,3.1-22.8c0.9-7.6,1.7-15.2,1.8-22.6c0-1.8,0-3.6,0-5.4l-0.1-2.5c0-0.4-0.1-0.8-0.1-1.2c0-0.4-0.1-0.7-0.1-1 c-0.4-2.5-1.3-5.2-2.7-7.9c-1.4-2.7-3.3-5.5-5.3-8.2c-1-1.4-2.1-2.7-3.2-4.1l-1.7-2.1l-0.9-1c-0.3-0.3-0.6-0.7-0.8-1l-0.7-1.1 c-1.5-2.4-0.7-5.4,1.6-6.9C157.1,306.8,158.9,306.7,160.3,307.4z"/>
    </g>
    <g>
      <path d="M232,299.3c0.5,0.7,0.9,1.3,1.3,2c0.4,0.6,0.8,1.3,1.1,1.9c0.7,1.3,1.4,2.7,2,4c1.2,2.8,2.2,5.6,2.9,8.7 c0.7,3.1,1.1,6.3,1,9.8c-0.1,3.4-0.8,7.2-2.6,10.8c-1.5,2.7-3.3,5.2-5.2,7.5c-1.9,2.3-3.8,4.5-5.8,6.6c-2,2.1-4,4.1-6.2,6 c-2.2,1.9-4.3,3.7-6.8,5.4c-1.5,1.1-3.6,0.7-4.7-0.8c-0.9-1.2-0.8-2.9,0.1-4l0.1-0.1c1.6-2,3.2-4.2,4.8-6.4c1.5-2.2,3-4.4,4.4-6.6 c1.4-2.2,2.7-4.5,3.8-6.8l0.8-1.7c0.3-0.6,0.5-1.2,0.8-1.7c0.3-0.6,0.5-1.1,0.8-1.7l0.7-1.7c0.3-0.7,0.5-1.5,0.7-2.4 c0.2-0.9,0.3-1.8,0.3-2.9c0.1-2.1-0.1-4.3-0.4-6.7c-0.3-2.4-0.8-4.8-1.3-7.3l-1.7-7.4l-0.1-0.4c-0.6-2.7,1.1-5.4,3.8-6 C228.8,296.8,230.8,297.6,232,299.3z"/>
    </g>
    <g>
      <path d="M304.1,316c0.3,0.7,0.6,1.2,0.9,1.8c0.3,0.6,0.5,1.2,0.7,1.7c0.4,1.2,0.8,2.4,1.2,3.6c0.6,2.4,1.1,5,1.2,7.7 c0.1,2.7-0.1,5.5-0.9,8.6c-0.4,1.5-1.1,3.1-2,4.6l-0.8,1.1c-0.3,0.4-0.6,0.7-0.9,1.1c-0.2,0.2-0.3,0.3-0.4,0.4l-0.4,0.3l-0.7,0.7 c-1.9,1.8-4,3.2-6.1,4.6c-2.1,1.3-4.1,2.6-6.2,3.8c-4.1,2.4-8.3,4.5-12.7,6.3c-1.7,0.7-3.7-0.1-4.4-1.8c-0.6-1.5-0.1-3.1,1.1-4 l0.1-0.1c3.5-2.5,7.1-5.3,10.3-8.2c3.3-2.8,6.1-6.1,8.4-9.3l0.4-0.6l0.2-0.3c0.1-0.1,0.2-0.2,0.2-0.2c0-0.1,0.1-0.2,0.1-0.2 c0-0.1,0.1-0.2,0.1-0.3c0.2-0.4,0.4-1,0.6-1.6c0.4-1.3,0.6-3,0.6-4.8c0.1-1.8,0-3.8,0-5.8l-0.1-3.1l-0.1-1.6c0-0.5-0.1-1.1,0-1.5 l0-1c0.1-2.8,2.5-4.9,5.3-4.8C301.7,313.4,303.3,314.5,304.1,316z"/>
    </g>
    <g>
      <path d="M76.5,421.8c32.3,24.5,64,49.7,95.5,75.3l11.8,9.6l2.9,2.4l1.4,1.2c0.3,0.2,0.6,0.5,1,0.7c1.3,0.9,2.7,1.6,4.2,2 c1.5,0.5,3.1,0.7,4.6,0.7c0.4,0,0.8,0,1.2-0.1c0.2,0,0.4,0,0.6-0.1l0.6-0.1l3.8-0.5l15-2.2c20-3,40.1-5.7,60.1-8.6 c10-1.4,20.1-2.8,30.1-4.1l30.1-4l30.1-3.8l15.1-1.9l3.8-0.5l1.9-0.2l0.5-0.1l0.2,0l0.1,0l0.5-0.1c1.4-0.2,2.7-0.7,3.9-1.4 c2.4-1.4,4.3-3.7,5.3-6.4c0.1-0.4,0.2-0.7,0.3-1.1l0.4-1.8l0.9-3.7l1.8-7.4c2.4-9.8,4.7-19.7,7.3-29.5c4.9-19.7,10-39.3,15.6-58.8 c0.8-2.9,3.9-4.6,6.8-3.8c2.7,0.8,4.3,3.4,3.9,6.1c-3.1,20.1-6.6,40-10.3,59.9c-1.8,10-3.8,19.9-5.7,29.8l-1.5,7.4l-0.8,3.7 l-0.4,1.9c-0.2,0.8-0.4,1.8-0.7,2.6c-2.1,7-6.8,13.2-13,17.1c-3.1,1.9-6.6,3.3-10.2,4l-1.4,0.2l-0.6,0.1l-0.5,0.1l-1.9,0.3 l-3.8,0.5l-15,2.2l-30.1,4.4l-30.1,4.2c-10,1.4-20.1,2.8-30.1,4.1c-20.1,2.7-40.1,5.3-60.2,7.8l-15.1,1.9l-3.8,0.5l-1.2,0.1 c-0.4,0-0.9,0.1-1.3,0.1c-0.9,0.1-1.8,0.1-2.6,0.1c-3.5-0.1-7-0.6-10.3-1.8c-3.3-1.1-6.5-2.7-9.3-4.7c-0.7-0.5-1.4-1.1-2.1-1.6 l-1.5-1.3l-2.9-2.5l-11.5-9.9c-30.6-26.5-61-53.3-90.8-80.9c-2.2-2.1-2.4-5.6-0.3-7.8C71.1,420.3,74.3,420.1,76.5,421.8z"/>
    </g>
    <path d="M173.1,555.6L69.8,466c-2.3-2-5.8-0.4-5.8,2.6v64.2c0,1.4,0.6,2.7,1.6,3.7l107.2,99.2c7.7,7.1,18.2,10.4,28.6,9l209.3-29.1 c2.5-0.3,4.3-2.5,4.3-5v-69.9c0-3-2.7-5.4-5.7-5l-208.7,28.1C190.7,565.2,180.6,562.2,173.1,555.6z"/>
    <path d="M171.6,665.5L68.3,565.9c-2.3-2-5.8-0.4-5.8,2.6v64.2c0,1.4,0.6,2.7,1.6,3.7l107.2,109.2c7.7,7.1,18.2,10.4,28.6,9 l211.3-29.1c2.5-0.3,4.3-2.5,4.3-5v-69.9c0-3-2.7-5.4-5.7-5l-210.7,28.1C189.2,675.1,179.1,672.1,171.6,665.5z"/>
  </svg>
}
