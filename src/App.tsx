import './App.css';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import Calendar from './components/Calendar/Calendar';
import TodoList from './components/TodoList/TodoList';
import AuthForm from './components/Authform/Authform';


function App() {
    return (
        <GlobalContextProvider>
            <AuthForm />
        </GlobalContextProvider>
    );
}
// function App() {
//     return (
//         <GlobalContextProvider>
//             <Calendar />
//             <TodoList />
//         </GlobalContextProvider>
//     );
// }

export default App;
