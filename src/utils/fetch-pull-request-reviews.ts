import { githubClient } from "./github-request";

export const fetchPullRequestReviews = async ({
    owner,
    repo,
    id,
}: {
    owner: string;
    repo: string;
    id: number;
}) => {
    const { data } = await githubClient.pulls.listReviews({
        owner,
        repo,
        pull_number: id,
    });

    return {
        isApproved: data.some(
            (review) => review.state.toLowerCase() === "approved"
        ),
    };
};
