import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
    return (
        <div className="mb-8 flex items-center justify-center">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            index < currentStep
                                ? 'bg-green-500 text-white'
                                : index === currentStep
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-500'
                        } `}
                    >
                        {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
                    </div>

                    {index < steps.length - 1 && <div className={`mx-1 h-1 w-12 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'} `} />}
                </div>
            ))}
        </div>
    );
};
