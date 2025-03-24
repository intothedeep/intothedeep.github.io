import React from 'react';
import clsx from 'clsx';

import GitHubIcon from '@/svgs/github.svg';
import LinkedInIcon from '@/svgs/linkedin.svg';

import './About.scss';

function Main() {
    return (
        <div
            className={clsx('container', [
                'min-w-full',
                'min-h-full',
                'flex-1',
            ])}
        >
            <link
                rel="preload"
                href="/home/taek_lim_avatar2.png"
                as="image"
            />

            <div className={clsx('about-section', 'flex-1')}>
                <div className="image-wrapper">
                    <img
                        src="/home/taek_lim_avatar2.png"
                        alt="Avatar"
                    />
                </div>
                <div className="content">
                    <div className="social_icons">
                        <a
                            href="https://github.com/tradelunch"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/tiotaeklim"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                    <h1>Taek Lim</h1>
                    <p>Software Engineer</p>
                    <p>Backend, Fronted, Mobile with React Native</p>

                    <div className="mobile_social_icons">
                        <a
                            href="https://github.com/tradelunch"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/intothedeep"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
