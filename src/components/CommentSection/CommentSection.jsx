import { Comments } from "../Comments/Comments.tsx";
import classes from "./CommentSection.module.css";
import { CommentForm } from "../Comments/CommentForm.tsx";
import { useEffect, useState } from "react";
import Client from "../../Client.js";
const CommentSection = (props) => {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        let subscribed = true;
        if (subscribed) {
            fetchComments();
        }
        return () => {
            subscribed = false;
        };
    }, []);

    const fetchComments = () => {
        console.log("ye");
        Client.fetch(`{'comments': *[_type == "comment"]}`)
            .then((data) => {
                setComments(data.comments);
            })
            .catch(console.error);
    };
    return (
        <>
            <CommentForm post={props.post} />
            <Comments comments={props.comments} />
        </>
    );
};
export default CommentSection;
