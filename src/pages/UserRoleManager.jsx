// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { IconUser, IconShieldCheck } from "@tabler/icons-react";
import { Avatar, Tabs, Box, Select } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import "mantine-datatable/styles.layer.css";
import { updateRole } from "./../ItemsAxios";
import { getUserAccounts } from "./../ItemsAxios";
import { notifications } from "@mantine/notifications";

const UserOverviewCard = ({ role, accounts, avatars }) => (
  <div className=" border border-gray-300 p-[10px] w-[300px] rounded">
    <div className="flex justify-between items-center gap-2">
      <p className="text-gray-500 text-[12px] font-light ">
        {accounts} ACCOUNTS
      </p>
      <Avatar.Group>
        {avatars.map((avatar, index) => (
          <Avatar key={index} src={avatar ? avatar : ""}></Avatar>
        ))}
      </Avatar.Group>
    </div>
    <p className="font-semibold">{role}</p>
    <button className="text-blue-700 text-[12px] cursor-pointer hover:text-blue-500">
      Learn more
    </button>
  </div>
);

const rolesOverview = [
  {
    role: "Super Admin",
    accounts: 3,
    avatars: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=2",
      "https://i.pravatar.cc/150?img=3",
    ],
  },
  {
    role: "Manager",
    accounts: 4,
    avatars: [
      "https://i.pravatar.cc/150?img=4",
      "https://i.pravatar.cc/150?img=5",
      "https://i.pravatar.cc/150?img=6",
      "https://i.pravatar.cc/150?img=7",
    ],
  },
  {
    role: "Accountant",
    accounts: 1,
    avatars: ["https://i.pravatar.cc/150?img=8"],
  },
];

const UserRoleManager = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [userAccounts, setUserAccounts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageIsLast, setPageIsLast] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filter = activeTab === "all" ? null : activeTab;
    setLoading(true);
    getUserAccounts({ filter, pageNumber })
      .then((res) => {
        setUserAccounts(res?.data?.content);
        setTotalElements(res?.data?.totalElements);
        setPageIsLast(res?.data?.last);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [activeTab, pageNumber]);

  const handleRoleChange = (newRole, id) => {
    if (!newRole) return;

    const toUpdate = userAccounts.find((u) => u.id === id);
    if (toUpdate.role === newRole) {
      alert("nothing changed");
      return;
    }

    function saveUser() {
      notifications.show({
        title: "Success",
        message: "Your profile has been updated!",
        color: "green",
      });
    }

    function showError() {
      notifications.show({
        title: "Error",
        message: "Something went wrong.",
        color: "red",
      });
    }

    //handle the changes
    updateRole({ role: newRole, id: id })
      .then((res) => {
        console.log(res.data);
        saveUser();
        setLoading(true);
        const filter = activeTab === "all" ? null : activeTab;
        getUserAccounts({ filter, pageNumber })
          .then((res) => {
            setUserAccounts(res?.data?.content);
            setTotalElements(res?.data?.totalElements);
            setPageIsLast(res?.data?.last);
          })
          .catch(console.log)
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.log(err);
        showError();
      });
  };

  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "PLANNER", label: "Planner" },
    { value: "CUSTOMER", label: "Customer" },
  ];

  const MyDataTable = () => (
    <>
      <DataTable
        columns={[
          {
            accessor: "Account",
            render: (row) => (
              <Box className="flex items-center gap-2">
                <Avatar
                  src={
                    row.avatarUrl?.trim()
                      ? row.avatarUrl
                      : "https://i.pravatar.cc/150?img=5"
                  }
                />
                <span>
                  {row.firstName} {row.lastName}
                </span>
              </Box>
            ),
          },
          {
            accessor: "Email",
            render: (row) => (
              <Box className="flex items-center  gap-2">
                <IconShieldCheck size={16} color="green" />
                {row.email}
              </Box>
            ),
          },
          {
            accessor: "Role",
            render: (row) => (
              <Select
                data={roleOptions}
                value={row.role}
                onChange={(newRole) => handleRoleChange(newRole, row.id)}
                size="xs"
                variant="filled"
                className="w-[130px]"
              />
            ),
          },
          {
            accessor: "Access",
            render: (row) => (
              <span>{row.role === "ADMIN" ? "Full" : "Partial"}</span>
            ),
          },
        ]}
        loading={loading}
        page={pageNumber}
        onPageChange={setPageNumber}
        records={userAccounts}
        paginationSize="md"
        paginationActiveBackgroundColor="grape"
        noRecordsText="no record found"
        minHeight={300}
        recordsPerPage={10}
        paginationprops={{
          nextDisabled: pageIsLast,
          previousDisabled: pageNumber <= 1,
        }}
        totalRecords={totalElements}
        paginationText={({ from, to, totalRecords }) =>
          `Showing users ${from} to ${to} out of ${totalRecords} record/s`
        }
      ></DataTable>
    </>
  );

  return (
    <div className="max-w-[880px] border border-gray-300 mx-auto mt-[60px] px-[30px]">
      <div className="border border-gray-300 rounded px-[20px] py-[10px] mt-10 mb-8">
        <h2 className="font-semibold text-gray-800">Roles available</h2>
        <p className="text-[14px] text-gray-900 ">
          A role provides access to predefined menus and features so that
          depending on the assigned role, a user can have access to what he
          needs.
        </p>
        <div className="flex gap-2 py-5">
          {rolesOverview?.slice(0, 5).map((role, index) => (
            <UserOverviewCard key={index} {...role} />
          ))}

          {rolesOverview?.length > 5 && (
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-sm font-medium">
              +{rolesOverview.length - 5}
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-300 rounded">
        <div className="info py-5 px-5 ">
          <p className="text-gray-800 font-semibold">User accounts</p>
          <p className="text-gray-900 text-[14px] mb-5">
            Find all user accounts and their associated roles.
          </p>
          <div className="user-table min-h-[50vh]">
            <Tabs defaultValue="all" onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="ADMIN">Admin</Tabs.Tab>
                <Tabs.Tab value="PLANNER">Planner</Tabs.Tab>
                <Tabs.Tab value="CUSTOMER">Client</Tabs.Tab>
                <Tabs.Tab value="account" ml="auto">
                  Account
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value={activeTab}>
                {/* <MyDataTable data={getFilteredUsers()} /> */}
                <MyDataTable />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleManager;
