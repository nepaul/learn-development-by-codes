import xstream from 'xstream';
import { run } from '@cycle/run';
import { div, button, p, makeDOMDriver } from '@cycle/dom';


function main(sources) {
  const action$ = xstream.merge(
    sources.DOM.select('.decrement').evnets('click').map(ev => -1),
    sources.DOM.select('.increment').events('click').map(ev => +1)
  );

  const count$ = action$.fold((acc, x) => acc + x, 0);

  const vdom$ = count$.map(count =>
    div([
      button('.decrement', 'Decrement'),
      button('.increment', 'Increment'),
      p('Countter: ' + count)
    ])
  );

  return {
    DOM: vdom$,
  };
}


run(main, {
  DOM: makeDOMDriver('#main')
})
