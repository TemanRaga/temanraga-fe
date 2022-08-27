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
  Link
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
          {data && data.map((ctx, idx) => (
            <Tr key={ctx.name}>
              <Td>{idx + 1}</Td>
              <Td>{ctx.name}</Td>
              <Td>{ctx.date}, {ctx.start}</Td>
              <Td>{ctx.date}, {ctx.finish}</Td>
              <Td >{ctx.location}</Td>
              <Td>
                <Flex gap="4" justifyContent="center">
                  <Link href={`/event/${ctx.id}`}>
                    <Button colorScheme="blue" bg="blue.600">
                      Detail
                    </Button>
                  </Link>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FollowedTable;
