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
  Link
} from "@chakra-ui/react";

const CreatedTable = ({ data }) => {

  const handleDelete = (id) => {
    fetch(`${serverEnv}/api/v1/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("access-temanraga")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Router.push("/event");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          {data && data.map((ctx, idx) => (
            <Tr key={ctx.name}>
              <Td>{idx}</Td>
              <Td>{ctx.name}</Td>
              <Td>{ctx.date}, {ctx.start}</Td>
              <Td>{ctx.date}, {ctx.finish}</Td>
              <Td textAlign="center" isNumeric>
                {ctx.num_participants}
              </Td>
              <Td textAlign="center" isNumeric>
                {ctx.max_participants}
              </Td>
              <Td>
                <Flex gap="4" justifyContent="center">
                  <Link href={`/event/${ctx.id}`}>
                    <Button colorScheme="blue" bg="blue.600">
                      Detail
                    </Button>
                  </Link>

                  <Button
                    colorScheme="red"
                    borderColor="red.600"
                    variant="outline"
                    onClick={() => handleDelete(ctx.id)}
                  >
                    Hapus
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CreatedTable;
