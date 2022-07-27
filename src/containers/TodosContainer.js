import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useActions';

// useSelector
const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  // const dispatch = useDispatch();
  // const onChnageInput = useCallback(input => dispatch(changeInput(input)),[dispatch]);
  // const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);

  const [onChnageInput, onInsert, onToggle, onRemove] = useActions([changeInput, insert, toggle, remove],[]);

  return (
    <Todos
    input={input}
    todos={todos}
    onChnageInput={onChnageInput}
    onInsert={onInsert}
    onToggle={onToggle}
    onRemove={onRemove}
    />
  );
}

export default TodosContainer;

// connect
// const TodosContainer = ({input, todos, changeInput, insert, toggle, remove}) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChnageInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

// export default connect(
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove,
//   },
// )(TodosContainer);
