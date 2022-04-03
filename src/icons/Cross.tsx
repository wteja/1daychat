import { SVGProps } from "react"

function SvgComponent(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 612 792"
            xmlSpace="preserve"
            {...props}
        >
            <path
                d="M562 396c0-141.4-114.6-256-256-256S50 254.6 50 396s114.6 256 256 256 256-114.6 256-256zm-205.2 0L475 514.2 424.2 565 306 446.8 187.8 565 137 514.2 255.2 396 137 277.8l50.8-50.8L306 345.2 424.2 227l50.8 50.8L356.8 396z"
                style={{
                    fill: "#e44061",
                }}
            />
        </svg>
    )
}

export default SvgComponent;
