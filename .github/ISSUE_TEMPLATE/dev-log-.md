---
name: 'DEV LOG '
about: 'DEV LOG template '
title: "[DEV LOG]"
labels: ''
assignees: ''

---

**오늘은 어떻게 프로젝트에 기여했나요?**

* 특정 요청에 대한 확인/취소를 유저가 결정할 수 있는 alter modal을 개발했다. 브라우저 내장 alter 속성을 사용하지 않고 프로젝트 자체에서 재사용하기 쉬운 모달 컴포넌트로 구성할 수 있었다.

* styled-component에서 prop에 css 적인 제약을 거는 방법을 학습하고 같은 포지션의 팀원과 그 내용을 나누었다.

**오늘의 프로젝트에서 힘든 점은 무엇인가요?**

* input에서 관리하는 상태값 변경 로직을 유틸리티 함수로 구분하고 싶은데, 쉽지가 않다.
```jsx
const useInputHook = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const handleInput = useCallback((e) => {
    setValue(e.target.value)
  }, []);
  // 여기서 변경된 value 상태만 리턴하면 되지 않을까?
```

}
**내일은 프로젝트에 기여하기 위해 무엇을 해야 하나요?**

 * useInputHook 함수를 모듈로 구분해서 hook 폴더에 반영하기
 * customHook으로 구분할 수 있는 단순 상태값 변경 함수가 있을지 고민해보고 팀원들과 이야기하기
