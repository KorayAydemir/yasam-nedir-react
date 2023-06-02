import { Comments } from "../Comments/Comments.tsx";
import classes from "./CommentSection.module.css";
import { CommentForm } from "../Comments/CommentForm.tsx";
const CommentSection = (props) => {
    return (
        <>
            <Comments comments={props.comments} postId={props.postId} />
            <CommentForm post={props.postId} />
        </>
    );
};
export default CommentSection;
