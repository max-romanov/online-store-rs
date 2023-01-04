import {observer} from "mobx-react-lite";

export const ErrorLabel = observer((error: boolean) => {
  return (
    <div>
      <p>{error ? "error!!!" : 'okay'}</p>
    </div>
  )
})
