import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


function OdeSignupPhone() {
  const odenameRef = useRef()
  const odeemailRef = useRef()
  const odepasswordRef = useRef()
  const odePasswordConfirmRef = useRef()
  const odephoneNumberRef = useRef()
  
  const tokenNumberRef = useRef()
  const otpShow = useRef(false)

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const stepsF = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /*
  const handleNextForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <form class="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" ref={odenameRef}></input>
          <br></br>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" placeholder="correo electrónico" ref={odeemailRef} />
          <br></br>
          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={odepasswordRef} />
          <br></br>
          <label htmlFor="input-password">Confirmar Password</label>
          <input id="input-password" type="password" ref={odePasswordConfirmRef} />
          <br></br>
          <label htmlFor="input-phone">Teléfono</label>
          <input id="input-phone" type="text" ref={odephoneNumberRef} />
          </form>
        );
      case 1:
        return (
          <form class="form-group">
          <label>High School Percentage</label>
          <input type="number" placeholder="High School Percentage"></input>
          <br></br>
          <label>Graduation percentage</label>
          <input type="number" placeholder="Graduation Percentage"></input>
          </form>
        );
      case 2:
        return (
          <form class="form-group">
          <label>Permanent Address</label>
          <input type="text" placeholder="Permanent Address"></input>
          <br></br>
          <label>Temporary Address</label>
          <input type="text" placeholder="Temporary Address"></input>
          </form>
        );
      default:
        return 'Unknown step';
    }
  }
*/

  return (
    <MobileStepper
      variant="progress"
      steps={3}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}