import React, { useState, useEffect, forwardRef } from "react";
import { getUsersByKeyword } from "../ItemsAxios"; // Your API call
import { IconSearch } from "@tabler/icons-react";
import {
  Autocomplete,
  Group,
  Avatar,
  Text,
  Badge,
  Stack,
  CloseButton,
} from "@mantine/core";

// Default avatar (you can replace this URL with your default image)
const DEFAULT_AVATAR = "https://avatars.dicebear.com/api/identicon/default.svg";

// Custom item renderer with avatar and description
const UserItem = forwardRef(({ value, description, image, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image || DEFAULT_AVATAR} radius="xl" />
      <div>
        <Text>{value}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

const InviteUsers = ({ organizer }) => {
  const [keyword, setKeyword] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [invitedUsers, setInvited] = useState([]);

  // Debounce fetching users on keyword change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.length >= 3) {
        getUsersByKeyword(keyword).then((users) => {
          // Map backend users to frontend format
          const mapped = users.map((user) => ({
            id: user.id,
            value: `${user.firstname} ${user.lastname}`,
            description: user.email,
            image: user.avatarUrl || DEFAULT_AVATAR,
          }));
          setMatchingUsers(mapped);
        });
      } else {
        setMatchingUsers([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  // Add selected user to invited list if not already invited
  const handleSelect = (selectedName) => {
    const user = matchingUsers.find((u) => u.value === selectedName);
    if (user && !invitedUsers.find((u) => u.id === user.id)) {
      setInvited((prev) => [...prev, user]);
      setKeyword(""); // Clear input after select
    }
  };

  // Remove invited user from list
  const removeUser = (id) => {
    setInvited((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="w-[300px] p-5 mx-auto mt-[60px] border border-gray-400 rounded-xl">
      <Autocomplete
        placeholder="Search users"
        icon={<IconSearch size={16} />}
        data={matchingUsers}
        itemComponent={UserItem}
        value={keyword}
        onChange={setKeyword}
        onItemSubmit={(item) => handleSelect(item.value)}
        clearable
        limit={5}
        nothingFound="No users found"
      />
      <div className="flex">
        <Avatar></Avatar>
        <div>
          <p>
            {organizer.firstname} {organizer.lastname}{" "}
            <span className="rounded-xl bg-gray-300">You</span>
          </p>
          <p>{organizer.email}</p>
        </div>
      </div>
      <Stack mt="md">
        {invitedUsers.map((user) => (
          <Badge
            key={user.id}
            color="blue"
            variant="light"
            rightSection={<CloseButton onClick={() => removeUser(user.id)} />}
          >
            <Group spacing="xs" noWrap>
              <Avatar src={user.image} radius="xl" size={18} />
              <Text size="sm">{user.value}</Text>
            </Group>
          </Badge>
        ))}
      </Stack>
    </div>
  );
};

export default InviteUsers;
