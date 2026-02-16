
import React from 'react';

/**
 * A basic Skeleton component that renders a div with a pulse animation.
 * You can pass standard div props (className, etc.) to customize size/shape.
 */
export default function Skeleton({
    className = "",
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse bg-[var(--neutral-100)] rounded-[8px] ${className}`}
            {...props}
        />
    );
}
