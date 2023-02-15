import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {

  // todoのstate
  // ???
  // 初期値に空の配列を使用する代わりに関数を使用できる
  // この関数は初回レンダリングのみ実行される
  const [todos, setTodos] = useState(() => {
    // ローカルストレージからtodoを取得
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      // JSONオブジェクトをJavaScriptに戻して返す
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // inputで入力された内容のstate
  const [addTodo, setAddTodo] = useState("");

  // 編集編集中かどうかを知るためのstate
  const [isEdit, setIsEdit] = useState(false);

  // ???
  // オブジェクトの状態を設定して編集中の todo アイテムがわかるようにする
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    // ???
    // localstorageは文字列をキーと値として保存
    // ゆえに配列とオブジェクトは格納不可
    // JSON.stringify()でJSON文字列に変換する
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  // inputで入力された値を取得してAddTodoを更新する関数
  const handleInputChange = (e) => {
    setAddTodo(e.target.value);
  };

  // フォーム送信時にtodosを更新する関数
  const handleFormSubmit = (e) => {
    // 送信時にページ更新しないようにする
    e.preventDefault();
    // 入力(addTodo)が空の場合は送信しない→空でなければsetTodosで更新
    // trim()は入力から文字列を変えずに両端の空白だけ削除する
    if (addTodo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: addTodo.trim() }]);
    }
    // フォームの内容を元に戻す
    setAddTodo("");
  };

  // todoリストから削除する関数
  // ここの id という引数がよく分からない
  const handleDeleteClick = (id) => {
    // 削除条件に一致しないtodoを返す
    const removeItem = todos.filter(todo => todo.id !== id);
    setTodos(removeItem)
  };

  // ??? (編集機能の設定が全体的によく分かっていない)
  // 編集入力の値を取得し、新しい状態を設定する関数
  const handleEditInputChange = (e) => {
    // 新しい状態値を編集入力ボックスの現在の値に設定
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo)
  }


  //編集したフォームが送信された時に更新する関数 
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, CurrentTodo)
  };

  // 編集ボタンがクリックされたときに処理する関数
  const handleEditClick = (todo) => {
    setIsEdit(true);
    // 選択されたtodoの項目をcurrentTodoに設定する
    setCurrentTodo({ ...addTodo });

  };

  // ???
  // 更新された値をtodosに追加する
  const handleUpdateTodo = (id, updatedTodo) => {
    // idが一致する場合2番目のパラメータを使って更新されたtodoオブジェクトを返す
    // falseなら更新せず元々のtodosを返す
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEdit(false);
    setTodos(updateItem)
  }
    
  return (
    <div className="App">
      {isEdit ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}  //更新の値はcurrentTodoに設定されてる
            onChange={handleEditInputChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>Add Todo</h2>
          <label htmlFor="todo">Add todo: </label>
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={addTodo}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
