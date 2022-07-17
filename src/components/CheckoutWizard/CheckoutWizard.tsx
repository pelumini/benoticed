import React from 'react';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import useStyles from 'src/utils/styles';

interface ICheckoutWizardProps {
  activeStep: number;
}

export const CheckoutWizard: React.FC<ICheckoutWizardProps> = ({
  activeStep = 0,
}) => {
  const classes = useStyles();
  return (
    <Stepper
      className={classes.transparentBackgroud}
      activeStep={activeStep}
      alternativeLabel
    >
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
};
