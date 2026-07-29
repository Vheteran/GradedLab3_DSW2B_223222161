function StudentCard({ student, likes, onLike }) {
  return (
    <article className="student-card">
      <img src={student.image} alt={`${student.fullName} profile`} className="profile-image" />
      <div className="student-details">
        <h2>{student.fullName}</h2>
        <p>
          <strong>Student Number:</strong> {student.studentNumber}
        </p>
        <p>
          <strong>Qualification:</strong> {student.qualification}
        </p>
        <div className="like-section">
          <button type="button" className="like-button" onClick={onLike}>
            Like Profile
          </button>
          <span className="like-count">Likes: {likes}</span>
        </div>
      </div>
    </article>
  )
}

export default StudentCard
