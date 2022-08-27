import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
} from "@chakra-ui/react";

const CreatedTable = ({ data }) => {
  return (
    <TableContainer>
      <Table variant="tr-simple">
        <Thead>
          <Tr>
            <Th isNumeric>No</Th>
            <Th px="16">Nama aktivitas</Th>
            <Th>Tanggal dan waktu dimulai</Th>
            <Th>Tanggal dan waktu selesai</Th>
            <Th>Jumlah pendaftar</Th>
            <Th>Max pendaftar</Th>
            <Th>Detail halaman</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
                <Button
                  colorScheme="red"
                  borderColor="red.600"
                  variant="outline"
                >
                  Hapus
                </Button>
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
                <Button
                  colorScheme="red"
                  borderColor="red.600"
                  variant="outline"
                >
                  Hapus
                </Button>
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td>Testimonial tes gender asoko</Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td textAlign="center" isNumeric>
              25.4
            </Td>
            <Td>
              <Flex gap="4" justifyContent="center">
                <Button colorScheme="blue" bg="blue.600">
                  Detail
                </Button>
                <Button
                  colorScheme="red"
                  borderColor="red.600"
                  variant="outline"
                >
                  Hapus
                </Button>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CreatedTable;
