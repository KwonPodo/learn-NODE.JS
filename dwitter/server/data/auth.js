let users = [
  {
    username: "Bob",
    password: "$2b$12$t6ThNiMWRiSq0RtF.A5o2e8yTGF3u8//m133VBg.FohAOQyrZDwGK", //1234
    name: "Bobby",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png",
    id: "1",
  },
];

export async function get() {
  return users;
}

export async function getByUsername(username) {
  const user = users.find((usr) => usr.username === username);

  return user;
}

export async function getById(userId) {
  return users.find((user) => user.id === userId);
}

export async function create(userInfo) {
  const createdUser = {
    ...userInfo,
    id: Date.now().toString(),
  };
  users.push(createdUser);

  console.info(`Users :`, users);
  console.info(`Created User:`, createdUser);
  console.info(`Created User.id:`, createdUser.id);
  return createdUser.id;
}
