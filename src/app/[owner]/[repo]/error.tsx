"use client";

import { useEffect } from "react";

export default function ErrorComponent({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error.message);
    }, [error]);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
            }}
        >
            <h2>Unable to fetch pull requests :(</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
