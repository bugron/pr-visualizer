import { Edge, Node } from "@xyflow/react";
import { MarkerType } from "@xyflow/system";
import { fetchPullRequests } from "./fetch-pull-requests";

export const pullRequestNodeType = "pullRequest";
export const branchNodeType = "branch";

export type BranchNodeData = {
    url: string;
    branchName: string;
};

export type PRNodeData = {
    title: string;
    isApproved: boolean | null;
    login?: string;
    draft?: boolean;
    icon: {
        url?: string;
        height: number;
        width: number;
    };
} & BranchNodeData;

export const generateNodesFromPullRequests = ({
    pulls,
    owner,
    repo,
}: {
    pulls: Awaited<ReturnType<typeof fetchPullRequests>>;
    owner: string;
    repo: string;
}) => {
    const allBranchNames = [
        ...new Set(pulls.flatMap((pull) => [pull.head.ref, pull.base.ref])),
    ];

    const nodes = allBranchNames.map((branchName) => {
        const pullRequest = pulls.find((pull) => pull.head.ref === branchName);
        const branchNode: Node<BranchNodeData, typeof branchNodeType> = {
            id: branchName,
            type: "branch",
            draggable: false,
            position: { x: 0, y: 0 },
            data: {
                url: `https://github.com/${owner}/${repo}/tree/${branchName}`,
                branchName,
            },
        };

        if (!pullRequest) {
            return branchNode;
        }

        const prNode: Node<PRNodeData, typeof pullRequestNodeType> = {
            ...branchNode,
            type: "pullRequest",
            data: {
                ...branchNode.data,
                login: pullRequest.user?.login,
                title: pullRequest.title,
                url: pullRequest.html_url,
                draft: pullRequest.draft,
                isApproved: pullRequest.isApproved,
                icon: {
                    url: pullRequest.user?.avatar_url,
                    height: 25,
                    width: 25,
                },
            },
        };

        return prNode;
    });

    const edges = pulls.map<Edge>((pull) => {
        const source = pull.head.ref;
        const target = pull.base.ref;

        return {
            id: `e${source}-${target}`,
            source,
            target,
            animated: false,
            style: { stroke: "#485a74" },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#485a74",
                width: 30,
                height: 30,
            },
        };
    });

    return {
        nodes,
        edges,
    };
};
