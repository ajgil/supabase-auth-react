import React, { useRef } from 'react'
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { supabase } from '../../../supabase'

function GetSteps() {
  return ["step 1", "step 2", "step 3"];
}

export default function SecondStep() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

	const odenameRef = useRef()
	const odeemailRef = useRef()
	const odepasswordRef = useRef()
	const odePasswordConfirmRef = useRef()
	const odephoneNumberRef = useRef()
	const tokenNumberRef = useRef()
	const otpShow = useRef('false')

  const theme = useTheme();
  
  const steps = GetSteps();

	function GetStepContent(step) {
		switch (step) {
			case 0:
				return (
					<form class="form-group">
					<label>Nombre</label>
					<input type="text" placeholder="Introduzca un nombre" ref={odenameRef}></input>
					<br></br>
					<label htmlFor="input-email">Email</label>
					<input id="input-email" type="email" placeholder="correo electrónico" ref={odeemailRef} />
					<br></br>
					<label htmlFor="input-password">Contraseña</label>
					<input id="input-password" type="password" placeholder="Introduzca contraseña" ref={odepasswordRef} />
					<br></br>
					<label htmlFor="input-password">Confirmar contraseña</label>
					<input id="input-password" type="password" placeholder="Confirmar contraseña" ref={odePasswordConfirmRef} />
					<br></br>
					<label htmlFor="input-phone">Teléfono</label>
					<input id="input-phone" type="text" placeholder="ejem. 612345789" ref={odephoneNumberRef} />
					</form>
				)
			case 1:
				return (
					<form class="form-group">
					<label>Código de confirmación</label>
					<input type="text" placeholder="Introduzca código recibido por sms" ref={tokenNumberRef}></input>
					</form>
				)
			case 2:
				return "No olvide confirmar su correo electrónico. Aceptar";
			default:
				return "Error desconocido";
		}
}

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
		//handle 1 step
    const otpShow = false
		if (!otpShow) { 
			getToken()
		//handle 2 step
		} else {
			verifyOTP()
		}
		// handle last step
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  async function getToken() {
    const name = odenameRef.current.value
		const email = odeemailRef.current.value
		const pass = odepasswordRef.current.value
		const pass2 = odePasswordConfirmRef.current.value
    const phone = odephoneNumberRef.current.value

		if (pass !== pass2) {
      alert("Passwords don't match");
			return
    }
		if (phone) {
				const { error } = await supabase.auth.signUp({
					email: email,
					password: pass, 
					},{
							data:{
									ode: true,
									firstname: name,
									phone: phone,
							}
					})
					if (error) {
							console.log(error)
							alert('error en el registro con email')
					}
				const { errorPhone } = await supabase.auth.signUp({
					phone: phone,
					password: pass,
					},{
						data: {
							ode: true,
							firstname: name,
							email: email,
						}
					})
					if (errorPhone) {
						console.log(error)
						alert('error en el registro con teléfono')
				}
				otpShow(true) 
    }
  }

	async function verifyOTP() {
		const phone = odephoneNumberRef.current.value
		const token = tokenNumberRef.current.value

		const { error } = await supabase.auth.verifyOTP({
			phone: phone,
			token: token, 
			},{
					data:{
							ode: true,
							verified: true,
					}
			})
			if (error) {
					console.log(error)
					alert('error al verificar el token OTP')
			}
	}

return (
    <div>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            All steps completed
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {GetStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
              {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
              Next
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                )}
              </Button>
              

            </div>
          </div>
        )}
      </div>
    </div>
  );
}