import { useContext, useState } from "react";
import { auth, db } from "../helpers/firebase";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";

import {
  Button,
  InputAdornment,
  Snackbar,
  IconButton,
  Alert,
  InputLabel,
  Box,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { useNavigate, Link, Form } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [_open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Check if the email already exists
      const q = query(collection(db, "customers"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setOpen(true);
        setSeverity("error")
        setMessage("Email already exists!. Change Email");

        //check for all field required
      } else if (
        !contact ||
        !lastName ||
        !firstName ||
        !email ||
        !address ||
        !gender ||
        !password
      ) {
        setOpen(true);
        setSeverity("error")
        setMessage("All fields required");
      } else {
        //crate user authentication
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            console.log("user created");
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
          });

        const customerData = {
          nickName: firstName,
          lastName,
          email,
          password,
          contact,
          address,
          gender,
        };

        await addDoc(collection(db, "customers"), customerData);


        console.log("Signup is working");
        setSeverity("success")
        setMessage("Signup is successful");
        setOpen(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setContact("");
        setGender("");
        setAddress("");
        dispatch({ type: "SIGNUP" });
        navigate("/login")
      }
    } catch (error) {
      console.error("Error checking/adding email: ", error);
      setMessage("Error adding email. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const limitContactValue = (e) => {
    const contactValue = e.target.value;
    // Allow only numbers and ensure the length does not exceed the limit
    if (/^\d*$/.test(contactValue) && contactValue.length <= 10) {
      setContact(contactValue);
      setOpen(true);
      setMessage("Contact must be 10 Digits");
    }
  };

  return (
    <form>
      <Box
        sx={{
          height: "95vh",
          backgroundImage: 
            'url("https://img.freepik.com/free-photo/various-vegetables-black-table-with-space-message_1220-616.jpg?t=st=1721039055~exp=1721042655~hmac=305b3271d5ec752c5180a48c785cb7aac9aa4d658f1b40ffe7f0b9ee662c0a48&w=1060")',
          //'linear-gradient(to right, rgba(255,255,255,0), #ffffffe1),url("https://img.freepik.com/free-photo/copy-space-italian-food-ingredients_23-2148551732.jpg?t=st=1717905942~exp=1717909542~hmac=998a46f341815ae1a92cb1c373722e148210a0ba95201f3b7ee8fee488283fbf&w=1380")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundImage:
              'url("https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?t=st=1717899132~exp=1717902732~hmac=986108276f3bb554e3249a7d57849453a595bd96ee731dddc3a27c38f35a83c0&w=1380")',

            height: "90vh",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "95vh" }}
          >
            <Grid item>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                SIGNUP
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                maxLength="10"
                label="Contact"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={contact}
                onChange={limitContactValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <AddIcCallIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <InputLabel sx={{ fontSize: 12 }}>Gender</InputLabel>
              <Select
                sx={{ minWidth: 263 }}
                size="small"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <ContactMailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                sx={{ marginBottom: "10px" }}
              >
                SIGNUP
              </Button>
            </Grid>
            <Typography>
              Already have an account <Link to="/login">Login</Link>
            </Typography>
            <Snackbar
              open={_open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={severity}>{message}</Alert>
            </Snackbar>
          </Grid>
        </Container>
      </Box>
    </form>
  );
};

export default Register;
