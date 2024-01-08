import PropTypes from "prop-types";

const ProfileNotGoogle = ({ user, handleOut }) => {
  return (
    <div className="card w-100 d-block justify-content-start">
      <div className="d-flex justify-content-between align-items-center p-1">
        <p className="text-primary">
          <strong>Welcome :</strong> {user.email}
        </p>
        <div className="">
        <button onClick={handleOut} className="btn btn-danger">
          LogOut
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProfileNotGoogle;

ProfileNotGoogle.propTypes = {
  user: PropTypes.object,
  handleOut: PropTypes.func,
};
