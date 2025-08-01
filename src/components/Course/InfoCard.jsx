import  React  from "react"

class MyPureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // shallow compare props
    for (let key in nextProps) {
      if (nextProps[key] !== this.props[key]) {
        return true; // re-render if prop changed
      }
    }
    // shallow compare state
    for (let key in nextState) {
      if (nextState[key] !== this.state[key]) {
        return true;
      }
    }
    return false; // skip re-render if no shallow change
  }

  render() {
    return this.props.children;
  }
}

class InfoCard extends MyPureComponent{
    render() {
    const { department, courses, faculty } = this.props.courseCatalog;
    return (
      <div>
        <div>{department}</div>
        <div>
          <ul>
            {courses.map((course) => (
              <li key={course.code}>
                {course.code}: {course.title} ({course.credits} credits)
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Faculty:</strong> {faculty.chair}, Office: {faculty.office}
        </div>
      </div>
    );
  }

}

export default InfoCard;