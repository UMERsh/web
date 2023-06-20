import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'react-toastify/dist/ReactToastify.css'

import Routes from './routes/Routes';
import AuthContextProvider from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
        {/* react toastify */}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthContextProvider>
    </>
  );
}

export default App;
