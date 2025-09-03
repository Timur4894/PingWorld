import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M18.563 24.156a.873.873 0 0 1-.6-.236l-9.585-9.198A2.393 2.393 0 0 1 7.638 13c0-.646.266-1.265.74-1.723l9.543-9.197a.87.87 0 0 1 .605-.237.87.87 0 0 1 .602.245.806.806 0 0 1 .245.583.807.807 0 0 1-.254.579l-9.55 9.173a.811.811 0 0 0-.25.577.786.786 0 0 0 .25.577l9.55 9.173a.812.812 0 0 1 .25.577.787.787 0 0 1-.25.577.858.858 0 0 1-.556.252Z"
    />
  </Svg>
)
export default SvgComponent
