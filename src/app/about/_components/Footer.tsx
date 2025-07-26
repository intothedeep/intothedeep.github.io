import React from 'react';

import GitHubIcon from '@/svgs/github.svg';
import LinkedInIcon from '@/svgs/linkedin.svg';

import './Footer.scss';

function Footer() {
    return (
        <footer>
            <div>
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
            <p>
                designed & built by
                <a
                    href="https://github.com/yujisatojr/react-portfolio-template"
                    target="_blank"
                    rel="noreferrer"
                >
                    Yuji Sato
                </a>
            </p>
        </footer>
    );
}

export default Footer;
