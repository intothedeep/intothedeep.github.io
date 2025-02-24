'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {};

export const Resume = (props: Props) => {
    return (
        <section
            className={clsx(
                'max-w-[230mm]',
                'mx-auto py-7',
                'rounded-lg shadow-lg',
                'bg-zinc-100',
                'dark:bg-[#1a1b1e]',
            )}
        >
            <article
                id="resume"
                className={clsx(
                    [
                        'w-[210mm]', 
                        // 'h-[297mm]'
                    ],
                    'flex justify-between',
                    'txt-xs',
                    'm-auto p-5',
                    'rounded-lg shadow-md',
                    'bg-white dark:bg-zinc-800',
                )}
            >
                {/* <div className={clsx('flex flex-1 justify-between')}>
                    <h1 className={clsx('text-base')}>Taek Lim</h1>
                    <div className={clsx('text-xs')}>
                        <div>tio.taek.lim@gmail.com</div>
                        <div>github.com/tradelunch</div>
                    </div>
                    <div>Java, Javascript, spring</div>
                </div> */}
                {/* <embed
                    src={'/v1/pdfs/resume.pdf'}
                    // width="800px"
                    // height=""
                    className={clsx('flex-1')}
                /> */}
                <div>
                    {/* <img className={clsx(["object-cover"], )} src="/v1/imgs/resume.jpg" alt="resume" /> */}
                    <Image src="/v1/imgs/resume.jpg" alt="resume" width={1000} height={297}/>
                </div>
            </article>
        </section>
    );
};

export default Resume;

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// type Props = {};

// export const Resume = (props: Props) => {
//     return <div>Resume</div>;
// };

