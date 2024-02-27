import ReactDOM from 'react-dom/client'
import "./css/index.module.css"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
// {/* <React.StrictMode> */}
        <ThemeProvider>

            <BrowserRouter>
                <App />
            </BrowserRouter>

        </ThemeProvider>
        // </React.StrictMode>
)
