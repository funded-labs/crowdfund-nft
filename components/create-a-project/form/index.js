import ProgressBar from "./progress-bar";
import { ProjectFormProvider, useProjectForm } from "./project-form-context";
import StepOne from "./step-one";
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
            <div className="w-full sm:mx-auto sm:max-w-md px-4">
                <div className="bg-white py-8 px-4 flex flex-col space-y-6">
                    <div className="w-full flex flex-col space-y-3">
                        <p className="font-bold text-gray-500 text-xs">
                            Step {step} of 5
                        </p>
                        <ProgressBar step={step} />
                    </div>
                    {step === 1 && (<StepOne />)}
                    {step === 2 && (<StepTwo />)}
                </div>
            </div>
        )
}