// export default function Component() {
//     return (
//         // <div
//         //     className={`flex flex-col min-h-[100dvh] ${
//         //         isDarkMode ? 'dark' : ''
//         //     }`}
//         // >
//         //     <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
//         //         <Link
//         //             href="#"
//         //             className="text-2xl font-bold"
//         //             prefetch={false}
//         //         >
//         //             John Doe
//         //         </Link>
//         //         <div className="flex items-center gap-4">
//         //             <Button
//         //                 variant="outline"
//         //                 className="md:hidden"
//         //                 onClick={() => {}}
//         //             >
//         //                 <MenuIcon className="h-6 w-6" />
//         //             </Button>
//         //             <Button
//         //                 variant="outline"
//         //                 className="hidden md:inline-flex"
//         //                 onClick={() => setIsDarkMode(!isDarkMode)}
//         //             >
//         //                 {isDarkMode ? (
//         //                     <SunIcon className="h-6 w-6" />
//         //                 ) : (
//         //                     <MoonIcon className="h-6 w-6" />
//         //                 )}
//         //             </Button>
//         //         </div>
//         //     </header>
//         //     <nav className="bg-primary text-primary-foreground px-6 py-4 md:hidden">
//         //         <div className="flex flex-col gap-4">
//         //             <Link
//         //                 href="#"
//         //                 className="hover:underline"
//         //                 prefetch={false}
//         //             >
//         //                 Resume
//         //             </Link>
//         //             <Link
//         //                 href="#"
//         //                 className="hover:underline"
//         //                 prefetch={false}
//         //             >
//         //                 Contact
//         //             </Link>
//         //         </div>
//         //     </nav>
//         //     <main className="flex-1 py-12 px-6 md:px-12 lg:px-24 dark:bg-[#1a1b1e] dark:text-primary-foreground">
//         //         <section
//         //             id="resume"
//         //             className="max-w-[8.27in] mx-auto bg-[#f5f5f5] dark:bg-[#1a1b1e] p-8 rounded-lg shadow-lg"
//         //         >
//         //             <div className="grid grid-cols-1 gap-6">
//         //                 <div className="bg-white dark:bg-[#2c2d30] p-6 rounded-lg shadow-md">
//         //                     <h2 className="text-2xl font-bold mb-4">
//         //                         John Doe
//         //                     </h2>
//         //                     <p className="text-muted-foreground dark:text-muted-foreground mb-2">
//         //                         Software Engineer
//         //                     </p>
//         //                     <p className="text-muted-foreground dark:text-muted-foreground mb-4">
//         //                         johndoe@example.com | (123) 456-7890
//         //                     </p>
//         //                     <h3 className="text-lg font-bold mb-2">Skills</h3>
//         //                     <ul className="list-disc pl-4 space-y-1">
//         //                         <li>JavaScript</li>
//         //                         <li>React</li>
//         //                         <li>Node.js</li>
//         //                         <li>SQL</li>
//         //                         <li>Git</li>
//         //                     </ul>
//         //                     <h2 className="text-2xl font-bold mt-8 mb-4">
//         //                         Experience
//         //                     </h2>
//         //                     <div className="space-y-4">
//         //                         <div>
//         //                             <h3 className="text-lg font-bold">
//         //                                 Software Engineer, Acme Inc.
//         //                             </h3>
//         //                             <p className="text-muted-foreground dark:text-muted-foreground">
//         //                                 June 2020 - Present
//         //                             </p>
//         //                             <ul className="list-disc pl-4 space-y-1 mt-2">
//         //                                 <li>
//         //                                     Developed and maintained web
//         //                                     applications using React, Node.js,
//         //                                     and SQL.
//         //                                 </li>
//         //                                 <li>
//         //                                     Collaborated with cross-functional
//         //                                     teams to design and implement new
//         //                                     features.
//         //                                 </li>
//         //                                 <li>
//         //                                     Participated in code reviews and
//         //                                     pair programming to ensure code
//         //                                     quality.
//         //                                 </li>
//         //                             </ul>
//         //                         </div>
//         //                         <div>
//         //                             <h3 className="text-lg font-bold">
//         //                                 Intern, Widgets Inc.
//         //                             </h3>
//         //                             <p className="text-muted-foreground dark:text-muted-foreground">
//         //                                 June 2019 - August 2019
//         //                             </p>
//         //                             <ul className="list-disc pl-4 space-y-1 mt-2">
//         //                                 <li>
//         //                                     Assisted in the development of a
//         //                                     web-based inventory management
//         //                                     system.
//         //                                 </li>
//         //                                 <li>
//         //                                     Participated in daily stand-up
//         //                                     meetings and sprint planning.
//         //                                 </li>
//         //                                 <li>
//         //                                     Gained experience in Agile
//         //                                     development methodologies.
//         //                                 </li>
//         //                             </ul>
//         //                         </div>
//         //                     </div>
//         //                     <h2 className="text-2xl font-bold mt-8 mb-4">
//         //                         Education
//         //                     </h2>
//         //                     <div>
//         //                         <h3 className="text-lg font-bold">
//         //                             Bachelor of Science in Computer Science
//         //                         </h3>
//         //                         <p className="text-muted-foreground dark:text-muted-foreground">
//         //                             University of Example, 2016 - 2020
//         //                         </p>
//         //                     </div>
//         //                 </div>
//         //             </div>
//         //         </section>
//         //     </main>
//         //     <footer className="bg-primary text-primary-foreground py-4 px-6 flex flex-col items-center justify-between gap-4 md:flex-row dark:bg-[#1a1b1e] dark:text-primary-foreground">
//         //         <p className="text-sm">© 2023 John Doe. All rights reserved.</p>
//         //         <Link
//         //             href="#"
//         //             download
//         //             className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors dark:bg-primary dark:text-primary-foreground"
//         //             prefetch={false}
//         //         >
//         //             <DownloadIcon className="h-5 w-5" />
//         //             Download Resume
//         //         </Link>
//         //     </footer>
//         // </div>
//     );
// }

// function DownloadIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//             <polyline points="7 10 12 15 17 10" />
//             <line
//                 x1="12"
//                 x2="12"
//                 y1="15"
//                 y2="3"
//             />
//         </svg>
//     );
// }

// function MenuIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <line
//                 x1="4"
//                 x2="20"
//                 y1="12"
//                 y2="12"
//             />
//             <line
//                 x1="4"
//                 x2="20"
//                 y1="6"
//                 y2="6"
//             />
//             <line
//                 x1="4"
//                 x2="20"
//                 y1="18"
//                 y2="18"
//             />
//         </svg>
//     );
// }

// function MoonIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
//         </svg>
//     );
// }

// function SunIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <circle
//                 cx="12"
//                 cy="12"
//                 r="4"
//             />
//             <path d="M12 2v2" />
//             <path d="M12 20v2" />
//             <path d="m4.93 4.93 1.41 1.41" />
//             <path d="m17.66 17.66 1.41 1.41" />
//             <path d="M2 12h2" />
//             <path d="M20 12h2" />
//             <path d="m6.34 17.66-1.41 1.41" />
//             <path d="m19.07 4.93-1.41 1.41" />
//         </svg>
//     );
// }

export {};
