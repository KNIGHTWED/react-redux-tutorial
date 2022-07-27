import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';


const App = () => {
  return (
    <div>
      <CounterContainer/>
      {console.log('카운터컨테이너 생성')}
      <hr />
      <TodosContainer />
      {console.log('투두컨테이너 생성')}
    </div>
  );
};

export default App;