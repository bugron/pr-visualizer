import { NodeProps, Handle, Position, Node } from "@xyflow/react";
import { PRNodeData } from "~/utils/generate-nodes-from-pull-requests";

export const PullRequestNode = ({
    data,
    isConnectable,
}: NodeProps<Node<PRNodeData>>) => {
    return (
        <div
            style={{
                padding: "10px",
                backgroundColor: data?.draft
                    ? "rgb(110, 118, 129)"
                    : "rgb(0, 0, 0)",
                borderColor: data?.draft
                    ? "rgb(110, 118, 129)"
                    : "rgb(0, 0, 0)",
                outline:
                    data?.isApproved !== null
                        ? `3px solid ${
                              data?.isApproved ? "#33C751" : "#E57371"
                          }`
                        : "none",
            }}
        >
            <Handle
                type="source"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <a href={data.url} target="_blank">
                {data.login} - {data.title}
            </a>
            <Handle
                type="target"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </div>
    );
};
