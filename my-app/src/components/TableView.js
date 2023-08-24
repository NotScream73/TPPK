import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from '@chakra-ui/react';


function Developers({developers}) {
  return (
        <Table variant="unstyle"
        color="#3adb00"
        bgColor="#030a00"
        style={{ borderCollapse: 'separate', borderSpacing: '5px 5px' }}>
          <Thead>
            <Tr>
              <Th> </Th>
              <Th>Имя</Th>
              <Th>Основная технология</Th>
              <Th>Опыт работы на основной технологии</Th>
              <Th>Роль</Th>
              <Th>Занятость</Th>
              <Th>Почта</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              developers.map(developer => {
              let tech;
              let role;
              switch(developer.MainTechID){
                case 1:
                  tech = "NodeJS"
                  break;
                case 2:
                  tech = "Bootstrap"
                  break;
                case 3:
                  tech = "Python"
                  break;
                case 4:
                  tech = "C#"
                  break;
                case 5:
                  tech = "Java"
                  break;
              }
              switch(developer.MainRoleID){
                case 0:
                  role = "Teamlead"
                  break;
                case 1:
                  role = "Developer"
                  break;
                case 2:
                  role = "Frontend"
                  break;
                case 3:
                  role = "Backend"
                  break;
                case 4:
                  role = "Tester"
                  break;
              }
              return(
              <Tr key={developer.ID}>
              <Td><Checkbox/></Td>
              <Td>{developer.Name}</Td>
              <Td>{tech}</Td>
              <Td>{developer.AllWorkExp}</Td>
              <Td> {role}</Td>
              <Td>{developer.ProjectID !=null ? "занят": "не занят"}</Td>
              <Td>{developer.Email}</Td>
              </Tr>)
            })}
          </Tbody>
        </Table>
  )
}
export{Developers}
