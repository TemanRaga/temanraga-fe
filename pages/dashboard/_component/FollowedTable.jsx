import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
} from "@chakra-ui/react";

const FollowedTable = ({ data }) => {
  return (
    <TableContainer>
      <Table variant="tr-simple">
        <Thead>
          <Tr>
            <Th isNumeric>No</Th>
            <Th px="16">Nama aktivitas</Th>
            <Th>Tanggal dan waktu dimulai</Th>
            <Th>Tanggal dan waktu selesai</Th>
            <Th>Lokasi</Th>
            <Th>Detail halaman</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>centimetres (cm)</Td>
            <Td>30.48</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FollowedTable;
