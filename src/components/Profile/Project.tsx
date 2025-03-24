'use client';

import React from 'react';
import mock01 from './images/mock01.png';
import mock02 from './images/mock02.png';
import mock03 from './images/mock03.png';
import mock04 from './images/mock04.png';
import mock05 from './images/mock05.png';
import mock06 from './images/mock06.png';
import mock07 from './images/mock07.png';
import mock08 from './images/mock08.png';
import mock09 from './images/mock09.png';
import mock10 from './images/mock10.png';

import './Project.scss';
import clsx from 'clsx';

function Project() {
    return (
        <div
            className="projects-container"
            id="projects"
        >
            <h1 id="project">Projects</h1>

            <div className="projects-grid">
                <div className="project">
                    <a
                        href="https://app.adriel.com/react/dashboard/shared.html?viewKey=znkIMYdn9vbYVTiU&forDemo=1&accountId=0&lang=ko&baseUrl=https%3A%2F%2Fapp.adriel.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <video
                            className="zoom"
                            autoPlay={true}
                            muted={true}
                            loop={true}
                            playsInline={true}
                            preload="auto"
                            width="100%"
                            height="auto"
                            poster="https://cdn.prod.website-files.com/646742ada26b6e8f3a12171d/6555913fd8421d8c5911b130_BI_PDF_1.jpg"
                        >
                            <source
                                src="https://www.dropbox.com/scl/fi/aoeagq7d6c2lrwkxm0b0s/AE_03_PDF-_short_V4.mp4?rlkey=ik1nb5emnnfjkxi0zheed0yn5&amp;dl=0&amp;raw=1"
                                type="video/mp4"
                            />
                            <source
                                src="https://www.dropbox.com/scl/fi/aoeagq7d6c2lrwkxm0b0s/AE_03_PDF-_short_V4.mp4?rlkey=ik1nb5emnnfjkxi0zheed0yn5&amp;dl=0&amp;raw=1"
                                type="video/ogg"
                            />
                        </video>
                    </a>

                    <a
                        href="https://app.adriel.com/react/dashboard/shared.html?viewKey=znkIMYdn9vbYVTiU&forDemo=1&accountId=0&lang=ko&baseUrl=https%3A%2F%2Fapp.adriel.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Adriel BI Dashboard
                        </h2>
                    </a>
                    <p>
                        Marketing Dashboard – A multichannel marketing data
                        aggregation platform for marketers and teams. It enables
                        analysis, visualization, reporting, and data sharing.
                        Built with TypeScript, React, Vue, React Query, Jotai,
                        RxJS, and Web Workers.
                    </p>
                </div>

                <div className="project">
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <figure>
                            <img
                                src={'/home/oauth2_bytebytego.jpg'}
                                className="zoom"
                                alt="bytebytego oauth2 reference"
                                width="100%"
                            />
                            <figcaption>PIC from ByteByteGo</figcaption>
                        </figure>
                    </a>
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Tradelunch OAuth2 Security Architecture
                        </h2>
                    </a>
                    <p>
                        Designed and implemented a comprehensive OAuth2 security
                        ecosystem for Tradelunch, building custom authorization,
                        resource, and client servers using Spring Security and
                        Java. This solution provides secure authentication and
                        authorization protocols while maintaining robust API
                        access control across the platform.
                    </p>
                </div>

                <div className="project">
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={'/home/puppeteer_icon.png'}
                            className={clsx('zoom', '!object-contain')}
                            alt="auto songdo booking puppetter icon"
                            width="100%"
                        />
                    </a>
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Auto Reservation Bot for Freediving Instructors
                        </h2>
                    </a>
                    <p>
                        Auto reservation bot for freediving instructors, built
                        with React, Electron, and Puppeteer. It automates pool
                        bookings, runs on Windows & macOS, and saves time by
                        securing slots efficiently.
                    </p>
                </div>

                <div className="project">
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <figure>
                            <img
                                className={clsx('zoom', '!object-contain')}
                                src={'/home/mapreduce_flow.png'}
                                alt="map reduce flow project"
                                width="100%"
                            />
                            <figcaption>PIC from GeeksForGeeks</figcaption>
                        </figure>
                    </a>
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Map/Reduce Application
                        </h2>
                    </a>
                    <p>C++, gRPC, non-blocking/Asynchronous</p>
                </div>

                <div className="project">
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={'/home/dfs_grpc.png'}
                            className={clsx('zoom', '!object-contain')}
                            alt="distributed file system c++ grpc"
                            width="100%"
                        />
                    </a>
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Distributes File System
                        </h2>
                    </a>
                    <p>C++, gRPC</p>
                </div>

                <div className="project">
                    <a
                        href="#project"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <figure>
                            <img
                                src={'/home/socket_c_tcp_flow.png'}
                                className={clsx('zoom', '!object-contain')}
                                alt="State diagram for server and client model of Socket"
                                width="100%"
                            />
                            <figcaption>PIC from GeeksForGeeks</figcaption>
                        </figure>
                    </a>
                    <a
                        href="#project"
                        // target="_blank"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <h2 className={clsx(['font-bold', 'project-header'])}>
                            Socket and TCP/IP Multi-threading http server
                        </h2>
                    </a>
                    <p>C, socket, TCP/IP, Http Protocol implementation</p>
                </div>
            </div>
        </div>
    );
}

export default Project;
