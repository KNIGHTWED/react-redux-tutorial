# Redux를 사용한 애플리케이션 상태 관리

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
































useDispatch 와 useCallback을 함께 사용해야 성능이 좋아진다.
