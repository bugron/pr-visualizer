import Link from "next/link";

export default function Home() {
    return (
        <div
            style={{
                maxWidth: "740px",
                margin: "0 auto",
                padding: "0.5rem",
            }}
        >
            <h1
                style={{
                    fontSize: "4.5em",
                    marginTop: "1.5em",
                    marginBottom: "3rem",
                    textAlign: "center",
                }}
            >
                PR visualizer
            </h1>
            <p>
                PR visualizer illuminates the relations between different PRs in
                the same repo and helps with keeping track of chain PRs.
            </p>
            <p className="url">pr-visualizer.st.dev/:orgName/:repoName</p>
            <h2>Examples</h2>
            <ul
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <li>
                    <Link href="https://pr-visualizer.st.dev/freeCodeCamp/freeCodeCamp">
                        https://pr-visualizer.st.dev/freeCodeCamp/freeCodeCamp
                    </Link>
                </li>
                <li>
                    <Link href="https://pr-visualizer.st.dev/freeCodeCamp/freeCodeCamp?showPrState">
                        https://pr-visualizer.st.dev/freeCodeCamp/freeCodeCamp?showPrState
                    </Link>{" "}
                    - shows whether PRs are approved or not
                </li>
            </ul>
            <p
                style={{
                    marginTop: "2.5rem",
                }}
            >
                Yes, this page is a shameless copy of{" "}
                <a href="https://unpkg.com/">unpkg.com</a> homepage.
            </p>
        </div>
    );
}
