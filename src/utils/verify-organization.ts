import { env } from "~/env";

export const verifyOrganization = (org: string) => {
    if (!env.ALLOWED_ORGS) {
        return;
    }

    const orgAllowed = env.ALLOWED_ORGS.split(",").some(
        (allowedOrg) => org.toLowerCase() === allowedOrg.toLowerCase()
    );

    if (!orgAllowed) {
        throw new Error(
            `${org} is not in the allow list of GitHub organizations`
        );
    }
};
