import './App.css';
import TodoList from "./TodoList"

function App() {
  return (
    <div className="App">
      <h1>ToDoリスト</h1>
      <p>タスクをクリックすると編集できます。</p>
      <TodoList />
    </div>
  );
}

export default App;
