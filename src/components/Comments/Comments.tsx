import classes from "./Comments.module.css";
import { useState } from "react";
import { SingularComment } from "./SingularComment.tsx";

//const Comments = ({ comments, postId }) => {
//    const commentsList = comments?.map(({ name, yorum, _createdAt }) => (
//        <div key={_createdAt} className={classes.comment_wrapper}>
//            <span className={classes.date}>{_createdAt}</span>
//            <h2 className={classes.name}>{name}</h2>
//            <p className={classes.comment}>{yorum}</p>
//        </div>
//    ));
//    return <>{commentsList}</>;
//};

type CommentsProps = {
    _id: string;
    _createdAt: string;
    name: string;
    comment: string;
    replies: string;
};

export const Comments = ({
    comments,
    postId,
}: {
    comments: [];
    postId: string;
}) => {
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const toggleReplyForm = (commentId: string) => {
        setActiveReplyId(commentId === activeReplyId ? null : commentId);
    };

    return (
        <>
            <h2 className="mb-4 mt-10 text-4xl leading-tight lg:text-6xl">
                Comments:
            </h2>
            <ul>
                {comments?.map(
                    ({
                        _id,
                        _createdAt,
                        name,
                        comment,
                        replies,
                    }: CommentsProps) => (
                        <SingularComment
                            postId={postId}
                            replies={replies}
                            key={_id}
                            _id={_id}
                            _createdAt={_createdAt}
                            name={name}
                            comment={comment}
                            isActive={activeReplyId === _id}
                            activeReplyId={activeReplyId}
                            toggleReplyForm={toggleReplyForm}
                        />
                    )
                )}
            </ul>
        </>
    );
};
