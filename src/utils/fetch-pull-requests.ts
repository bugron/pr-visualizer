import { fetchPullRequestReviews } from "./fetch-pull-request-reviews";
import { githubClient } from "./github-request";
import { verifyOrganization } from "./verify-organization";
import { verifyRepository } from "./verify-repository";

export const fetchPullRequests = async ({
    owner,
    repo,
    showPrState = false,
}: {
    owner: string;
    repo: string;
    showPrState?: boolean;
}) => {
    verifyOrganization(owner);
    verifyRepository(repo);

    const { data } = await githubClient.pulls.list({
        owner,
        repo,
        state: "open",
        per_page: 100,
        page: 1,
    });

    return Promise.all(
        data.map(async (pull) => {
            const isApproved = showPrState
                ? (
                      await fetchPullRequestReviews({
                          owner,
                          repo,
                          id: pull.number,
                      })
                  ).isApproved
                : null;

            return {
                ...pull,
                isApproved,
            };
        })
    );
};
