// schemas/components/AlignBlock.js
import React from "react";
import { BlockEditor } from "part:@sanity/form-builder";

function AlignBlock(props) {
    const options = props.type.options.align;
    const alignment = () => {
        switch (options) {
            case "right":
                return (
                    <div style={{ textAlign: "right" }}>
                        <BlockEditor {...props} />
                    </div>
                );
            case "center":
                return (
                    <div style={{ textAlign: "center" }}>
                        <BlockEditor {...props} />
                    </div>
                );
            default:
                return <BlockEditor {...props} />;
        }
    };
    return alignment();
}

export default AlignBlock;
