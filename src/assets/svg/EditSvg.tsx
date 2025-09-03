import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#C5B7F4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.228 5.9 6.358 17.77c-1.06 1.07-4.23 1.56-5 .85-.77-.71-.21-3.88.85-4.95L14.078 1.8a2.9 2.9 0 0 1 4.1 4.1h.05ZM19.078 18.96h-9"
    />
  </Svg>
)
export default SvgComponent
