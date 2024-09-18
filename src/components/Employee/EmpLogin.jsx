// import axios from "axios";
// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [empId, setEmpId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!empId || !password) {
//       setError("Employee ID and password are required");
//       return;
//     }

//     axios
//       .get(`http://localhost:9999/EmployeeLogin/${empId}/${password}`)
//       .then((response) => {
//         if (response.data) {
//           // Store user data in sessionStorage
//           sessionStorage.setItem("user", JSON.stringify(response.data));
//           navigate("/EmployeeDashboard"); // Navigate to dashboard on successful login
//         }
//       })
//       .catch((err) => {
//         setError("Invalid Credentials");
//         console.error("Login failed:", err);
//       });
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <h2 className="text-center">Login</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formEmpId">
//               <Form.Label>Employee ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your Employee ID"
//                 value={empId}
//                 onChange={(e) => setEmpId(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPassword" className="mt-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3">
//               Login
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginForm;


import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import "./LoginForm.css";  Ensure to create this CSS file for additional styling if needed

const LoginForm = () => {
  const [empEmail, setempEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!empEmail || !password) {
      setError("Employee ID and password are required");
      return;
    }

    axios
      .get(`http://localhost:9999/EmployeeLogin/${empEmail}/${password}`)
      .then((response) => {
        if (response.data) {
          // Store user data in sessionStorage
          sessionStorage.setItem("empEmail", JSON.stringify(response.data));
          sessionStorage.setItem("empId", response.data.empId);
          navigate("/EmployeeDashboard"); // Navigate to dashboard on successful login
        }
      })
      .catch((err) => {
        setError("Invalid Credentials");
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-red-700"
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/05/42/63/27/360_F_542632798_u9A5PploqHtAYzASlzm45nw5kyAJ5HSh.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="text-center mb-4">
            {/* <Image
             // src="https://static.vecteezy.com/system/resources/previews/006/470/647/original/university-education-logo-design-template-free-vector.jpg"
              alt="Logo"
              fluid
              className="logo mb-3"
            /> */}
            <h2 className="text-xl text-gray-600">Login</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmpId">
              <Form.Label>Employee email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Employee ID"
                value={empEmail}
                onChange={(e) => setempEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
