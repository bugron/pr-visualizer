import { Panel } from "@xyflow/react";

export const Legend = () => {
    return (
        <Panel
            position="top-left"
            style={{
                width: 105,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <p style={{ margin: 0 }}>Pinch to zoom</p>
            <p style={{ margin: 0 }}>Scroll to pan</p>
            <div
                className="react-flow__node-branch"
                style={{
                    padding: 5,
                    width: "100%",
                }}
            >
                Branch
            </div>
            <div
                className="react-flow__node-pullRequest"
                style={{
                    padding: 5,
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "rgb(110, 118, 129)",
                }}
            >
                Draft PR
            </div>
            <div
                className="react-flow__node-pullRequest"
                style={{
                    padding: 5,
                    width: "100%",
                    textAlign: "center",
                    border: "3px solid #33C751",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Approved PR
            </div>
            <div
                className="react-flow__node-pullRequest"
                style={{
                    padding: 5,
                    width: "100%",
                    textAlign: "center",
                    border: "3px solid #E57371",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Not approved PR
            </div>
        </Panel>
    );
};
