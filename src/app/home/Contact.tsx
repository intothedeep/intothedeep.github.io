'use client';

import React, { useRef, useState } from 'react';
// import emailjs from '@emailjs/browser';
import clsx from 'clsx';

import './Contact.scss';

function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        const isNameEmpty = name === '';
        const isEmailEmpty = email === '';
        const isMessageEmpty = message === '';

        // Set error states
        setNameError(isNameEmpty);
        setEmailError(isEmailEmpty);
        setMessageError(isMessageEmpty);

        /* Uncomment below if you want to enable the emailJS */

        // If all fields are filled out, send the email
        // if (!isNameEmpty && !isEmailEmpty && !isMessageEmpty) {
        //     const templateParams = {
        //         name,
        //         email,
        //         message,
        //     };

        //     console.log('Sending email with params:', templateParams);

        //     emailjs
        //         .send('service_id', 'template_id', templateParams, 'api_key')
        //         .then((res: any) => {
        //             console.log('SUCCESS!', res.status, res.text);

        //             // Reset form fields on success
        //             setName('');
        //             setEmail('');
        //             setMessage('');
        //         })
        //         .catch((err: any) => {
        //             console.log('FAILED...', err);
        //         });
        // }
    };

    // Common input classes using clsx
    const inputBaseClasses = clsx(
        'w-full',
        'px-3',
        'py-2',
        'border',
        'rounded-md',
        'shadow-sm',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
        'bg-white' // Added white background
    );

    return (
        <div id="contact">
            <div className="items-container">
                <div className="contact_wrapper">
                    <h1>Contact Me</h1>
                    <p>
                        Got a project waiting to be realized? Let's collaborate
                        and make it happen!
                    </p>
                    <form
                        ref={form}
                        noValidate
                        autoComplete="off"
                        className={clsx('w-full', 'mx-auto', 'contact-form')}
                    >
                        <div
                            className={clsx(
                                'flex',
                                'flex-col',
                                'md:flex-row',
                                'gap-4',
                                'mb-4',
                                'form-flex'
                            )}
                        >
                            <div className="flex-1">
                                <label
                                    htmlFor="name"
                                    className={clsx(
                                        'block',
                                        'text-sm',
                                        'font-medium',
                                        'text-gray-700',
                                        'mb-1'
                                    )}
                                >
                                    Your Name{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    id="name"
                                    type="text"
                                    placeholder="What's your name?"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={clsx(
                                        inputBaseClasses,
                                        nameError
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    )}
                                />
                                {nameError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        Please enter your name
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label
                                    htmlFor="email"
                                    className={clsx(
                                        'block',
                                        'text-sm',
                                        'font-medium',
                                        'text-gray-700',
                                        'mb-1'
                                    )}
                                >
                                    Email / Phone{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    id="email"
                                    type="text"
                                    placeholder="How can I reach you?"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={clsx(
                                        inputBaseClasses,
                                        emailError
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    )}
                                />
                                {emailError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        Please enter your email or phone number
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className={clsx(
                                    'block',
                                    'text-sm',
                                    'font-medium',
                                    'text-gray-700',
                                    'mb-1'
                                )}
                            >
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                id="message"
                                placeholder="Send me any inquiries or questions"
                                rows={10}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={clsx(
                                    inputBaseClasses,
                                    'body-form',
                                    messageError
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                )}
                            />
                            {messageError && (
                                <p className="mt-1 text-sm text-red-500">
                                    Please enter the message
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={sendEmail}
                            className={clsx(
                                'send-btn',
                                'px-4',
                                'py-2',
                                // 'bg-blue-600',
                                // 'text-white',
                                'rounded-md',
                                // 'hover:bg-blue-700',
                                'focus:outline-none',
                                'focus:ring-2',
                                // 'focus:ring-blue-500',
                                // 'focus:ring-offset-2',
                                'transition-colors',
                                'duration-200',
                                'flex',
                                'items-center',
                                'space-x-2',
                                'cursor-pointer',

                                'border-none',
                                'bg-white',
                                '!text-black',
                                'hover:bg-violet-700',
                                'hover:!text-white',
                                // 'focus:outline-2',
                                // 'focus:outline-offset-2',
                                // 'focus:outline-violet-500',
                                // 'focus:!text-white',
                                'active:bg-violet-500',

                                'float-right'
                            )}
                        >
                            <span>Send</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
