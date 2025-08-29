// import React, { useEffect, useState } from "react";
// import { DataTable } from "mantine-datatable";
// import dayjs from "dayjs";

// import {
//   Box,
//   ActionIcon,
//   Modal,
//   TextInput,
//   Select,
//   Button,
// } from "@mantine/core";
// import { IconEdit } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";

// const UserSettings = () => {
//   const [page, setPage] = useState(1);
//   const [records, setRecords] = useState([]);
//   const [resData, setResData] = useState();
//   const [payload, setPayload] = useState();

//   // Modal state
//   const [opened, setOpened] = useState(false);
//   const [modalData, setModalData] = useState({});

//   useEffect(() => {
//     loadDefaultCalendar({ page })
//       .then((res) => {
//         console.log("Updated pageElements:", res.data);
//         setResData(res.data);
//         if (res.data?.content) setRecords(res.data.content);
//       })
//       .catch((err) => console.error(err));
//   }, [page, payload]);

//   // Open modal with row data
//   function handleEdit(row) {
//     setModalData(row);
//     setOpened(true);
//   }

//   function handleFormSubmit(e) {
//     e.preventDefault();
//     updateCalendar(modalData)
//       .then((res) => {
//         setPayload(modalData);
//         console.log("res status: " + res.status + " update data: " + res.data);
//         notifications.show({
//           title: "record saved",
//           message: "record has been saved",
//           autoClose: 2000,
//         });

//         setTimeout(() => setOpened(false), 2000);
//       })
//       .catch((err) => console.log(err));
//   }

//   return (
//     <>
//       <div className="my-table border border-gray-300 w-fit mx-auto mt-[30px] px-4 pb-10 h-[620px] box-content rounded-[8px]">
//         <DataTable
//           withColumnBorders
//           horizontalSpacing="md"
//           verticalSpacing="sm"
//           recordsPerPage={10}
//           totalRecords={resData?.totalElements}
//           page={page} // 1-based
//           records={records}
//           paginationText={({ from, to, totalRecords }) =>
//             `Records ${from}-${to} of ${totalRecords}`
//           }
//           onPageChange={(p) => setPage(p)}
//           columns={[
//             {
//               accessor: "date",
//               width: 200,
//               render: ({ date }) => dayjs(date).format("MMM D YYYY"),
//             },
//             { accessor: "status", width: 200 },
//             { accessor: "reason", width: 200 },
//             { accessor: "bookingId", width: 100, textAlignment: "center" },
//             {
//               accessor: "action",
//               title: <Box mr={6}>Row actions</Box>,
//               render: (row) => (
//                 <ActionIcon
//                   size="sm"
//                   variant="subtle"
//                   color="blue"
//                   onClick={() => handleEdit(row)}
//                 >
//                   <IconEdit size={16} />
//                 </ActionIcon>
//               ),
//             },
//           ]}
//           emptyState={<div></div>}
//         />
//       </div>

//       {/* Modal */}
//       <Modal
//         opened={opened}
//         onClose={() => setOpened(false)}
//         title={`Edit record for ${dayjs(modalData.date).format("MMM D YYYY")}`}
//         size="md"
//         centered
//       >
//         <div>
//           <p>Booking ID: {modalData.bookingId}</p>
//         </div>

//         <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
//           <TextInput label="date" value={modalData.date} readOnly />
//           <Select
//             label="Status"
//             placeholder="Select status"
//             value={modalData.status}
//             data={[
//               "BOOKED",
//               "BLOCKED",
//               "AVAILABLE",
//               "RESCHEDULED",
//               "MAINTENANCE",
//               "HOLIDAY",
//             ]}
//             onChange={(value) =>
//               setModalData((prev) => ({
//                 ...prev,
//                 status: value,
//               }))
//             }
//             required
//           />
//           <TextInput
//             label="Reason"
//             placeholder="reason for blocking date"
//             value={modalData.reason}
//             onChange={(event) =>
//               setModalData((prev) => ({
//                 ...prev,
//                 reason: event.currentTarget.value,
//               }))
//             }
//             required
//           />
//           <Button fullWidth className="py-2 mt-1" type="submit">
//             Submit
//           </Button>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default UserSettings;
