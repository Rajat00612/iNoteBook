
import Notes from './Notes'


const Home = (props) => {
const {showAlert}= props;
  return (
    <>
    <div className='vh-100'>

      <Notes showAlert={showAlert} />
    </div>
    
    </>
  )
}

export default Home
