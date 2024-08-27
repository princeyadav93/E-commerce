import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Compnents/Header/Header'
import Loading from './Utils/Loading.jsx'

function App() {
  const navigation = useNavigation();
  console.log(navigation.state);

  if (navigation.state === "loading") return <Loading />
  if (navigation.state === "submitting") return <Loading />
  // if (navigation.state === "idle") return <Loading />
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
