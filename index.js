import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

function LoadingView(props) {
    return (
        <>
            <div id="header">
                <p>Header loading...</p>
            </div>
            <div id="wrapper">
                <div id="content">
                    <p>Content loading...</p>
                </div>
            </div>
        </>
    );
}

const Main = lazy(() => import('./Main'));

const App = () => (
    <Suspense fallback={LoadingView()}>
        <Main />
    </Suspense>
);

let container = document.createElement('div');
ReactDOM.render(<App />, container);
let app = document.getElementById('app');
app.appendChild(container);
let renderedHeader = container.querySelector('#header');
app.querySelector('#header').replaceWith(renderedHeader);
app.querySelector('#wrapper').replaceWith(container.querySelector('#wrapper'));
