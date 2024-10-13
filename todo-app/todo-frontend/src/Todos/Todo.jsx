const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = () => {
    deleteTodo(todo);
  };

  const onClickComplete = () => {
    completeTodo(todo);
  };

  return (
    <div
      className='todo'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
      }}
    >
      <span>{todo.text}</span>
      <span>
        {todo.done ? (
          <>
            <span>This todo is done</span>
            <button onClick={onClickDelete}>Delete</button>
          </>
        ) : (
          <>
            <span>This todo is not done</span>
            <button onClick={onClickDelete}>Delete</button>
            <button onClick={onClickComplete}>Set as done</button>
          </>
        )}
      </span>
    </div>
  );
};

export default Todo;
