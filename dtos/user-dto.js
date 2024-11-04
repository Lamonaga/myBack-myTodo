class UserDto {
  username;
  role;
  id;

  constructor(model) {
    this.username = model.username;
    this.role = model.role;
    this.id = model._id;
  }
}

export default UserDto;
