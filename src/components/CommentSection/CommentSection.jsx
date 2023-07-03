import { Comments } from "../Comments/Comments.tsx";
import classes from "./CommentSection.module.css";
import { CommentForm } from "../Comments/CommentForm.tsx";
import { Suspense, useEffect, useRef, useState } from "react";
import  sanityClient  from "../../Client";
const CommentSection = (props) => {
    const postContainerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);


    const [comments, setComments] = useState(null);
    useEffect(() => {
        let subscribed = true;
        if (isVisible && !comments) {
            const repliesQuery = `
                "replies": replies[@->.approved==true]->{
                   "replies": replies[@->.approved==true]->{
                       "replies": replies[@->.approved==true]->{
                           _id,                 
                           name,
                           _createdAt,
                           comment,                      
                           email,
                           type,
                        },   
                       _id,                 
                       name,
                       _createdAt,
                       comment,                      
                       email,
                       type,
                      },
                   _id,                 
                   name,
                   _createdAt,
                   comment,                      
                   email,
                   type,
                }`;

            const commentsQuery = `*[_type == "comment" && post == "${props.denemeName}" && approved == true && !defined(parent)]
                {
                ...,
                ${repliesQuery}
            }`;

            sanityClient
                .fetch(commentsQuery)
                .then((commentData) => {
                    if (subscribed) {
                        setComments(commentData);
                    }
                })
                .catch(console.error);
        }
        return () => {
            subscribed = false;
        };
    }, [isVisible, comments]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: [0, 1],
        };
        const handleIntersection = (entries) => {
            const [entry] = entries;
            setIsVisible(entry.isIntersecting);
        };

        let observerRefVal = null;
        const observer = new IntersectionObserver(handleIntersection, options);

        if (postContainerRef.current)
            observer.observe(postContainerRef.current);
        observerRefVal = postContainerRef.current;
        return () => {
            if (observerRefVal.current) observer.unobserve(observerRefVal);
        };
    }, [postContainerRef]);

    return (
        <div ref={postContainerRef}>
                <Comments comments={comments} postId={props.denemeName} />
                <CommentForm post={props.denemeName} />
        </div>
    );
};
export default CommentSection;
