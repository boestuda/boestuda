import { BrowserRouter } from 'react-router-dom';
import RouteProvider from '../RouteProvider';
import { Toaster } from '@/components/ui/toaster';
import './input.css';
import { TooltipProvider } from '@/components/ui/tooltip';

const App = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <div className="min-h-screen">
          <RouteProvider />
        </div>
        <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  );
};

export default App;
