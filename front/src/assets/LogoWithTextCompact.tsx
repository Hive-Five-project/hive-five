interface Props {
  style?: React.CSSProperties
  className?: string
}

<<<<<<< HEAD
export default function LogoWithTextCompact({ style, className }: Props) {
  return <svg viewBox="0 0 1421.41 755.17" style={style} className={className}>
=======
export default function LogoWithTextCompact(props: Props) {
  return <svg viewBox="0 0 1421.41 755.17" style={props.style} className={props.className}>
>>>>>>> bb86e329af1e40c9175aacf3504b008ffde56f06
    <path d="M404,179c-12.53-22.37-70-45.21-105-38-33.84,7-60.11,63.82-63,110-1,16,6,23,17,31,31.23,22.72,53.52,15.65,71,4,30-20,35-42,53-55C396.79,216.71,418,204,404,179Zm-49,44c-34.51,41.41-44.71,55.6-73.11,42C261,255,263.62,240.89,279,205c12-28,25.75-34.22,40-36,16-2,55.23,1.27,63,22C385,199,370,205,355,223Z" transform="translate(-0.25 0.22)"/>
    <path d="M469.33,201.25A46.62,46.62,0,0,1,482.55,183l1.76-1.45c.61-.46,1.24-.88,1.87-1.32l1.88-1.3,2-1.16c.66-.39,1.34-.75,2-1.13s1.4-.64,2.1-.95A52.86,52.86,0,0,1,512,171.14c6.12-.48,12.34.42,17.63,3.52a5.17,5.17,0,0,1-1.38,9.49l-.8.19c-2.69.65-5.12.44-7.54.67-2.4,0-4.73.09-7.09,0a48.3,48.3,0,0,0-13.68,2.66l-1.66.6c-.53.24-1.06.5-1.6.73l-1.62.71-1.56.85c-.51.28-1.05.55-1.56.85l-1.49,1a31.56,31.56,0,0,0-2.95,2,48.24,48.24,0,0,0-5.43,4.78,45.58,45.58,0,0,0-4.56,5.52l-.17.24a4.08,4.08,0,0,1-7.17-3.74Z" transform="translate(-0.25 0.22)"/>
    <path d="M490.21,217.71a41.24,41.24,0,0,1,17.47-2.65,47.83,47.83,0,0,1,17.49,4.36,52.56,52.56,0,0,1,15,10.47c1,1.11,2.06,2.23,3,3.39a12.38,12.38,0,0,1,1.32,1.84c.41.63.78,1.28,1.15,1.94s.72,1.32,1,2a19.22,19.22,0,0,1,.76,2.13,20.24,20.24,0,0,1,.91,4.48,5.36,5.36,0,0,1-5,5.74,5.29,5.29,0,0,1-3.08-.71l-.65-.37c-2.49-1.45-4-3.33-5.78-4.94-.41-.43-.81-.85-1.18-1.3-.19-.23-.39-.45-.56-.68s-.39-.42-.59-.63c-.77-.86-1.49-1.75-2.21-2.66a48.93,48.93,0,0,0-10.43-8.77,47.2,47.2,0,0,0-12.79-5.46,50,50,0,0,0-7.06-1.33,53.32,53.32,0,0,0-7.27-.27h-.23a3.41,3.41,0,0,1-1.35-6.58Z" transform="translate(-0.25 0.22)"/>
    <path d="M180,156C82,184-17.36,277.51,44,390c18,33,52-38.62,83-74,28-32,51.74-32.74,70-46s29.42-73.12,32.39-96C232.61,149.14,214.08,146.26,180,156ZM161,268C91,291,74,382,57,359c-9.21-12.47-10.36-27.44-8-51,2-20,9-27,11-24,8.19,12.29,33,25,30,16-8.7-26.1-4.3-43.1-1-53,3-9,9-11,10-7,4.13,16.52,26,32,25,24-2.74-21.93,3.31-42,9-50,3.71-5.21,9.82-5.71,11,0,6,29,18.91,32,18,22-4-44,25-50.07,32-51,15-2,7.69,20.22,5,37C195,247,181.23,261.35,161,268Z" transform="translate(-0.25 0.22)"/>
    <path d="M447.76,216.09c-20.8-1.76-70.77,22.68-74.43,56.7-3.18,29.6,17.1,80.44,41.48,83.92,31.73,4.54,57-45.77,64.67-70.31C490.46,251.24,474.6,218.36,447.76,216.09ZM458,290c-3.78,12.19-20,50-40.4,45.19-16.39-3.87-26.18-43-18.6-64.19,5-14,25.87-35.46,42-32C469,245,461.78,277.81,458,290Z" transform="translate(-0.25 0.22)"/>
    <path d="M319,115C326,101,154.92-.44,126.46-.22S88,30,93,44s113,79,134,80S313.9,125.2,319,115Z" transform="translate(-0.25 0.22)"/>
    <path d="M187,129c0,6-66,33-88,42-17.07,7-79,0-88-8s-21-50,5-63S187,121.72,187,129Z" transform="translate(-0.25 0.22)"/>
    <path d="M160.3,307.36c1.16.5,2,.93,3,1.46s1.84,1.07,2.75,1.64a44.83,44.83,0,0,1,13.8,14,32.22,32.22,0,0,1,4.63,13.91,17.47,17.47,0,0,1,.08,1.86c0,.58,0,1.18,0,1.72,0,1.13-.1,2.21-.21,3.27-.22,2.12-.51,4.17-.89,6.17-.71,4-1.61,7.89-2.5,11.74s-1.87,7.65-2.89,11.44c-2,7.57-4.3,15-6.83,22.43a3.35,3.35,0,0,1-6.49-1.57v0c1.12-7.58,2.16-15.24,3.12-22.82A216.33,216.33,0,0,0,169.7,350c0-1.84,0-3.64,0-5.39l-.11-2.52c0-.42-.07-.79-.1-1.17s-.09-.72-.13-1a24.47,24.47,0,0,0-2.75-7.88,62.06,62.06,0,0,0-5.33-8.21c-1-1.37-2.12-2.75-3.24-4.13l-1.7-2.06-.85-1c-.26-.34-.6-.7-.77-1l-.66-1.07a5,5,0,0,1,6.26-7.21Z" transform="translate(-0.25 0.22)"/>
    <path d="M232,299.26c.52.74.91,1.31,1.32,2s.8,1.28,1.15,1.94q1.09,2,2,4a48.47,48.47,0,0,1,2.94,8.71,37.52,37.52,0,0,1,1,9.75,25.5,25.5,0,0,1-2.63,10.76,51.07,51.07,0,0,1-5.17,7.48c-1.87,2.32-3.8,4.52-5.82,6.62s-4.05,4.14-6.22,6a79.6,79.6,0,0,1-6.8,5.42,3.37,3.37,0,0,1-4.61-4.81l.11-.13c1.58-2,3.24-4.23,4.78-6.39s3-4.38,4.42-6.63,2.66-4.52,3.81-6.82l.83-1.73c.27-.58.5-1.17.77-1.74s.52-1.15.76-1.72l.73-1.66a11.14,11.14,0,0,0,.7-2.36,15.68,15.68,0,0,0,.34-2.87,38.18,38.18,0,0,0-.37-6.7c-.3-2.36-.77-4.8-1.29-7.28l-1.7-7.39-.11-.45a5,5,0,0,1,9.05-4Z" transform="translate(-0.25 0.22)"/>
    <path d="M304.08,316c.35.69.61,1.2.87,1.8s.5,1.15.71,1.74a34.91,34.91,0,0,1,1.16,3.59,36.66,36.66,0,0,1,1.19,7.68,26.53,26.53,0,0,1-.95,8.6,18.84,18.84,0,0,1-2,4.63l-.77,1.14c-.27.38-.58.74-.88,1.1a3.78,3.78,0,0,1-.39.4l-.36.34-.71.69a46.09,46.09,0,0,1-6.06,4.55c-2.06,1.35-4.09,2.62-6.16,3.81A115.94,115.94,0,0,1,277,362.4a3.35,3.35,0,0,1-3.27-5.81l.11-.08a124.36,124.36,0,0,0,10.26-8.19A53.67,53.67,0,0,0,292.5,339l.43-.58.21-.29c.06-.08.17-.22.16-.24s.1-.16.15-.25a1.59,1.59,0,0,1,.15-.29,12.28,12.28,0,0,0,.55-1.63,23.5,23.5,0,0,0,.64-4.84c.08-1.84,0-3.81,0-5.83l-.13-3.08-.07-1.56c0-.49-.06-1.08,0-1.47l.05-1a5,5,0,0,1,9.5-2Z" transform="translate(-0.25 0.22)"/>
    <path d="M76.53,421.79c32.35,24.46,64,49.74,95.46,75.26l11.78,9.59,2.94,2.4,1.43,1.16c.32.24.63.48,1,.69a15.28,15.28,0,0,0,4.23,2,15.44,15.44,0,0,0,4.62.69c.39,0,.78,0,1.17-.06a3.8,3.8,0,0,0,.58-.06l.64-.08,3.76-.54,15-2.2c20-3,40.09-5.74,60.15-8.56,10-1.43,20.06-2.76,30.1-4.08l30.11-4,30.13-3.82,15.07-1.91,3.77-.47,1.88-.24.47-.06.24,0,.14,0,.51-.09a10.83,10.83,0,0,0,3.88-1.43,11.74,11.74,0,0,0,5.26-6.38c.12-.35.19-.65.32-1.05l.43-1.85.87-3.69,1.76-7.39c2.42-9.84,4.75-19.69,7.26-29.51,4.94-19.65,10-39.26,15.65-58.77a5.51,5.51,0,0,1,10.74,2.36c-3.05,20.06-6.61,40-10.33,59.92-1.82,10-3.82,19.9-5.73,29.85l-1.49,7.44-.75,3.73-.38,1.86c-.2.82-.41,1.75-.66,2.61a30.58,30.58,0,0,1-13,17.07,30.27,30.27,0,0,1-10.19,4l-1.36.25-.57.09-.47.07-1.87.27-3.76.55-15,2.2L342.21,514l-30.09,4.2c-10,1.41-20.05,2.82-30.09,4.12-20.08,2.65-40.15,5.34-60.25,7.84l-15.07,1.91-3.76.48-1.25.13c-.43.05-.87.09-1.31.11-.87.06-1.75.07-2.62.06a34.75,34.75,0,0,1-10.32-1.75,33.87,33.87,0,0,1-9.29-4.75c-.71-.5-1.39-1.05-2.06-1.61l-1.48-1.27L171.74,521l-11.5-9.92c-30.62-26.52-61-53.28-90.77-80.86a5.5,5.5,0,0,1,7.06-8.42Z" transform="translate(-0.25 0.22)"/>
    <path d="M173.06,555.64,69.79,466A3.5,3.5,0,0,0,64,468.66v64.16a5,5,0,0,0,1.6,3.66l107.23,99.25a35,35,0,0,0,28.6,9L410.69,615.6a5,5,0,0,0,4.31-5V540.72a5,5,0,0,0-5.67-5L200.67,563.89A35,35,0,0,1,173.06,555.64Zm219.62,45L202.41,626.74a35,35,0,0,1-28.56-9L78.12,529A3.51,3.51,0,0,1,77,526.47V499.54a3,3,0,0,1,5-2.27l92,79.34a35,35,0,0,0,27.78,8.15l189.55-27a5,5,0,0,1,5.71,5v32.87A5,5,0,0,1,392.68,600.59Z" transform="translate(-0.25 0.22)"/>
    <path d="M171.56,665.53,68.29,565.92a3.49,3.49,0,0,0-5.79,2.64v64.15a5,5,0,0,0,1.6,3.67L171.33,745.63a35,35,0,0,0,28.6,9L411.19,725.5a5,5,0,0,0,4.31-5V650.62a5,5,0,0,0-5.67-5L199.17,673.78A35,35,0,0,1,171.56,665.53Zm221.62,45L200.91,736.64a35,35,0,0,1-28.56-9L76.62,628.93a3.5,3.5,0,0,1-1.12-2.56V599.44a3,3,0,0,1,5-2.27l92,89.34a35,35,0,0,0,27.78,8.15l191.55-26.95a5,5,0,0,1,5.71,4.95v32.87A5,5,0,0,1,393.18,710.49Z" transform="translate(-0.25 0.22)"/>
    <path d="M777.67,360.22v-88.4h-60v88.4h-80v-250h80v88.4h60v-88.4h80v250Z" transform="translate(-0.25 0.22)"/>
    <path d="M902.26,147.42q-9-6.79-9-24.8t9-25.2q9-7.2,35.6-7.2t35.6,7.2q9,7.2,9,25.2t-9,24.8q-9,6.81-35.6,6.8T902.26,147.42Zm-4.6,212.8v-190l80-10v200Z" transform="translate(-0.25 0.22)"/>
    <path d="M1047.66,360.22l-50-200h80l22,130h4l22-130h80l-50,200Z" transform="translate(-0.25 0.22)"/>
    <path d="M1303.65,292.22v14q12,1.2,24,1.2a248.69,248.69,0,0,0,75.2-12l9.6,58.8a342,342,0,0,1-88.8,12q-56,0-81-26.2t-25-79.8q0-53.6,25-79.8t80.8-26.2q55.8,0,77,15.2t21.2,56.8q0,35.21-25.4,50.6T1303.65,292.22Zm0-62.8v16.4h16.4q14.4,0,21-3t6.6-13.8v-16.4h-16.4q-14.4,0-21,3T1303.65,229.42Z" transform="translate(-0.25 0.22)"/>
    <path d="M689.65,564.42h-68v92.8h-80v-250h164l-10,64h-74v33.6h68Z" transform="translate(-0.25 0.22)"/>
    <path d="M734.24,444.42q-9-6.8-9-24.8t9-25.2q9-7.2,35.6-7.2t35.6,7.2q9,7.2,9,25.2t-9,24.8q-9,6.81-35.6,6.8T734.24,444.42Zm-4.6,212.8v-190l80-10v200Z" transform="translate(-0.25 0.22)"/>
    <path d="M879.64,657.22l-50-200h80l22,130h4l22-130h80l-50,200Z" transform="translate(-0.25 0.22)"/>
    <path d="M1135.63,589.22v14q12,1.2,24,1.2a248.69,248.69,0,0,0,75.2-12l9.6,58.8a342,342,0,0,1-88.8,12q-56,0-81-26.2t-25-79.8q0-53.6,25-79.8t80.8-26.2q55.8,0,77,15.2t21.2,56.8q0,35.21-25.4,50.6T1135.63,589.22Zm0-62.8v16.4H1152q14.39,0,21-3t6.59-13.8v-16.4h-16.4q-14.4,0-21,3T1135.63,526.42Z" transform="translate(-0.25 0.22)"/>
  </svg>
}
