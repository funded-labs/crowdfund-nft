import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type NewProfile = {
    firstName: Text;
    lastName: Text;
    imgUrl: Text;
  };

  public type Profile = {
    id: UserId;
    firstName: Text;
    lastName: Text;
    imgUrl: Text;
  };

  public type NewProject = {
    description: Text;
    goal: Float;
    imgUrl: Text;
    name: Text;
    tags: [Text]; 
  };

  public type Project = {
    id: Text;
    description: Text;
    goal: Float;
    imgUrl: Text;
    name: Text;
    owner: UserId;
    tags: [Text];
  };
};
