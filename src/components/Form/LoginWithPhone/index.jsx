import { useState } from "react";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "../../Button";
import Modal from "../../Modal";
import OtpForm from "./OtpForm";
import PhoneNumberForm from "./PhoneNumberForm";

export default function LoginWithPhone(props) {
  const [confirmation, setConfirmation] = useState(null);
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep(prev => prev + 1);
  const prevFormStep = () => setFormStep(prev => prev - 1);

  return (
    <Modal {...props}>
      {formStep === 0 && (
        <PhoneNumberForm
          setConfirmation={setConfirmation}
          nextFormStep={nextFormStep}
        />
      )}
      {formStep === 1 && <OtpForm confirmation={confirmation} />}
      {formStep > 0 && <Button onClick={prevFormStep}>Back</Button>}
    </Modal>
  );
}
