import Link from "next/link";

const Logo = ({ badge, href = "/", className = "", size = "md" }) => {
    // Size variants
    const sizeClasses = {
        sm: {
            container: "gap-2",
            iconBox: "size-8 rounded-lg",
            svg: "size-4",
            text: "text-2xl",
            dot: "text-2xl",
        },
        md: {
            container: "gap-2.5",
            iconBox: "size-9 sm:size-10 rounded-xl",
            svg: "size-5",
            text: "text-3xl sm:text-4xl",
            dot: "text-3xl sm:text-4xl",
        },
        lg: {
            container: "gap-3",
            iconBox: "size-12 rounded-2xl",
            svg: "size-6",
            text: "text-4xl sm:text-5xl",
            dot: "text-4xl sm:text-5xl",
        },
    };

    const s = sizeClasses[size] || sizeClasses.md;

    return (
        <Link
            href={href}
            className={`group inline-flex items-center ${s.container} transition-all duration-200 select-none ${className}`}
        >
            {/* Visual Icon Mark */}
            <div
                className={`relative flex items-center justify-center ${s.iconBox} bg-gradient-to-tr from-orange-500 via-orange-400 to-amber-400 text-white shadow-md shadow-orange-500/20 ring-1 ring-orange-500/30 group-hover:scale-105 group-hover:shadow-orange-500/35 transition-all duration-200 shrink-0`}
            >
                <svg
                    className={`${s.svg} text-white transition-transform duration-200 group-hover:-rotate-3`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {/* Micro accent pulse */}
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                </span>
            </div>

            {/* Wordmark + optional Badge */}
            <div className="relative flex items-center">
                <span className={`${s.text} font-extrabold tracking-tight text-slate-800 flex items-center`}>
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                        e
                    </span>
                    <span className="text-orange-500 font-black mx-0.5">-</span>
                    <span>buy</span>
                    <span className={`text-orange-500 ${s.dot} font-black leading-none`}>.</span>
                </span>

                {badge && (
                    <span className="ml-2 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-xs shadow-orange-500/25 ring-1 ring-orange-400/30">
                        {badge}
                    </span>
                )}
            </div>
        </Link>
    );
};

export default Logo;
