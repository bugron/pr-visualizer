import { NodeProps, Handle, Position, Node } from "@xyflow/react";
import { BranchNodeData } from "~/utils/generate-nodes-from-pull-requests";

export const BranchNode = ({
    data: { branchName, url },
    isConnectable,
}: NodeProps<Node<BranchNodeData>>) => {
    return (
        <div
            style={{
                padding: "10px",
            }}
        >
            <Handle
                type="source"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <a href={url} target="_blank" rel="noreferrer">
                {branchName}
            </a>
            <Handle
                type="target"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </div>
    );
};
