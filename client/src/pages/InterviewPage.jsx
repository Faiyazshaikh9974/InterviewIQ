import React, { useState } from 'react'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3InterviewReport from '../components/Step3InterviewReport'

function InterviewPage() {
    const [step, setstep] = useState(1)
    const [interviewData, setinterviewData] = useState(null)
  return (
    <div className='min-h-screen bg-gray-50'>
        {step === 1 && <Step1 onStart={(data)=>{
            setinterviewData(data);
            setstep(2)
        }}/>}
        {step === 2 && <Step2 interviewData={interviewData}/>}
        {step === 1 && <Step3InterviewReport onFinish={(report)=>{setinterviewData(report); setstep(3)} }/>}
    </div>
  )
}

export default InterviewPage