import ProgressBar from "./progress-bar";
import { ProjectFormProvider, useProjectForm } from "./project-form-context";
import StepFive from "./step-five";
import StepFour from "./step-four";
import StepOne from "./step-one";
import StepSeven from "./step-seven";
import StepSix from "./step-six";
import StepThree from "./step-three";
import StepTwo from "./step-two";

export default function CreateAProjectForm({ instruction, onSuccess }) {
    return (
        <ProjectFormProvider>
            <Form />
        </ProjectFormProvider>
    );
}

function Form() {
    const { step } = useProjectForm();

    return (
            <div className="w-full sm:mx-auto sm:max-w-xl px-4">
                <div className="bg-white py-8 px-4 flex flex-col space-y-6">
                    <div className="w-full flex flex-col space-y-3">
                        <p className="font-bold text-gray-500 text-xs">
                            Step {step} of 7
                        </p>
                        <ProgressBar step={step} />
                    </div>
                    {step === 1 && (<StepOne />)}
                    {step === 2 && (<StepTwo />)}
                    {step === 3 && (<StepThree />)}
                    {step === 4 && (<StepFour />)}
                    {step === 5 && (<StepFive />)}
                    {step === 6 && (<StepSix />)}
                    {step === 7 && (<StepSeven />)}
                </div>
            </div>
        )
}
