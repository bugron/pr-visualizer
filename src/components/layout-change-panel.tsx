import { Panel } from "@xyflow/react";
import { getLayoutedElements } from "~/utils/get-layouted-elements";

export const LayoutChangePanel = ({
    onLayout,
}: {
    onLayout: (
        direction: Parameters<typeof getLayoutedElements>["0"]["direction"]
    ) => void;
}) => {
    return (
        <Panel
            position="top-right"
            style={{
                display: "none",
            }}
        >
            <button onClick={() => onLayout("TB")}>vertical layout</button>
            <button onClick={() => onLayout("RL")}>horizontal layout</button>
        </Panel>
    );
};
