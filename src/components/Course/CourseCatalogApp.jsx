import InfoCard from "../Course/InfoCard.jsx";
import React from "react";

const courseCatalog = [
  {
    department: "Computer Science",
    courses: [
      { code: "CS101", title: "Intro to Programming", credits: 3 },
      { code: "CS201", title: "Data Structures", credits: 4 },
    ],
    faculty: {
      chair: "Dr. Smith",
      office: "Room 101",
    },
    id: 1,
  },
  {
    department: "Mathematics",
    courses: [
      { code: "MATH101", title: "Calculus I", credits: 4 },
      { code: "MATH201", title: "Linear Algebra", credits: 3 },
    ],
    faculty: {
      chair: "Dr. Allen",
      office: "Room 202",
    },
    id: 2,
  },
];

class CourseCatalogApp extends React.Component {
  state = {
    courseCatalog: [...courseCatalog],
  };

//   // a. Change "Mathematics" to "Applied Math"
//   changeDepartment = () => {
//     this.setState((prevState) => ({
//       courseCatalog: prevState.courseCatalog.map((dept) =>
//         dept.department === "Mathematics"
//           ? { ...dept, department: "Applied Math" }
//           : dept
//       ),
//     }));
//   };

//   // b. Add a new course to "Computer Science"
//   addCourse = () => {
//     const newCourse = {
//       code: "CS301",
//       title: "Algorithms",
//       credits: 4,
//     };

//     this.setState((prevState) => ({
//       courseCatalog: prevState.courseCatalog.map((dept) =>
//         dept.department === "Computer Science"
//           ? { ...dept, courses: [...dept.courses, newCourse] }
//           : dept
//       ),
//     }));
//   };

//   // c. Remove "Linear Algebra" from "Mathematics"
//   removeCourse = () => {
//   this.setState((prevState) => ({
//     courseCatalog: prevState.courseCatalog.map((dept) => ({
//       ...dept,
//       courses: dept.courses.filter(
//         (course) => course.title !== "Linear Algebra"
//       ),
//     })),
//   }));
// };

//   // d. Change Dr. Smith’s office to "Room 111"
//   updateFacultyOffice = () => {
//     this.setState((prevState) => ({
//       courseCatalog: prevState.courseCatalog.map((dept) =>
//         dept.faculty.chair === "Dr. Smith"
//           ? { ...dept, faculty: { ...dept.faculty, office: "Room 111" } }
//           : dept
//       ),
//     }));
//   };

  handleUpdate = () => {
    //1 Change "Mathematics" to "Applied Math"
    this.setState((prevState) => ({
      courseCatalog: prevState.courseCatalog.map((dept) =>
        dept.department === "Mathematics"
          ? { ...dept, department: "Applied Math" }
          : dept
      ),
    }));
    //2 Add a new course to "Computer Science"
    const newCourse = {
      code: "CS301",
      title: "Algorithms",
      credits: 4,
    };

    this.setState((prevState) => ({
      courseCatalog: prevState.courseCatalog.map((dept) =>
        dept.department === "Computer Science"
          ? { ...dept, courses: [...dept.courses, newCourse] }
          : dept
      ),
    }));
    //3 Remove "Linear Algebra" from "Mathematics"
    this.setState((prevState) => ({
      courseCatalog: prevState.courseCatalog.map((dept) => ({
        ...dept,
        courses: dept.courses.filter(
          (course) => course.title !== "Linear Algebra"
        ),
      })),
    }));
    //4 Change Dr. Smith’s office to "Room 111"
    this.setState((prevState) => ({
      courseCatalog: prevState.courseCatalog.map((dept) =>
        dept.faculty.chair === "Dr. Smith"
          ? { ...dept, faculty: { ...dept.faculty, office: "Room 111" } }
          : dept
      ),
    }));
  }

  render() {
    return (
      <>
        <h3>Course App</h3>
        <div>
          {/* <button onClick={this.changeDepartment}>
            Change Mathematics to Applied Math
          </button>
          <button onClick={this.addCourse}>Add Algorithms to CS</button>
          <button onClick={this.removeCourse}>
            Remove Linear Algebra
          </button>
          <button onClick={this.updateFacultyOffice}>
            Update Dr. Smith's Office
          </button> */}
          <button onClick={this.handleUpdate}>
            Handle Changes
          </button>
        </div>
        <ul>
          {this.state.courseCatalog.map((courseCatalog) => (
            <InfoCard
              key={courseCatalog.id}
              courseCatalog={courseCatalog}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default CourseCatalogApp;
