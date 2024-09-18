

// import axios from "axios";
// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import OfficeLanding from "../PostOffice/OfficeLanding";
// import "./PoLogin.css";

// const PostLogin = () => {
//   const [pincodeError, setPincodeError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [email, setEmail] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPincodeError("");
//     setPasswordError("");
//     setEmailError("");

//     if (!pincode && !email) {
//       setPincodeError("Pincode or Email is required");
//       return;
//     }

//     if (!password) {
//       setPasswordError("Password is required");
//       return;
//     }

//     // Check for hardcoded admin credentials
//     if (pincode === "1" && password === "admin") {
//       sessionStorage.setItem("userType", "admin");
//       sessionStorage.setItem("userData", JSON.stringify({ pincode, password }));
//       navigate("/admin");
//       return;
//     }

//     // Check for Post Office login
//     if (pincode) {
//       axios
//         .get(`http://localhost:9999/PoLogin/${pincode}/${password}`)
//         .then((res) => {
//           if (res.data) {
//             // Store session data for post office
//             sessionStorage.setItem("userType", "postoffice");
//             sessionStorage.setItem("pincode", res.data.pincode);
//             navigate("/postoffice");
//           } else {
//             // If PoLogin fails, try Employee login
//             return axios.get(`http://localhost:9999/EmployeeLogin/${email}/${password}`);
//           }
//         })
//         .then((res) => {
          
//           if (res.data) {
//             sessionStorage.setItem("userType", "employee");
//             sessionStorage.setItem("userData", JSON.stringify({ email, password }));
//             navigate("/EmployeeDashboard");
//           } else {
//             throw new Error("Invalid Credentials");
//           }
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: "error",
//             title: "Invalid Credentials",
//             text: "Please enter valid credentials",
//           });
//         });
//     } else if (email) {
//       // Handle email-based login for employees
//       axios
//         .get(`http://localhost:9999/EmployeeLogin/${email}/${password}`)
//         .then((res) => {
//           if (res.data) {
//             sessionStorage.setItem("userType", "employee");
//             sessionStorage.setItem("userData", JSON.stringify({ email, password }));
//             navigate("/EmployeeDashboard");
//           } else {
//             throw new Error("Invalid Credentials");
//           }
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: "error",
//             title: "Invalid Credentials",
//             text: "Please enter valid credentials",
//           });
//         });
//     }
//   };

//   return (
//     <div>
//       <Container fluid className="bg-light login-container">
//         <Row className="justify-content-center align-items-center min-vh-100">
//           <Col md={6} lg={4} className="py-5">
//             <div className="login-card p-4 shadow rounded bg-white">
//               <div className="text-center mb-4">
//                 <Image
//                   src="https://static.vecteezy.com/system/resources/previews/006/470/647/original/university-education-logo-design-template-free-vector.jpg"
//                   alt="College Logo"
//                   fluid
//                   className="logo"
//                 />
//                 <h2 className="mt-3" role="staff-login">Staff Login</h2>
//               </div>

//               <Form onSubmit={handleSubmit}>
//                 {/* Conditional rendering based on input type */}
//                 {email ? (
//                   <Form.Group controlId="formEmail">
//                     <Form.Label role="email">Email</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="empId"
//                       placeholder="Enter your email"
//                       role='email-input'
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       isInvalid={!!emailError}
//                       className="form-input"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {emailError}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   <Form.Group controlId="formPincode">
//                     <Form.Label role="pincode">Pincode</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="pincode"
//                       placeholder="Enter your pincode"
//                       role='pincode-input'
//                       value={pincode}
//                       onChange={(e) => setPincode(e.target.value)}
//                       isInvalid={!!pincodeError}
//                       className="form-input"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {pincodeError}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 )}
//                 <Form.Group controlId="formPassword" className="mt-3">
//                   <Form.Label role='password'>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     role='password-input'
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     isInvalid={!!passwordError}
//                     className="form-input"
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {passwordError}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="mt-4 w-100 login-btn"
//                   data-testId="log-btn"
//                 >
//                   Login
//                 </Button>
//                 <p className="mt-3 text-center">
//                   <Link to="/" className="text-decoration-none go-home-link">Go to home</Link>
//                 </p>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <footer className="bg-dark text-light py-4">
//         <Container>
//           <Row>
//             <Col>
//               <p className="mb-0">University of Houston</p>
//               <p className="mb-0">Houston, Texas 77204</p>
//               <p className="mb-0">(713) 743-2255</p>
//             </Col>
//             <Col>
//               <h5>About Us</h5>
//               <p>You can follow us on our social media platforms including Facebook, Instagram, YouTube, Twitter, and Google+ @ University of Houston</p>
//             </Col>
//           </Row>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default PostLogin;



import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./PoLogin.css";

const PostLogin = () => {
  const [pincodeError, setPincodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPincodeError("");
    setPasswordError("");
    setEmailError("");

    if (!pincode && !email) {
      setPincodeError("Pincode or Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Check for hardcoded admin credentials
    if (pincode === "1" && password === "admin") {
      sessionStorage.setItem("userType", "admin");
      sessionStorage.setItem("userData", JSON.stringify({ pincode, password }));
      navigate("/admin");
      return;
    }

    // Check for Post Office login
    if (pincode) {
      axios
        .get(`http://localhost:9999/PoLogin/${pincode}/${password}`)
        .then((res) => {
          if (res.data) {
            // Store session data for post office
            sessionStorage.setItem("userType", "postoffice");
            sessionStorage.setItem("pincode", res.data.pincode);
            navigate("/postoffice");
          } else {
            // If PoLogin fails, try Employee login
            return axios.get(`http://localhost:9999/EmployeeLogin/${email}/${password}`);
          }
        })
        .then((res) => {
          if (res.data) {
            sessionStorage.setItem("userType", "employee");
            sessionStorage.setItem("userData", JSON.stringify({ email, password }));
            navigate("/EmployeeDashboard");
          } else {
            throw new Error("Invalid Credentials");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "Please enter valid credentials",
          });
        });
    } else if (email) {
      // Handle email-based login for employees
      axios
        .get(`http://localhost:9999/EmployeeLogin/${email}/${password}`)
        .then((res) => {
          if (res.data) {
            sessionStorage.setItem("userType", "employee");
            sessionStorage.setItem("userData", JSON.stringify({ email, password }));
            navigate("/EmployeeDashboard");
          } else {
            throw new Error("Invalid Credentials");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "Please enter valid credentials",
          });
        });
    }
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
          <p className="text-xl text-gray-600 text-center">Admin</p>
          <Form onSubmit={handleSubmit}>
            {email ? (
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="empId"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!emailError}
                />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              <Form.Group controlId="formPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  placeholder="Enter your pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  isInvalid={!!pincodeError}
                />
                <Form.Control.Feedback type="invalid">
                  {pincodeError}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-100"
            >
              Login
            </Button>
            <div className="mt-3 text-center">
              <Link to="/" className="text-decoration-none">Go to home</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostLogin;
