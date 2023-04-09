// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, onToggleStar, formatDate} = props
  const {title, date, id, isStared} = appointment
  const formattedDate = formatDate(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStar = () => {
    onToggleStar(id)
  }
  const star = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item">
      <div className="head-date-container">
        <p className="list-title">{title}</p>
        <p className="list-date">{formattedDate}</p>
      </div>
      <div className="star-container">
        <button
          type="button"
          className="star-button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={star} alt="star" className="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
