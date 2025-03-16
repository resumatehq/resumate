'use client';

import useCanvasCursor from '@/hooks/use-canvasCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return <canvas className='pointer-events-none z-50 fixed inset-0 hidden lg:block' id='canvas' />;
};
export default CanvasCursor;
