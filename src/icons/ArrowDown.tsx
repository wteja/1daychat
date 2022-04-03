import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            xmlSpace="preserve"
            {...props}
            width={16}
            height={16}
        >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 11.207L2.646 5.854l.707-.707L8 9.793l4.646-4.646.707.707L8 11.207z" fill="currentColor" />
        </svg>
    )
}

export default SvgComponent
