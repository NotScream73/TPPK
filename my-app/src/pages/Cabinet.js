import React from 'react';
import {
  ChakraProvider,
  VStack,
  TableContainer,
  HStack,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Input,
  DrawerCloseButton,
  DrawerHeader,
  Select,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Developers } from '../components/TableView';
function Cabinet() {
  async function getData(url) {
    const data = await fetch(url, {
    	referrer: ''
    })
      .then(promise => promise.json())
      .then(data => {
        return data;
      })
      .catch(e => {
        console.error(e);
      });
    return data;
  }
  const fetchData = async url => {
    const data = await getData(url);
    if (data.message) {
      alert('С такими критериями никого не найдено.');
    } else {
      data.sort((a, b) => (+(b["AllWorkExp"])) - ((a["AllWorkExp"])));
      setDevelopers(data);
    }
  };
  const [developers, setDevelopers] = React.useState([]);
  React.useEffect(() => {
    fetchData('https://api.zyzf.space/api/Worker/get?');
    // set data to state
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = React.useState({
    main_specialization: 'C#',
    role: 'Teamlead',
    work_experience_on_role: 0,
    
  });
  const [check, setCheck] = React.useState(false);
  const soldCheckbox = ({ target: { checked } }) => {
    console.log(check, checked);
    setCheck(checked);
  };
  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState(state => ({
      ...state,
      [name]: value,
    }));
  };
  const updateTable = (state,check) => {
    let url = `https://api.zyzf.space/api/Worker/get?`;
    if (state.work_experience_on_role !== 0) {
      url += `AllWorkExp=${
        +state.work_experience_on_role - 1
      }&OperatorAllWorkExp=>`;
    }
    if(!check){
      url += `&ProjectID=null`
    }
    let tech;
    let role;
    switch(state.main_specialization){
      case 'NodeJS':
        tech = 1;
        break;
      case 'Bootstrap':
        tech = 2;
        break;
      case 'Python':
        tech = 3;
        break;
      case 'C#':
        tech = 4;
        break;
      case 'Java':
        tech = 5;
        break;
    }
    url += `&MainTechID=${tech}`
    switch(state.role){
      case 'Teamlead':
        role = 0;
        break;
      case 'Developer':
        role = 1;
        break;
      case 'Frontend':
        role = 2;
        break;
      case 'Backend':
        role = 3;
        break;
      case 'Tester':
        role = 4;
        break;
    }
    url += `&MainRoleID=${role}`
    console.log(url);
    fetchData(url);
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(state);
    updateTable(state, check);
  };
  return (
    <ChakraProvider>
      <VStack>
        <VStack>
          <Header />
        </VStack>
        <VStack justify="center" w="full" minH="1000px" align="center">
          <VStack
            w="50px"
            h="full"
            paddingX={10}
            paddingTop={5}
            marginLeft="20px"
          >
            <Button
              onClick={onOpen}
              pos="absolute"
              top="150px"
              border="2px"
              borderColor="#3adb00"
              backgroundColor="black"
              color="#3adb00"
            >
              Фильтр
            </Button>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  borderRight="2px"
                  borderColor="#3adb00"
                  backgroundColor="black"
                  color="#3ADB00"
                >
                  Выберите необходимые настройки
                </DrawerHeader>
                <DrawerBody
                  borderRight="2px"
                  borderColor="#3adb00"
                  backgroundColor="black"
                  color="#3ADB00"
                >
                  <form id="my-form" onSubmit={handleSubmit}>
                    <Text>Основная специализация</Text>
                    <Select
                      value={state.main_specialization}
                      name="main_specialization"
                      onChange={handleChange}
                    >
                      <option value="NodeJS">NodeJS</option>
                      <option value="Bootstrap">Bootstrap</option>
                      <option value="Python">Python</option>
                      <option value="C#">C#</option>
                      <option value="Java">Java</option>
                    </Select>
                    <Text>Роль</Text>
                    <Select
                      value={state.role}
                      name="role"
                      onChange={handleChange}
                    >
                      <option value="Teamlead">Teamlead</option>
                      <option value="Developer">Developer</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Tester">Tester</option>
                    </Select>
                    <Text>Опыт работы (в годах)</Text>
                    <Input
                      value={state.work_experience_on_role}
                      name="work_experience_on_role"
                      onChange={handleChange}
                      type="number"
                    />
                    <Checkbox
                    defaultChecked
                      checked ={check}
                      name="employment"
                      onChange= {soldCheckbox}
                    >
                      Учитывать занятых сотрудников?
                    </Checkbox>
                  </form>
                </DrawerBody>

                <DrawerFooter
                  borderRight="2px"
                  borderColor="#3adb00"
                  backgroundColor="black"
                  color="#3ADB00"
                >
                  <Button
                    onClick={onClose}
                    border="2px"
                    borderColor="#3adb00"
                    backgroundColor="black"
                    type="submit"
                    form="my-form"
                    _hover={{ bgColor: '#3adb00', textColor: '#030a00' }}
                  >
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </VStack>
          <HStack pos="absolute" top="200px">
            <TableContainer bg="#030a00">
              <Developers developers={developers} />
            </TableContainer>
          </HStack>
        </VStack>
        {/* <VStack>
        <Footer />
        </VStack> */}
      </VStack>
    </ChakraProvider>
  );
}

export default Cabinet;
