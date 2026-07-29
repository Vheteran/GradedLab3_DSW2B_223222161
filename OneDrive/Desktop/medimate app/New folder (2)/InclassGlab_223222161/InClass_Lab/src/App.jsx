import { useEffect, useState } from 'react'
import Header from './components/Header'
import StudentCard from './components/StudentCard'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [student, setStudent] = useState({
    fullName: 'Karabo Okeke',
    studentNumber: '223222161',
    qualification: 'Diploma in  Business Information Technology',
    image: '/profile-picture.svg',
  })
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    if (likes > 0) {
      console.log('Profile liked.')
    }
  }, [likes])

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1)
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <section className="info-panel">
          <h2>Profile Details</h2>
          <label>
            Full Name
            <input
              value={student.fullName}
              onChange={(event) =>
                setStudent({ ...student, fullName: event.target.value })
              }
            />
          </label>
          <label>
            Student Number
            <input
              value={student.studentNumber}
              onChange={(event) =>
                setStudent({ ...student, studentNumber: event.target.value })
              }
            />
          </label>
          <label>
            Qualification
            <input
              value={student.qualification}
              onChange={(event) =>
                setStudent({ ...student, qualification: event.target.value })
              }
            />
          </label>
        </section>

        <StudentCard student={student} likes={likes} onLike={handleLike} />
      </main>
      <Footer />
    </div>
  )
}

export default App
