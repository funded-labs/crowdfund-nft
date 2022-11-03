import ProgressBar from "./progress-bar";
import { ProjectFormProvider, useProjectForm } from "./project-form-context";
import StepFive from "./step-five-new";
import StepFour from "./step-four-new";
import StepOneNew from "./step-one-new";
import StepSeven from "./step-seven";
import StepSix from "./step-six-new";
import StepThreeNew from "./step-three-new";
import StepTwoNew from "./step-two-new";

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
            <div className="w-full bg-blue-50 sm:mx-auto ">
                <div className="bg-gradient-to-b from-neutral-100 to-neutral-200 pb-8 pt-24   flex flex-col ">
                    
                    <div>
                        <div className="absolute top-48 left-6  w-full sm:w-48 px-4 flex flex-col space-y-3">
                        <p className="font-bold text-neutral-700 text-xs ml-6">
                            Step {step} of 7
                        </p>
                        <div className="ml-6">
                        <ProgressBar step={step} className="" />
                        </div>
                        
                    </div>
                    {step === 1 && (<StepOneNew />)}
                    {step === 2 && (<StepTwoNew />)}
                    {step === 3 && (<StepThreeNew />)}
                    {step === 4 && (<StepFour />)}
                    {step === 5 && (<StepFive />)}
                    {step === 6 && (<StepSix />)}
                    {step === 7 && (<StepSeven />)}
                    </div>
                    
                </div>
            </div>
        )
}
