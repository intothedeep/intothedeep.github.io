import React from 'react';

import ReactIcon from '@/svgs/react.svg';
import DockerIcon from '@/svgs/docker.svg';
import PythonIcon from '@/svgs/python.svg';

import './Expertise.scss';
import clsx from 'clsx';

// 직접 Chip 컴포넌트 구현
const Chip = ({ label, className }: { label: string; className?: string }) => (
    <span
        className={clsx(`chip`, className, [
            'flex flex-wrap align-middle',
            'rounded-2xl',
            'm-1',
            'pt-0 pb-0 pl-2 pr-2',
            'text-center',
            'h-2',
            'font-bold',
            '',
        ])}
    >
        {label}
    </span>
);

const labelsFirst = [
    'React',
    'Next.js',
    'Vue',
    'Webpack',
    'Babel',
    'TypeScript',
    'JavaScript',
    'RxJS',
    'HTML5',
    'CSS3',
    'SASS',
    'Spring',
    'Java',
    'Spring Security',
    'Oauth2',
    'PostgreSQL',
    'MySQL',
    'C',
    'C++',
    'gRPC',
    'TCP/IP',
];

const labelsSecond = [
    'Git',
    'GitHub Actions',
    'Docker',
    'Linux',
    'Pandas',
    'Puppeteer',
    'AWS',
    'Oracle Cloud',
    'GCP',
    'Azure',
    'Prometheus',
    'Grafana',
    'Kafka',
    'Kubernetes - k3s',
];

const labelsThird = [
    'Python',
    'Tensorflow',
    'Numpy',
    'Pandas',
    'MetaPlotLib',
    'OpenAI',
    'Grok',
    'Claude',
    'Gemini',
    'DeepSeek',
    'Hugging Face',
    'Ollama',
    'Cursor',
    'Copilot',
];

function Expertise() {
    return (
        <div
            className={clsx('container', 'min-w-full')}
            id="expertise"
        >
            <div className="skills-container">
                <h1 className={''}>Expertise</h1>
                <div className="skills-grid">
                    <div className="skill">
                        <ReactIcon
                            width={52}
                            height={52}
                        />

                        <h3>Full Stack Web Development</h3>
                        <div className={clsx('font-bold')}>Mission</div>
                        <p className={clsx('m-1')}>
                            Do More with Less Resource
                        </p>
                        <div className={clsx('font-bold')}>Vision</div>
                        <p className={clsx('m-1')}>
                            Create positive value and deliver result
                        </p>
                        <p>
                            <span>
                                I specialize in JavaScript, TypeScript, React,
                                Vue, and RxJS for frontend development, and
                                Java, Spring Boot, Spring Security, OAuth2 for
                                backend systems. Additionally, I can design and
                                implement data pipelines, monitoring systems for
                                server metrics, and logging solutions to ensure
                                system observability and performance.
                            </span>
                        </p>

                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            <div
                                className={clsx('chip-wrapper', [
                                    'flex',
                                    'flex-wrap',
                                ])}
                            >
                                {labelsFirst.map((label, index) => (
                                    <Chip
                                        key={label}
                                        className="chip"
                                        label={label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="skill">
                        <DockerIcon
                            width={52}
                            height={52}
                        />

                        <h3>DevOps & Automation</h3>
                        <p>
                            With expertise in AWS, Oracle Cloud, Azure, and GCP,
                            I streamline DevOps processes by implementing CI/CD
                            pipelines using Kubernetes - K3s, Jenkins and GitHub
                            Actions. I ensure fully automated deployments,
                            leveraging best practices in version control with
                            Git to enhance reliability, scalability, and
                            efficiency in software delivery.
                        </p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            <div
                                className={clsx('chip-wrapper', [
                                    'flex',
                                    'flex-wrap',
                                ])}
                            >
                                {labelsSecond.map((label, index) => (
                                    <Chip
                                        key={label}
                                        className="chip"
                                        label={label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="skill">
                        <PythonIcon
                            width={52}
                            height={52}
                        />

                        <h3>AI & GenAI & LLM</h3>
                        <p>
                            Stay relevant in the market by leveraging the latest
                            AI solutions in my daily life. I have experienced
                            model training using python and tensorflow and data
                            analysis. To enhance my productivity, I leverage
                            leading AI platforms including OpenAI, Claude,
                            Gemini, Grok, DeepSeek, Hugging Face, Ollama,
                            Cursor, and Copilot.
                        </p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            <div
                                className={clsx('chip-wrapper', [
                                    'flex',
                                    'flex-wrap',
                                ])}
                            >
                                {labelsThird.map((label, index) => (
                                    <Chip
                                        key={label}
                                        className="chip"
                                        label={label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expertise;
