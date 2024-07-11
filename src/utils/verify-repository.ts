import { env } from "~/env";

export const verifyRepository = (repo: string) => {
    if (!env.ALLOWED_REPOS) {
        return;
    }

    const repoAllowed = env.ALLOWED_REPOS.split(",").some(
        (allowedRepo) => repo.toLowerCase() === allowedRepo.toLowerCase()
    );

    if (!repoAllowed) {
        throw new Error(
            `${repo} is not in the allow list of GitHub repositories`
        );
    }
};
