# Redux를 사용한 애플리케이션 상태 관리

소규모 프로젝트는 state를 사용한 상태 관리로 충분하지만

대규모 프로젝트에서는 상태 관리가 복잡해질 수 있다.

리덕스를 사용하면 상태 업데이트에 관한 로직을 따로 분리하여 코드를 유지 보수하는데 도움이 된다.

여러 컴포넌트에서 동일한 상태를 공유할 때 매우 유용하며, 실제 업데이트할 때 필요한 컴포넌트만 리렌더링 되도록 최적화 해준다.

```
$ yarn add redux react-redux
```

## 모듈 생성

액션 타입 정의 - 액션 생성 함수 - 초기 상태 선언 - reducer 함수

위와 같은 순서로 만들면 된다.

### 액션 타입 정의, 액션 생성 함수

modules/counter.js
```javascript
const INCREASE = 'counter/INCREASE'; // 타입 정의
const DECREASE = 'counter/DECREASE'; // 타입 정의

export const increase = () => ({ type: INCREASE}); // 액션 생성 함수
export const decrease = () => ({ type: DECREASE}); // 액션 생성 함수
```


### 초기 상태

```javascript
const initialState = {
  number: 0
}
```


### reducer 함수

```javascript
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREASE:
      return{
        number: state.number + 1
      };
    case DECREASE:
      return{
        number: state.number - 1
      }
    default:
      return state;
  }
}

export default counter;
```

### export 와 export default

module을 export 할 때

export 와 export default 가 있다.

export는 여러 개를 내보낼 수 있다.

export default는 단 한개만 내보낼 수 있다.

불러오는 방식에도 차이가 있다.
```javascript
import counter from './counter'; // export default로 내보낼 때
import { increase, decrease} from './counter'; // export로 내보낼 때

// 한꺼번에 불러와도 된다.
import counter, { increase, decrease } from './counter';
```


## 루트 리듀서 만들기

[modules/index.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/modules/index.js)

파일 이름을 `index.js`로 설정하면 나중에 불러올 때 디렉터리 이름만 입력해도 불러올 수 있다.

```javascript
import rootReducer from './modules';
```

## 리덕스 적용하기

### 스토어, Provider 컴포넌트 사용

[src/index.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/index.js)


```javascript
import { createStore} from 'redux';
import rootReducer from './moduls';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Redux DevTools 설치 및 적용
크롬 웹 스토어에서 검색

```
$ yarn add redux-devtools-extension
```
둘 다 적용해야 함.

```javascript
import { composeWithDevTools } from 'redux-devtools-extention';

const store = createStore(rootReducer, composeWithDevTools());
```

1. 개발자 도구에서 Redux 선택
2. 리덕스 개발자 도구 안의 State 버튼 클릭
3. 스토어 내부의 상태 확인

## 컨테이너 컴포넌트 만들기

`containers/CounterContainer.js`

```javascript
import React from 'react';
import counter from '../components/counter';

const CouterContainer = () => {
  return <Counter />;
};

export default CounterContainer
```

react-redux에서 제공하는 connect 함수를 사용해야 리덕스와 연동된다.

`connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)`

```javascript
import { connect } from 'react-redux';

const Countercontainer = ({ number, increase, decrease }) => {
  return(
    <Counter
      number={number}
      onIncrease={increase}
      onDecrease={decrease} />
  );
};

const mapStateToProps = state => ({
  number: state.counter.number
});
const mapDispatchToProps = dispatch => ({
  increase: () => {
    console.log('increase');
  },
  decrease: () => {
    console.log('decrease');
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);
```

App.js

```javascript
import React from 'react';
import Todos from './components/Todos';
import CounterContainer from './containers/CounterContainer';

const App = () => {
  return(
    <div>
      <CounterContainer />
      <hr />
      <Todos />
    <div />
  );
};

export default App;
```
나중에 Todos도 TodosContainer를 만들면 CounterContainer와 같이 바뀐다.

CounterContainer.js 에서

`import { increase, decrease } from '../modules/counter';`
추가해준다.

`console.log('increase');` 대신 `dispatch(increase());` 로 바꿔준다.

decrease도 바꿔준다.

액션 생성 함수를 dispatch 해줘서 정상적으로 동작하게 된다.

connect 함수 내부의 익명함수 형태로 만들어도 문제는 없다.

```javascript
export default connect(
  state => ({
    number: state.counter.number,
  }),
  dispatch => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease())
  })
)(CounterContainer);
```

만약 액션 생성 함수의 개수가 많아질 때는 리덕스의 bindActionCreators 유틸 함수를 사용하면 간편해진다.

```javascript
import { bindActionCreators } from 'redux';

export default connect(
  state => ({
    number: state.counter.number,
  }),
  dispatch => 
    bindActionCreators(
      {
        increase,
        decrease
      },
      dispatch
    )
)(CounterContainer);
```

위의 방법보다 더 편한 방법은 mapDispatchToProps에 해당하는 파라미터를

함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주는 것이다.

```javascript
export default connect(
  state => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease
  }
)(CounterContainer);
```

TodosContainer.js 도 이와 같은 방법으로 만들면 된다.


## redux-actions 와 immer 라이브러리 활용

### redux-actions

```
$ yarn add redux-actions
```

[modules/counter.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/modules/counter.js)

액션 생성 함수는 `createAction`, 
리듀스는 `handleActions` 를 사용하면 코드 가독성이 높아진다.


### immer

```
$ yarn add immer
```

[modules/todos.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/modules/todos.js)

immer를 사용하면 코드가 더 길어질 수 있기 때문에 immer를 꼭 적용할 필요는 없다.

## Hooks

connect 함수 대신 react-redux 에서 제공하는 Hooks를 사용할 수 있다.

### useSelector

const 결과 = useSelector(상태 선택 함수);

[containers/CounterContainer.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/containers/CounterContainer.js)

Counter 태그 안에 `onIncrease={() => dispatch(increase())}` 를 써주면 된다.

여기서 성능을 최적화하고 싶다면 useCallback으로 액션을 디스패치하는 함수를 감싸 주는 것이 좋다.

태그에 직접 함수를 만들면 렌더링할 때마다 함수가 생성되지만 useCallback을 사용하면 렌더링할 때 함수를 실행만 하면 된다.

### useStore

useStore는 컴포넌트에서 스토어에 직접 접근해야 하는 상황에만 사용해야 한다. 사용할 일이 흔치 않다.

### useActions 유틸 Hook

[React Redux 의 useActions()](https://react-redux.js.org/api/hooks#recipe-useactions)
useActions Hook 은 액션 생성 함수를 액션을 디스패치하는 함수로 변환해준다.

액션 생성 함수를 사용하여 액션 객체를 만들어 스토어에 디스패치하는 작업을 해주는 함수를 자동으로 만들어 준다.

useActions 에 파라미터로 **액션 생성 함수로 이루어진 배열**과 **deps 배열**이 필요하다.

[lib/useActions.js](https://github.com/KNIGHTWED/react-redux-tutorial/blob/main/src/lib/useActions.js)



## 성능 최적화

1. useCallback
2. React.memo()

React.memo() 는 부모 컴포넌트가 리렌더링 될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링 되지 않도록 방지해준다.

지금과 같은 경우는 TodosContainer의 부모 컴포넌트인 App 컴포넌트가 리렌더링 될 일이 없어 풀필요한 성능 최적화이다.
