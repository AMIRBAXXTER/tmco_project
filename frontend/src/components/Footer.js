export default function Footer() {
    return (
        <section className="relative w-full h-[1200px] bg-white">


            {/* SVGها روی دیو رنگی */}
            <div className="absolute inset-0 z-20 pointer-events-none">

                {/* بالا چپ */}
                <svg
                    className="intro-line absolute top-0 left-0 w-1/4 h-3/5"
                    width="524" height="569" viewBox="0 0 524 569"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M523 0V349.935C523 369.347 509.062 385.957 489.945 389.328L272.46 427.672C253.342 431.043 239.405 447.653 239.405 467.065V527.772C239.405 558.327 206.531 577.6 179.868 562.676L0 462" stroke="url(#paint0_linear_171_5039)" strokeOpacity="0.23" strokeWidth="2" />
                    <defs>
                        <linearGradient id="paint0_linear_171_5039" x1="261.5" y1="40.3482" x2="261.5" y2="596" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#2A446F" stopOpacity="0" />
                            <stop offset="1" stopColor="#2A446F" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* بالا راست */}
                <svg
                    className="intro-line absolute top-0 right-0 w-1/4 h-3/5"
                    width="519" height="518" viewBox="0 0 519 518"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.61401 0V223.263C1.61401 239.447 11.3654 254.035 26.3188 260.224L230.637 344.776C245.59 350.965 255.342 365.553 255.342 381.737V477C255.342 499.091 273.25 517 295.342 517H519" stroke="url(#paint0_linear_171_5033)" strokeOpacity="0.23" strokeWidth="2" />
                    <defs>
                        <linearGradient id="paint0_linear_171_5033" x1="260.307" y1="35" x2="260.307" y2="517" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#2A446F" stopOpacity="0" />
                            <stop offset="1" stopColor="#2A446F" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* پایین چپ */}
                <svg
                    className="intro-line absolute bottom-0 left-0 w-1/4 h-3/5"
                    width="511" height="266" viewBox="0 0 511 266"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M509.5 -57.5V225C509.5 247.091 491.591 265 469.5 265H94.2798C79.36 265 65.6802 256.696 58.7945 243.461L-110 -81" stroke="#2A446F" strokeWidth="2" />
                </svg>

                {/* پایین راست */}
                <svg
                    className="intro-line absolute bottom-0 right-0 w-1/4 h-3/5"
                    width="510" height="396" viewBox="0 0 510 396"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M512 1H41.1306C19.0392 1 1.13055 18.9086 1.13055 41V355C1.13055 377.091 19.0392 395 41.1306 395H512" stroke="#2A446F" strokeOpacity="0.23" strokeWidth="2" />
                </svg>

                {/* وسط پایین چپ */}
                <svg
                    className="intro-line absolute top-3/4 left-0 w-1/4 h-3/5"
                    width="452" height="391" viewBox="0 0 452 391"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 1H410.649C442.719 1 461.749 36.849 443.78 63.4124L221.5 392" stroke="#2A446F" strokeWidth="2" />
                </svg>

                {/* وسط پایین راست */}
                <svg
                    className="intro-line absolute top-3/4 right-0 w-1/4 h-3/5"
                    width="649" height="392" viewBox="0 0 649 392"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M649 165.5L485.039 11.8159C477.626 4.86704 467.845 1 457.684 1H41C18.9086 1 1 18.9086 1 41V395" stroke="#2A446F" strokeWidth="2" />
                </svg>

            </div>
        </section>
    );
}
