import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import SignatureCanvas from 'react-signature-canvas'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRef, useState } from 'react';
import axios from 'axios'

const theme = createTheme();

export default function Home() {

  let sigCanvas = useRef({})
  const [imageURL, setImageURL] = useState(undefined);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const create = () => {
    if (!sigCanvas.isEmpty()) {
      const URL = sigCanvas.getTrimmedCanvas().toDataURL("image/png");
      setImageURL(URL);
      formik.setFieldValue("signature", URL);
      handleClose();
    }
  }

  const clear = () => {
    sigCanvas.clear();
    setImageURL(undefined);
    formik.setFieldValue("signature", null);

  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      franchise: '',
      amount: undefined,
      authFirstName: '',
      authMiddleName: '',
      authLastName: '',
      signature: undefined,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(JSON.stringify(values, null, 2));
      const res = await axios.post('http://192.168.254.112:5000', values);
      console.log(res)
    },
  });

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 50,
    p: 4,
  };

  return (
    <>
      <div className="xl:grid xl:grid-cols-5 ">
        <div className=" col-span-2 px-10 xl:max-h-screen overflow-y-auto">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h3" variant="h6">
                  Fill up the following information to complete the contract

                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="middleName"
                        label="Middle Name"
                        name="middleName"
                        autoComplete="family-name"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Franchise</InputLabel>
                        <Select
                          labelId="franchise"
                          id="franchise"
                          label="Franchise"
                          value={formik.values.franchise}
                          onChange={(e) => formik.setFieldValue('franchise', e.target.value as string)}
                        >
                          <MenuItem value={"All In One"}>All In One</MenuItem>
                          <MenuItem value={"Food"}>Food</MenuItem>
                          <MenuItem value={"Health Essentials"}>Health Essentials</MenuItem>
                          <MenuItem value={"2in1 (Toktok / Health Essentials)"}>2in1 (Toktok / Health Essentials)</MenuItem>
                          <MenuItem value={"2in1 (Food / Health Essentials)"}>2in1 (Food / Health Essentials)</MenuItem>
                          <MenuItem value={"Foodcart"}>Foodcart</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="amount"
                        label="Payment Amount"
                        name="amount"
                        type="number"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        name="authFirstName"
                        required
                        fullWidth
                        id="authFirstName"
                        label="First Name"
                        value={formik.values.authFirstName}
                        onChange={formik.handleChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="authMiddleName"
                        label="Middle Name"
                        name="authMiddleName"
                        value={formik.values.authMiddleName}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="authLastName"
                        label="Last Name"
                        name="authLastName"
                        value={formik.values.authLastName}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>

                      <div className="block">
                        <Typography variant="body1" >
                          Create your Digital Signature
                        </Typography>
                        <p className="py-5">
                          <a className="px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer" onClick={handleOpen}>Open Signature Pad</a>

                        </p>
                        {
                          imageURL &&
                          <img src={imageURL} alt="signature" className="signature" />
                        }
                      </div>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h3">
                            Sign your digital signature here
                          </Typography>
                          <br></br>

                          <Card variant="outlined">
                            <SignatureCanvas penColor='black'
                              canvasProps={{ height: 300, className: 'sigCanvas' }}
                              ref={(ref) => { sigCanvas = ref }} />

                          </Card>
                          <div className="flex justify-evenly pt-5">
                            <a className="px-4 py-2 text-white bg-red-600 rounded-md cursor-pointer" onClick={() => clear()}>Clear</a>
                            <a className="px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer" onClick={() => create()}>Create</a>
                          </div>


                        </Box>
                      </Modal>

                    </Grid>

                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider >
        </div>
        <div className=" col-span-3 px-10 py-16 bg-grid xl:max-h-screen overflow-y-auto">
          <div className="bg-white px-16 py-16">
            <p>
              This is to confirm that <b><u>{formik.values.firstName ? formik.values.firstName : 'First name,'}&nbsp;{formik.values.middleName ? formik.values.middleName : 'Middle name, '}&nbsp;{formik.values.lastName ? formik.values.lastName : 'Last name '}</u></b> will avail of the <b><u>{formik.values.franchise ? formik.values.franchise : 'Franchise Type'}</u></b> Franchise Package amounting to <b><u>{formik.values.amount ? formik.values.amount : 'Amount in PHP'}</u></b> pesos only.
            </p>
            <br></br>
            <p>The Franchise is lifetime and has no expiration.</p>
            <br></br>
            <p>It includes referral commissions from the line of business/es that I will avail.</p>
            <br></br>
            <p>It also includes Other Ways to Earn from JC.</p>
            <br></br>
            <br></br>
            <br></br>
            <p><b>SUPPORT SYSTEM</b></p>
            <br></br>
            <p>The Franchise of <b><u>{formik.values.franchise ? formik.values.franchise : 'Franchise Type'}</u></b> will be handled by ERALISTA WORLDWIDE GROUP, the LARGEST ONLINE FRANCHISE SUPPORT GROUP.</p>
            <br></br>
            <br></br>
            <br></br>
            <p><b>ERALISTA will provide the following steps:</b></p>
            <br></br>
            <p className="pb-2">STEP 1: APPLICATION/REQUIREMENTS</p>
            <div className="pl-6">
              <p>✔	Basic Information: Complete Name, Address, Contact Number, and Email Address</p>
              <p>✔	Valid ID</p>
              <p>✔	Signed Agreement Form</p>
            </div>
            <br></br>

            <p className="pb-2">STEP 2: SYSTEM TRAINING</p>
            <div className="pl-6">
              <p>✔	How to navigate your APP? </p>
              <p>✔	How to be an operator? How to hire riders?</p>
              <p>✔	How to share your referral code?</p>
              <p>✔	How to encash your commission?</p>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <p>
              <b><u>{formik.values.firstName ? formik.values.firstName : 'First name,'}&nbsp;{formik.values.middleName ? formik.values.middleName : 'Middle name, '}&nbsp;{formik.values.lastName ? formik.values.lastName : 'Last name '}</u></b>
              has the option to provide a trusted person to handle the management of his Franchise and we will give the COMPLETE TRAINING and SUPPORT to the said person/s.
            </p>
            <br></br>
            <p>
              I am now authorizing <b><u>{formik.values.authFirstName ? formik.values.authFirstName : 'First name, '} {formik.values.authMiddleName ? formik.values.authMiddleName : 'Middle name, '} {formik.values.authLastName ? formik.values.authLastName : 'Last name'}</u></b> to transact the amount of  <b><u>{formik.values.amount ? formik.values.amount : 'Amount in PHP'}</u></b> pesos on my behalf.
            </p>
            <br></br>
            <p className="text-center text-sm"><i>(Once activated, your payment for your Online Franchise Account is NON-REFUNDABLE.)</i></p>
            <br></br>
            <br></br>
            <br></br>
            <p><b>DISCLAIMER</b></p>
            <p>By signing this agreement, I hereby acknowledge and agree that the process of availing the Online Franchise was clearly explained to me by my Sponsor/Franchise Consultant.</p>
            <br></br>
            <p>I authorize ERALISTA to collect and process the data indicated herein for the purpose of availing the franchise package. I understand that my personal information is protected by RA 10173 (Data Privacy Act of 2012).</p>

            <br></br>
            <br></br>
            <div className="">
              <p>{
                imageURL &&
                <img src={imageURL} alt="signature" className="signature w-20" />
              }</p>
              <p className="uppercase">
                <b><u>{formik.values.firstName ? formik.values.firstName : 'First name,'}&nbsp;{formik.values.middleName ? formik.values.middleName : 'Middle name, '}&nbsp;{formik.values.lastName ? formik.values.lastName : 'Last name '}</u></b>

              </p>
              <p>Signature above printed name</p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}