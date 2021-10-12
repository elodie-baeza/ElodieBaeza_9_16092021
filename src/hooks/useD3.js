import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
/**
 * Custom Hook: 
 * Encapsulate D3.js logic in a chart component and be sure the chart is updated as new data arrives
 * @function
 */

// renderChartFn is a callback that contains D3.js code to be executed
export const useD3 = (renderChartFn) => {
  //useRef est comme une « boîte » qui pourrait contenir une valeur modifiable dans sa propriété .current
  const ref = useRef()

  // Hook useEffect: similaire à componentDidMount et componentDidUpdate dans un composant class
  useEffect(() => {
    renderChartFn(d3.select(ref.current))
    return () => {}
  }, [renderChartFn])

  return ref
}

