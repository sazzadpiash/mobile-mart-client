import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/PublicRoute'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
