import ProgressBar from './progress-bar'
import { ProjectFormProvider, useProjectForm } from './project-form-context'

import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import StepFour from './step-four'
import StepFive from './step-five'
import StepSix from './step-six'
import StepSeven from './step-seven'

export default function CreateAProjectForm({ instruction, onSuccess }) {
  return (
    <ProjectFormProvider>
      <Form />
    </ProjectFormProvider>
  )
}

function Form() {
  const { step } = useProjectForm()

  return (
    <div className='w-full bg-blue-50 sm:mx-auto '>
      <div className='flex flex-col bg-gradient-to-br from-white to-blue-200  pb-8 pt-24 '>
        <div>
          <div className='absolute top-36 flex  w-full flex-col space-y-3 px-12 sm:left-6 sm:w-48'>
            <p className='text-xs font-bold text-neutral-700 '>
              Step {step} of 7
            </p>
            <div className=''>
              <ProgressBar step={step} className='' />
            </div>
          </div>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}
          {step === 5 && <StepFive />}
          {step === 6 && <StepSix />}
          {step === 7 && <StepSeven />}
        </div>
      </div>
    </div>
  )
}
