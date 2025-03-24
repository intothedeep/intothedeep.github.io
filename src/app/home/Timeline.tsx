'use client';

import React from 'react';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import BriefcaseIcon from '@/svgs/briefcase.svg';

import './Timeline.scss';

function Timeline() {
    return (
        <div id="history">
            <div className="items-container">
                <h1>Career History</h1>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background: 'white',
                            color: 'rgb(39, 40, 34)',
                        }}
                        contentArrowStyle={{ borderRight: '7px solid  white' }}
                        date="Jan 2025 - May 2026"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            University of Central Missouri
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            Warrensburg, MO
                        </h4>
                        <p>
                            <span></span>
                            <span>
                                M.S. Graduate Student <br />
                                Operating Systems, Computer Networks,
                                Algorithms, AI, Java
                            </span>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background: 'white',
                            color: 'rgb(39, 40, 34)',
                        }}
                        contentArrowStyle={{ borderRight: '7px solid  white' }}
                        date="Dec 2024 - Current"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            TradeLunch
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            Seoul, South Korea
                        </h4>
                        <p>
                            <span>
                                Software Engineer - Web/Mobile Application
                                Engineer
                            </span>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="Jan 2024 - Dec 2026"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            Georgia Institute of Technology
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            Atlanta, GA
                        </h4>
                        <p>
                            <span>
                                M.S. Graduate Student - Online <br />
                                Specialization in Machine Learning
                            </span>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="Nov 22, 2021 - May 17, 2024"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            Senior Software Engineer - Frontend
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            ADRIEL, Seoul, South Korea
                        </h4>
                        <p>
                            <span>
                                Marketing dashboard - multi ad platform data
                                aggregation, visualizing, analyzing, sharing,
                                reporting - Javascript, Typescript, React, Vue,
                                RxJS
                            </span>

                            <a
                                className="font-black"
                                target="_blank"
                                href="https://app.adriel.com/react/dashboard/shared.html?viewKey=znkIMYdn9vbYVTiU&forDemo=1&accountId=0&lang=ko&baseUrl=https%3A%2F%2Fapp.adriel.com"
                            >
                                example
                            </a>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="May 16, 2021 - Oct 24, 2021"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            Fullstack developer
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            DIV, Jeju, South Korea
                        </h4>
                        <p>
                            <span>
                                Rent a car platform Web/Mobile/IOS/AOS
                                application
                            </span>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="July 8, 2019 - Nov 22, 2019"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            Software Engineer
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            BabelTop, Seoul, South Korea
                        </h4>
                        <p>
                            <span>
                                I developed the sign-in/sign-up and translator
                                registration features for a translator platform.
                                Built using React, Redux, Redux-Saga, with
                                server-side rendering for improved performance.
                            </span>
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="Feb 18, 2018 - Jul 8, 2019"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            Junior Software Engineer
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            Recobell, Seoul, South Korea
                        </h4>
                        <p>
                            <span>
                                Personalized Recommendation Solution - Logger
                                SDK, Logger Collector using AWS Kinesis, SQL
                                based Recommendation Engine, Recommendation API
                                server, AWS infrastructure
                            </span>
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="Sep 22, 2008 - Mar 22, 2013"
                        iconStyle={{
                            background: '#5000ca',
                            color: 'rgb(39, 40, 34)',
                        }}
                        icon={
                            <BriefcaseIcon
                                width={32}
                                height={32}
                            />
                        }
                    >
                        <h3 className="vertical-timeline-element-title">
                            University of California, Los Angeles
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            Los Angeles, CA
                        </h4>
                        <p>
                            <span>B.S. Mathematics - Economics</span>
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    );
}

export default Timeline;
