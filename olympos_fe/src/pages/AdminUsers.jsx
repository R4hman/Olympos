import { Box, Button } from "@mui/material";
import useUsers from "../features/users/useUsers";
import useDeleteUser from "../features/users/useDeleteUser";
import ReusableTable from "../components/adminPanel/ReusableTable";
import { useState } from "react";
import Loader from "../components/reusable/Loader";
import AdminModal from "../components/reusable/AdminModal";
import Inputs from "../components/adminPanel/Inputs";
import useEditUser from "../features/users/useEditUser";
import EachUserTableRow from "../components/adminPanel/EachUserTableRow";
import { createUserApi } from "../services/apiUsers";

import UserSendMessage from "../components/adminPanel/UserSendMessage";

const AdminUsers = () => {
  const [showInput, setShowInput] = useState(false);
  const [send, setSend] = useState(false);
  const [tableData, setTableData] = useState(null);
  const { editUser, isUserEditing } = useEditUser();
  const { isUsersLoading, users } = useUsers();
  const { userDeleteLoading, deleteUser } = useDeleteUser();

  if (isUsersLoading) return <Loader />;

  const handleOpenModal = (data = null) => {
    if (data) {
      setTableData(data);
    }
    setShowInput(true);
  };

  return (
    <Box>
      <Button onClick={() => setSend(true)}> Bütün istifadəçilərə mesaj göndər</Button>
      {showInput && (
        <AdminModal
          openOrClose={showInput}
          setTableData={setTableData}
          setShowInput={setShowInput}
        >
          <Inputs
            tableData={tableData}
            setTableData={setTableData}
            setShowInput={setShowInput}
            edit={editUser}
            create={createUserApi}
          >
            <Inputs.TitleName name="Userin inputları" />
            <Inputs.FirstName />
            <Inputs.LastName />
            <Inputs.Email />
            <Inputs.PhoneNumber />
            <Inputs.Role />

            <Inputs.CreatedAt />
          </Inputs>
        </AdminModal>
      )}
      {send && (
        <AdminModal openOrClose={send} setShowInput={setSend}>
          <UserSendMessage setSend={setSend} />
        </AdminModal>
      )}

      <ReusableTable handleOpenModal={handleOpenModal}>
        <ReusableTable.Header
          list={[
            "First Name",
            "Last Name",
            "Email",
            "Phone Number",
            "Role",
            // "Orders",
            "Created At",
          ]}
        />
        <ReusableTable.Body
          data={users}
          render={(table, i) => (
            <EachUserTableRow
              key={i * 1649}
              table={table}
              handleOpenModal={handleOpenModal}
              deleteData={deleteUser}
              deleteLoading={userDeleteLoading}
            />
          )}
        />
      </ReusableTable>
    </Box>
  );
};

export default AdminUsers;
