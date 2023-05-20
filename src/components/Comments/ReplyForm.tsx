import { useState } from "react";
import { useForm } from "react-hook-form";
import Client from "../../Client";

export const ReplyForm = ({ _id, postId }: { _id: string; postId: string }) => {
    // Sets up basic data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    // Sets up our form states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Prepares the functions from react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (isSubmitting) {
        // Returns a "Submitting comment" state if being processed
        return <h3>Submitting comment…</h3>;
    }

    if (hasSubmitted) {
        // Returns the data that the user submitted for them to preview after submission
        return (
            <>
                <h3>Thanks for your comment!</h3>
                <ul>
                    <li>
                        Name: {formData.name} <br />
                        Email: {formData.email} <br />
                        Comment: {formData.comment}
                    </li>
                </ul>
            </>
        );
    }

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setFormData(data);
        try {
            await fetch("/api/createReply", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    token,
                    parentId: _id,
                    postId: postId,
                }),
            });

            setIsSubmitting(false);
            setHasSubmitted(true);
        } catch (err) {
            alert("failed to execute ReCaptcha: " + err);
        }
    };

    const recaptchaText = (
        <div className="mb-5 text-sm text-gray-500">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">
                {" "}
                Privacy Policy
            </a>{" "}
            and
            <a href="https://policies.google.com/terms">
                {" "}
                Terms of Service
            </a>{" "}
            apply.
        </div>
    );

    return (
        <>
            {
                // Sets up the Form markup
                // Input fields should use aria-invalid to indicate field contain error.
                // Should use role="alert" to announce the error messages.
            }
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="mb-5 block">
                    <label
                        htmlFor="name"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        Name
                    </label>

                    <input
                        {...register("name", { required: true, maxLength: 60 })}
                        name="name"
                        placeholder="John Cena"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="form-input mt-1 block w-full p-1"
                    />
                    {errors.name?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            Name can&apos;t be empty.
                        </p>
                    )}
                    {errors.name?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            Name can&apos;t be longer than 60 characters.
                        </p>
                    )}
                </div>

                <div className="mb-5 block">
                    <label
                        htmlFor="email"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        Email
                    </label>
                    <input
                        {...register("email", {
                            pattern: /^\S+@\S+$/i,
                            required: true,
                            maxLength: 254,
                            minLength: 5,
                        })}
                        name="email"
                        type="email"
                        className="form-input mt-1 block w-full p-1"
                        placeholder="your@email.com"
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            Email can&apos;t be empty.
                        </p>
                    )}
                    {errors.email?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            Email can&apos;t be longer than 254 characters.
                        </p>
                    )}
                    {errors.email?.type === "minLength" && (
                        <p className="text-red-400" role="alert">
                            Email can&apos;t be shorter than 5 characters.
                        </p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="text-red-400" role="alert">
                            Email is invalid.
                        </p>
                    )}
                </div>

                <div className="mb-2 block">
                    <label
                        htmlFor="comment"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        Comment
                    </label>
                    <textarea
                        {...register("comment", {
                            required: true,
                            maxLength: 1024,
                        })}
                        name="comment"
                        placeholder="Enter your comment here."
                        className="form-textarea mt-1 block w-full p-1"
                        rows={8}
                        aria-invalid={errors.comment ? "true" : "false"}
                    ></textarea>
                    {errors.comment?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            Comment can&apos;t be empty.
                        </p>
                    )}
                    {errors.comment?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            Comment can&apos;t be longer than 1024 characters.
                        </p>
                    )}
                </div>

                {recaptchaText}
                <input
                    value="Submit Comment"
                    type="submit"
                    className="focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                />
            </form>
        </>
    );
};
