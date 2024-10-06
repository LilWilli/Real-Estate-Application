
// Importing the necessary modules from React and Chakra UI
import React from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack } from '@chakra-ui/react';

// Importing useRouter hook from next/router to handle navigation
import { useRouter } from 'next/router';

// Defining the Welcome component
const Welcome = () => {
    // Using the useRouter hook to get access to the router object
    const router = useRouter();

    // Defining the handleBackToHome function to handle the back to home button click
    const handleBackToHome = () => {
        // Using the router object to navigate to the home page
        router.push('/');
    };

    // Returning the JSX for the Welcome component
    return (
        // Using the Box component from Chakra UI to create a section with padding and background color
        <Box as='section' py='8' bg='gray.50'>
            {/* Using the Box component to create a container with max width and horizontal padding */}
            <Box maxW='6xl' mx='auto' px={{ base: '4', md: '8' }}>
                {/* Using the VStack component to create a vertical stack with spacing and alignment */}
                <VStack spacing='6' align='start'>
                    {/* Using the Heading component to display the welcome message */}
                    <Heading as='h1' size='2xl' mb='4' textAlign={{ base: 'center', md: 'left' }}>
                        Welcome!
                    </Heading>
                    {/* Using the Text component to display the welcome message */}
                    <Text fontSize='lg' mb='4' textAlign={{ base: 'center', md: 'left' }}>
                        Congratulations on your achievements! Here are your available plans:
                    </Text>
                    {/* Using the SimpleGrid component to create a grid with 3 columns and spacing */}
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing='8'>
                        {/* Using the map function to iterate over the plans array and create a Box component for each plan */}
                        {['Normal Plan', 'Advance Plan', 'Premium Plan'].map((plan, index) => (
                            <Box
                                key={index}
                                // Using the borderWidth, borderRadius, p, bg, and boxShadow props to style the Box component
                                borderWidth='1px'
                                borderRadius='lg'
                                p='6'
                                bg='white'
                                boxShadow='md'
                                // Using the textAlign prop to center the content of the Box component
                                textAlign='center'
                                // Using the _hover and transition props to add hover effects to the Box component
                                _hover={{ shadow: 'xl', transform: 'scale(1.05)', transition: '0.3s' }}
                                transition='0.3s'
                            >
                                {/* Using the Heading component to display the plan name */}
                                <Heading as='h3' size='md' mb='4'>{plan}</Heading>
                                {/* Using the Text component to display the plan description based on the plan name */}
                                <Text mb='4'>
                                    {plan === 'Normal Plan' && 'Basic access with limited features.'}
                                    {plan === 'Advance Plan' && 'Access to advanced features and more.'}
                                    {plan === 'Premium Plan' && 'All features with priority support.'}
                                </Text>
                                {/* Using the Button component to create a button for each plan */}
                                <Button colorScheme={plan === 'Normal Plan' ? 'blue' : plan === 'Advance Plan' ? 'green' : 'purple'} size='lg'>
                                    Choose {plan}
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>
                    {/* Using the Button component to create a button to go back to the home page */}
                    <Button colorScheme='teal' variant='outline' onClick={handleBackToHome} size='lg' mx='auto'>
                        Back to Home
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

// Exporting the Welcome component as the default export
export default Welcome;

