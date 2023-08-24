import { Stack, Text, useMediaQuery } from '@chakra-ui/react';

const Footer = () => {
  const [IsLargerThan768] = useMediaQuery('(min-width: 769px)');
  return (
    <Stack
      justify="space-between"
      w="full"
      minH="60px"
      bgColor="#030a00"
      padding="10px"
      border="2px"
      borderColor="#3adb00"
      borderRadius="10px"
      direction={IsLargerThan768 ? 'row' : 'column'}
      pos='absolute'
    >
      <Text
        fontSize={['15px', '20px', '25px']}
        fontWeight="600"
        textColor="#3adb00"
      >
        © 2022 Замердженные. Все права защищены
      </Text>
      <Text
        fontSize={['15px', '20px', '25px']}
        fontWeight="600"
        textColor="#3adb00"
      >
        I will choose lazy man for hard work...
      </Text>
    </Stack>
  );
};
export { Footer };
