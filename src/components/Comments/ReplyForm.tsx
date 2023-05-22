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
        return <h3>Yorum gönderiliyor…</h3>;
    }

    if (hasSubmitted) {
        // Returns the data that the user submitted for them to preview after submission
        return (
            <>
                <h3>Yorumunuz için teşekkürler!</h3>
                <ul>
                    <li>
                        İsim: {formData.name} <br />
                        E-Posta: {formData.email} <br />
                        Yorum: {formData.comment}
                    </li>
                </ul>
            </>
        );
    }
    console.log(postId);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setFormData(data);
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/postReply`,
                {
                    method: "POST",
                    body: JSON.stringify({ ...data, parentId: _id, postId }),
                }
            );
            setIsSubmitting(false);
            setHasSubmitted(true);
            console.log(res);
        } catch (err) {
            console.log(err);
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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="font-sans w-full max-w-lg"
            >
                <div className="mb-5 block ">
                    <label htmlFor="name" className="">
                        İsim
                    </label>

                    <input
                        {...register("name", { required: true, maxLength: 60 })}
                        name="name"
                        placeholder="Ad Soyad"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="form-input mt-1 block w-full p-1"
                    />
                    {errors.name?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            İsim boş bırakılamaz.
                        </p>
                    )}
                    {errors.name?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            İsim 60 harften uzun olamaz.
                        </p>
                    )}
                </div>

                <div className="mb-5 block">
                    <label htmlFor="email" className="">
                        E-Posta
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
                        placeholder="E-Postanız yorumda gözükmeyecektir."
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            E-Posta boş olamaz.
                        </p>
                    )}
                    {errors.email?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            E-Posta 254 karakterden uzun olamaz.
                        </p>
                    )}
                    {errors.email?.type === "minLength" && (
                        <p className="text-red-400" role="alert">
                            E-Posta 5 karakterden kısa olamaz.
                        </p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="text-red-400" role="alert">
                            Geçersiz email.
                        </p>
                    )}
                </div>

                <div className="mb-2 block">
                    <label htmlFor="comment" className="">
                        Yorum
                    </label>
                    <textarea
                        {...register("comment", {
                            required: true,
                            maxLength: 3000,
                        })}
                        name="comment"
                        placeholder="Yorumunuzu buraya girin."
                        className="form-textarea mt-1 block w-full p-1"
                        rows={8}
                        aria-invalid={errors.comment ? "true" : "false"}
                    ></textarea>
                    {errors.comment?.type === "required" && (
                        <p className="text-red-400" role="alert">
                            Yorum boş olamaz.
                        </p>
                    )}
                    {errors.comment?.type === "maxLength" && (
                        <p className="text-red-400" role="alert">
                            Yorum 3000 karakterden uzun olamaz.
                        </p>
                    )}
                </div>

                {recaptchaText}
                <input
                    value="Yanıtı Gönder"
                    type="submit"
                    className="focus:shadow-outline text-black rounded bg-[color:var(--link-color)] px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                />
            </form>
        </>
    );
};
