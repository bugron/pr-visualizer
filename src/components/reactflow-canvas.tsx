"use client";

import { useCallback } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Controls,
    Edge,
    Node,
    Background,
    BackgroundVariant,
    useReactFlow,
} from "@xyflow/react";
import { getLayoutedElements } from "~/utils/get-layouted-elements";
import { BranchNode } from "~/components/branch-node";
import { PullRequestNode } from "~/components/pull-request-node";
import { Legend } from "./legend";
import { LayoutChangePanel } from "./layout-change-panel";

import "~/styles/custom-nodes.css";
import {
    branchNodeType,
    pullRequestNodeType,
} from "~/utils/generate-nodes-from-pull-requests";

const nodeTypes = {
    [pullRequestNodeType]: PullRequestNode,
    [branchNodeType]: BranchNode,
};

export function ReactFlowCanvas({
    layoutedNodes,
    layoutedEdges,
}: {
    layoutedNodes: Node[];
    layoutedEdges: Edge[];
}) {
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useNodesState(layoutedNodes);
    const [edges, setEdges] = useEdgesState(layoutedEdges);

    const onLayout = useCallback(
        (
            direction: Parameters<typeof getLayoutedElements>["0"]["direction"]
        ) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements({ nodes, edges, direction });

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);

            requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            zoomOnPinch
            panOnScroll
            panOnScrollSpeed={1.5}
            minZoom={0.3}
            maxZoom={3}
        >
            <Legend />
            <LayoutChangePanel onLayout={onLayout} />
            <Controls showInteractive={false} />
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
    );
}
