
import {
    Step,
    StepDescription,
    Center,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
} from '@chakra-ui/react'
import './StepperCustom.css'
const StepperCustom = ({ indexStep }) => {
    // Se for ter descrição descomentar stepDescription
    const steps = [
        { title: 'Selecionar Time', description: 'Contact Info' },
        { title: 'Pagamento', description: 'Date & Time' },
        { title: 'Finalizar', description: 'Select Rooms' },
    ]

    const { activeStep } = useSteps({
        index: indexStep,
        count: steps.length,
    })



    return (

        <Stepper orientation={window.screen.width <= '560px' ? 'vertical' : 'horizontal'} index={activeStep} color={'#8F81B2'} colorScheme='purple' width={'100%'} wordBreak={'break-word'} alignItems={'start'}>
            {steps.map((step, index) => (
              
                    <Step key={index}>
                        <StepIndicator    >
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            {/* <StepDescription>{step.description}</StepDescription> */}
                        </Box>

                        <StepSeparator />
                    </Step>
               
            ))}
        </Stepper>

    )
}

export { StepperCustom }