import React from 'react';

import './Home.scss';
import clsx from 'clsx';

type Props = {};

export const Home = (props: Props) => {
    return (
        <main>
            <div className="card-container">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((v) => {
                    return (
                        <section
                            className="content"
                            key={v}
                        >
                            <div
                                className={clsx(
                                    'img-wrapper',
                                    'w-full',
                                    'relative',
                                    'h-48'
                                )}
                            >
                                <img
                                    src="/v1/imgs/sun.webp"
                                    className={clsx(
                                        'object-cover',
                                        'block',
                                        'absolute',
                                        'w-full',
                                        // "h-full",
                                        'caret-transparent',
                                        'h-42',
                                        'cursor-pointer'
                                    )}
                                />
                            </div>

                            <div className={clsx('p-4 flex flex-1 flex-col')}>
                                <h3>Card 1</h3>
                                <div className={clsx('flex-1')}>
                                    <p className={clsx('scss')}>
                                        This is a sample card. Move your mouse
                                        to see the fading cursor effect over a
                                        responsive grid layout. This is a sample
                                        card. Move your mouse to see the fading
                                        cursor effect over a responsive grid
                                        layout. This is a sample card. Move your
                                        mouse to see the fading cursor effect
                                        over a responsive grid layout. This is a
                                        sample card. Move your mouse to see the
                                        fading cursor effect over a responsive
                                        grid layout. This is a sample card. Move
                                        your mouse to see the fading cursor
                                        effect over a responsive grid layout.
                                    </p>
                                </div>
                                <div>2025.02.08</div>
                            </div>
                            <div className={clsx('flex')}>
                                ---------card footer
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
};

export default Home;
