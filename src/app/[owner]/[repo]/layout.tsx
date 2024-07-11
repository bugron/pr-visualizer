import "~/styles/globals.css";

import "@xyflow/react/dist/style.css";

import { PropsWithChildren } from "react";

export const metadata = {
    title: "PR Visualizer",
    description:
        "PR visualizer illuminates the relations between different PRs in the same repo and helps with keeping track of chain PRs.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export type PageProps = {
    owner: string;
    repo: string;
};

export default function RootLayout({
    children,
    params: { repo, owner },
}: PropsWithChildren<{ params: PageProps }>) {
    return (
        <html lang="en">
            <body>
                <h1 id="title">
                    <code>
                        {owner}/{repo}
                    </code>{" "}
                    PR Flowchart
                </h1>
                {children}
            </body>
        </html>
    );
}
