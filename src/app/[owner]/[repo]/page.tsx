import { fetchPullRequests } from "~/utils/fetch-pull-requests";
import { PageProps } from "./layout";
import { generateNodesFromPullRequests } from "~/utils/generate-nodes-from-pull-requests";
import { getLayoutedElements } from "~/utils/get-layouted-elements";
import { ReactFlowProvider } from "@xyflow/react";
import { ReactFlowCanvas } from "~/components/reactflow-canvas";

export default async function RepositoryFlowchartPage({
    params: { repo, owner },
    searchParams,
}: {
    params: PageProps;
    searchParams: {
        showPrState: string;
    };
}) {
    const pulls = await fetchPullRequests({
        owner,
        repo,
        showPrState: "showPrState" in searchParams,
    });

    const { nodes, edges } = generateNodesFromPullRequests({
        pulls,
        repo,
        owner,
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements({
        nodes,
        edges,
    });

    return (
        <ReactFlowProvider>
            <ReactFlowCanvas
                layoutedEdges={layoutedEdges}
                layoutedNodes={layoutedNodes}
            />
        </ReactFlowProvider>
    );
}
